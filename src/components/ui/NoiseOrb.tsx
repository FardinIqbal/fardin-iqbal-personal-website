"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface NoiseOrbProps {
  size?: number;
  className?: string;
}

// Simplex noise and shader code
const vertexShader = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float time;
  uniform vec2 resolution;
  uniform float hover;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractional Brownian Motion
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 6; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 center = vec2(0.5);
    vec2 p = uv - center;

    float dist = length(p);

    // Circular mask with soft edge
    float circle = 1.0 - smoothstep(0.35, 0.5, dist);

    if (circle < 0.01) {
      gl_FragColor = vec4(0.0);
      return;
    }

    // Animated noise layers
    float t = time * 0.15;

    // Primary flow
    float n1 = fbm(p * 3.0 + vec2(t, t * 0.7));
    float n2 = fbm(p * 2.0 - vec2(t * 0.5, t * 0.3));
    float n3 = fbm(p * 4.0 + vec2(n1, n2) * 0.5);

    // Combine noise layers
    float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    noise = noise * 0.5 + 0.5; // Normalize to 0-1

    // Color palette - dark with emerald and subtle blue
    vec3 darkBg = vec3(0.02, 0.02, 0.03);
    vec3 emerald = vec3(0.063, 0.725, 0.506);
    vec3 deepBlue = vec3(0.1, 0.15, 0.3);
    vec3 softPurple = vec3(0.2, 0.1, 0.25);

    // Create color gradient based on noise
    vec3 color = darkBg;
    color = mix(color, deepBlue, noise * 0.6);
    color = mix(color, softPurple, pow(noise, 2.0) * 0.4);
    color = mix(color, emerald, pow(noise, 3.0) * (0.5 + hover * 0.3));

    // Add subtle radial gradient
    float radialGlow = 1.0 - dist * 1.5;
    color += emerald * radialGlow * 0.1 * (1.0 + hover * 0.5);

    // Edge glow
    float edgeGlow = smoothstep(0.5, 0.35, dist) * smoothstep(0.0, 0.35, dist);
    color += emerald * edgeGlow * 0.15 * (1.0 + hover * 0.5);

    // Soft vignette
    float vignette = 1.0 - pow(dist * 1.8, 2.0);
    color *= 0.7 + vignette * 0.3;

    // Final alpha with antialiased edge
    float alpha = circle;

    gl_FragColor = vec4(color, alpha);
  }
`;

export function NoiseOrb({ size = 280, className }: NoiseOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const startTimeRef = useRef(Date.now());
  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    });

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    glRef.current = gl;

    // Create shaders
    const vs = gl.createShader(gl.VERTEX_SHADER);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);

    if (!vs || !fs) return;

    gl.shaderSource(vs, vertexShader);
    gl.shaderSource(fs, fragmentShader);
    gl.compileShader(vs);
    gl.compileShader(fs);

    // Check for errors
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.error("Vertex shader error:", gl.getShaderInfoLog(vs));
      return;
    }
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error("Fragment shader error:", gl.getShaderInfoLog(fs));
      return;
    }

    // Create program
    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    programRef.current = program;
    gl.useProgram(program);

    // Create geometry (full-screen quad)
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Enable alpha blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Animation loop
    const render = () => {
      if (!gl || !program) return;

      const dpr = window.devicePixelRatio || 1;
      const width = size * dpr;
      const height = size * dpr;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Smooth hover transition
      const targetHover = isHovered ? 1 : 0;
      hoverRef.current += (targetHover - hoverRef.current) * 0.1;

      // Update uniforms
      const timeLoc = gl.getUniformLocation(program, "time");
      const resolutionLoc = gl.getUniformLocation(program, "resolution");
      const hoverLoc = gl.getUniformLocation(program, "hover");

      gl.uniform1f(timeLoc, (Date.now() - startTimeRef.current) / 1000);
      gl.uniform2f(resolutionLoc, width, height);
      gl.uniform1f(hoverLoc, hoverRef.current);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, isHovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient glow behind */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgb(16 185 129 / 0.2) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: isHovered ? 1.3 : 1.1,
          opacity: isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Rotating outer ring */}
      <motion.div
        className="absolute inset-1 rounded-full"
        style={{
          border: "1px solid rgb(16 185 129 / 0.2)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Second counter-rotating ring */}
      <motion.div
        className="absolute inset-3 rounded-full"
        style={{
          border: "1px solid rgb(16 185 129 / 0.1)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      {/* Main 3D container with shader canvas */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
      >
        {/* Shader canvas */}
        <canvas
          ref={canvasRef}
          className="rounded-full"
          style={{
            width: size - 24,
            height: size - 24,
            boxShadow: isHovered
              ? "0 0 60px rgb(16 185 129 / 0.3), inset 0 0 30px rgb(16 185 129 / 0.1)"
              : "0 0 30px rgb(16 185 129 / 0.15)",
            transition: "box-shadow 0.3s ease",
          }}
        />

        {/* Subtle overlay gradient for depth */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: size - 24,
            height: size - 24,
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.03) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      {/* Corner accent dots */}
      {[0, 90, 180, 270].map((angle, i) => (
        <motion.div
          key={angle}
          className="absolute w-1.5 h-1.5 rounded-full bg-emerald-500/60"
          style={{
            top: "50%",
            left: "50%",
            transform: `rotate(${angle}deg) translateX(${size / 2 - 8}px) translateY(-50%)`,
          }}
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [0.6, 1, 0.6] : 0.4,
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.15,
            repeat: isHovered ? Infinity : 0,
          }}
        />
      ))}

      {/* Status indicator */}
      <motion.div
        className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-emerald-500"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          boxShadow: "0 0 12px rgb(16 185 129 / 0.6)",
        }}
      />
    </div>
  );
}

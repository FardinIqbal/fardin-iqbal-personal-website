"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/haptics";

interface MicroButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost" | "glow";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export function MicroButton({
  children,
  onClick,
  variant = "default",
  size = "md",
  className,
  disabled = false,
  icon,
  iconPosition = "left",
}: MicroButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring for smooth movement
  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate offset (max 4px movement)
    const offsetX = (e.clientX - centerX) * 0.1;
    const offsetY = (e.clientY - centerY) * 0.1;
    
    mouseX.set(Math.max(-4, Math.min(4, offsetX)));
    mouseY.set(Math.max(-4, Math.min(4, offsetY)));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = () => {
    if (disabled) return;
    haptic("light");
    setIsPressed(true);
    onClick?.();
    setTimeout(() => setIsPressed(false), 150);
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-base gap-2",
    lg: "px-6 py-3 text-lg gap-2.5",
  };

  const variantClasses = {
    default: "bg-foreground text-background hover:bg-foreground/90",
    outline: "border border-border bg-transparent hover:bg-foreground/5",
    ghost: "bg-transparent hover:bg-foreground/5",
    glow: "bg-foreground text-background shadow-[0_0_20px_rgb(var(--theme-accent)/0.3)] hover:shadow-[0_0_30px_rgb(var(--theme-accent)/0.5)]",
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      style={{ x, y }}
      className={cn(
        "relative inline-flex items-center justify-center font-medium rounded-lg transition-colors",
        "overflow-hidden",
        sizeClasses[size],
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={false}
        whileHover={{ translateX: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Ripple effect on press */}
      {isPressed && (
        <motion.span
          className="absolute inset-0 bg-white/30 rounded-lg"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-inherit">
        {icon && iconPosition === "left" && (
          <motion.span
            animate={{ x: isPressed ? -2 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {icon}
          </motion.span>
        )}
        <span>{children}</span>
        {icon && iconPosition === "right" && (
          <motion.span
            animate={{ x: isPressed ? 2 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {icon}
          </motion.span>
        )}
      </span>
    </motion.button>
  );
}

// Icon-only button variant
export function MicroIconButton({
  children,
  onClick,
  variant = "ghost",
  size = "md",
  className,
  disabled = false,
  tooltip,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  tooltip?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const variantClasses = {
    default: "bg-foreground text-background hover:bg-foreground/90",
    outline: "border border-border bg-transparent hover:bg-foreground/5",
    ghost: "bg-transparent hover:bg-foreground/5",
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => {
          if (disabled) return;
          haptic("light");
          onClick?.();
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-lg transition-colors",
          sizeClasses[size],
          variantClasses[variant],
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.9 }}
      >
        <motion.span
          animate={{ rotate: isHovered ? 10 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {children}
        </motion.span>
      </motion.button>

      {/* Tooltip */}
      {tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.95 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 4,
            scale: isHovered ? 1 : 0.95,
          }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium bg-foreground text-background rounded whitespace-nowrap pointer-events-none"
        >
          {tooltip}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
        </motion.div>
      )}
    </div>
  );
}

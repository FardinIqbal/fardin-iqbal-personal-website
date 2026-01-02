"use client";

import { useState, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArboretumData,
  ArboretumViewState,
  Season,
  Insight,
  BRANCH_COLORS,
} from "@/types/arboretum";
import { ArboretumTree } from "./ArboretumTree";
import { ControlPanel } from "./ui/ControlPanel";
import { InsightPanel } from "./ui/InsightPanel";
import { SeasonSlider } from "./ui/SeasonSlider";
import { Download, TreeDeciduous, Info, X } from "lucide-react";

interface ArboretumViewProps {
  data: ArboretumData;
}

export function ArboretumView({ data }: ArboretumViewProps) {
  const [viewState, setViewState] = useState<ArboretumViewState>({
    season: "spring",
    seasonProgress: 1,
    shadowMode: false,
    focusedInsightId: null,
    cameraPreset: "overview",
    filters: {
      branches: [],
      emotions: [],
      yearRange: [2015, 2026],
    },
    showConnections: false,
    echoMode: false,
  });

  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleSeasonChange = useCallback((season: Season, progress: number) => {
    setViewState((prev) => ({
      ...prev,
      season,
      seasonProgress: progress,
    }));
  }, []);

  const handleInsightClick = useCallback(
    (insightId: string) => {
      const insight = data.insights.find((i) => i.id === insightId);
      setSelectedInsight(insight || null);
      setViewState((prev) => ({
        ...prev,
        focusedInsightId: insightId,
      }));
    },
    [data.insights]
  );

  const handleCloseInsight = useCallback(() => {
    setSelectedInsight(null);
    setViewState((prev) => ({
      ...prev,
      focusedInsightId: null,
    }));
  }, []);

  const toggleShadowMode = useCallback(() => {
    setViewState((prev) => ({
      ...prev,
      shadowMode: !prev.shadowMode,
    }));
  }, []);

  const toggleConnections = useCallback(() => {
    setViewState((prev) => ({
      ...prev,
      showConnections: !prev.showConnections,
    }));
  }, []);

  const handleDownloadPDF = useCallback(async () => {
    // PDF generation will be implemented in Phase 6
    alert("PDF export coming soon");
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 3D Canvas */}
      <Canvas
        className="absolute inset-0"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={[0, 5, 20]}
            fov={50}
          />

          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={0.5}
            color="#ffffff"
          />
          <pointLight
            position={[-10, 10, -10]}
            intensity={0.3}
            color="#10b981"
          />
          <pointLight
            position={[10, 5, 10]}
            intensity={0.2}
            color="#8b5cf6"
          />

          {/* Environment */}
          <fog attach="fog" args={["#000000", 20, 60]} />
          <Environment preset="night" />

          {/* The Tree */}
          <ArboretumTree
            data={data}
            viewState={viewState}
            onInsightClick={handleInsightClick}
          />

          {/* Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
            maxPolarAngle={Math.PI * 0.85}
            minPolarAngle={Math.PI * 0.1}
          />

          {/* Post-processing */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={viewState.shadowMode ? 0.3 : 0.8}
            />
            <Vignette
              offset={0.3}
              darkness={viewState.shadowMode ? 0.8 : 0.5}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between pointer-events-auto"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <TreeDeciduous className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">
                The Arboretum of the Soul
              </h1>
              <p className="text-xs text-foreground-subtle">
                {data.insights.length} insights across {Object.keys(BRANCH_COLORS).length} branches
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 rounded-lg bg-background-secondary/50 border border-border hover:bg-background-secondary transition-colors"
            >
              <Info className="w-5 h-5 text-foreground-muted" />
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-secondary/50 border border-border hover:bg-background-secondary transition-colors"
            >
              <Download className="w-4 h-4 text-foreground-muted" />
              <span className="text-sm text-foreground-muted">Export PDF</span>
            </button>
          </div>
        </motion.header>

        {/* Control Panel (right side) */}
        <ControlPanel
          viewState={viewState}
          onToggleShadow={toggleShadowMode}
          onToggleConnections={toggleConnections}
          branches={Object.keys(BRANCH_COLORS) as (keyof typeof BRANCH_COLORS)[]}
        />

        {/* Season Slider (bottom) */}
        <SeasonSlider
          currentSeason={viewState.season}
          progress={viewState.seasonProgress}
          onChange={handleSeasonChange}
        />

        {/* Branch Legend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-24 left-6 pointer-events-auto"
        >
          <div className="p-4 rounded-xl bg-background-secondary/50 backdrop-blur-sm border border-border">
            <p className="text-xs text-foreground-subtle mb-3 uppercase tracking-wider">
              Branches
            </p>
            <div className="space-y-2">
              {Object.entries(BRANCH_COLORS).map(([branch, color]) => {
                const count = data.insights.filter(
                  (i) => i.branch === branch
                ).length;
                return (
                  <div key={branch} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs text-foreground-muted capitalize">
                      {branch}
                    </span>
                    <span className="text-xs text-foreground-subtle">
                      ({count})
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Selected Insight Panel */}
        <AnimatePresence>
          {selectedInsight && (
            <InsightPanel
              insight={selectedInsight}
              onClose={handleCloseInsight}
              allInsights={data.insights}
            />
          )}
        </AnimatePresence>

        {/* Info Modal */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center pointer-events-auto z-50"
              onClick={() => setShowInfo(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-2xl mx-4 p-8 rounded-2xl bg-background-secondary border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    About the Arboretum
                  </h2>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="p-2 rounded-lg hover:bg-background-tertiary transition-colors"
                  >
                    <X className="w-5 h-5 text-foreground-muted" />
                  </button>
                </div>

                <div className="space-y-4 text-foreground-muted">
                  <p>
                    This is a living visualization of your psychological landscape.
                    Each insight is a bloom on the tree, grouped by thematic branches.
                  </p>

                  <div className="grid grid-cols-2 gap-4 my-6">
                    <div className="p-4 rounded-lg bg-background-tertiary">
                      <p className="text-sm font-medium text-white mb-1">
                        Seasonal Slider
                      </p>
                      <p className="text-xs text-foreground-subtle">
                        Winter shows bare structure. Spring reveals all blooms.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-background-tertiary">
                      <p className="text-sm font-medium text-white mb-1">
                        Shadow Self
                      </p>
                      <p className="text-xs text-foreground-subtle">
                        Toggle to see the inversions and what you&apos;re avoiding.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-background-tertiary">
                      <p className="text-sm font-medium text-white mb-1">
                        Connections
                      </p>
                      <p className="text-xs text-foreground-subtle">
                        Show memory threads linking related insights.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-background-tertiary">
                      <p className="text-sm font-medium text-white mb-1">
                        Click Blooms
                      </p>
                      <p className="text-xs text-foreground-subtle">
                        Explore individual insights in detail.
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground-subtle">
                    This space evolves as new insights are synthesized from your
                    journal entries and life patterns.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

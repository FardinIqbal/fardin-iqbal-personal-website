// The Arboretum of the Soul - Type Definitions

export type ThematicBranch =
  | "relationships"
  | "career"
  | "trauma"
  | "joy"
  | "growth"
  | "identity"
  | "purpose";

export type EmotionalTone =
  | "grief"
  | "anger"
  | "fear"
  | "joy"
  | "peace"
  | "longing"
  | "hope"
  | "acceptance";

export type Season = "winter" | "spring" | "summer" | "autumn";

export type ConnectionType =
  | "caused_by"
  | "led_to"
  | "echoes"
  | "contrasts"
  | "transforms"
  | "heals";

export interface EmotionalWeight {
  buoyancy: number; // -1 (heavy/sagging) to 1 (light/floating)
  intensity: number; // 0-1
  tone: EmotionalTone;
  undertones?: EmotionalTone[];
}

export interface TemporalPosition {
  year: number;
  month?: number;
  age?: number;
  isFoundational: boolean;
}

export interface InsightConnection {
  targetId: string;
  type: ConnectionType;
  strength: number; // 0-1
  description?: string;
}

export interface BloomAppearance {
  color: string; // hex
  size: number; // 0.5-2 multiplier
  glow: number; // 0-1 bioluminescence intensity
  variant: number; // shape variant
}

export interface MicroWorld {
  narrative: string;
  soundscape?: "rain" | "forest" | "ocean" | "silence" | "wind" | "fire" | "void";
  visualElements?: string[];
  quotes?: { text: string; source: string }[];
}

export interface ShadowSelf {
  inversion: string;
  avoidance?: string;
  underlyingFear?: string;
}

export interface Insight {
  id: string;
  title: string;
  content: string;
  branch: ThematicBranch;
  secondaryBranches?: ThematicBranch[];
  emotion: EmotionalWeight;
  temporal: TemporalPosition;
  connections: InsightConnection[];
  tags: string[];
  bloom: BloomAppearance;
  microWorld?: MicroWorld;
  shadowSelf?: ShadowSelf;
  createdAt: string;
  updatedAt: string;
}

export interface TreeRing {
  year: number;
  density: number; // 0-1 activity density
  dominantEmotion: EmotionalTone;
  events?: string[];
}

export interface BranchConfig {
  branch: ThematicBranch;
  baseAngle: number; // degrees from vertical
  curvature: number; // how much the branch curves
  thickness: number; // multiplier
  color: string; // primary color
  emotionalBias: number; // affects physics
}

export interface SapFlowConfig {
  speed: number;
  sentimentColors: Record<EmotionalTone, string>;
}

export interface ArboretumConfig {
  rings: TreeRing[];
  branches: BranchConfig[];
  sapFlow: SapFlowConfig;
  vitality: number; // 0-1 overall tree health
}

export interface ArboretumData {
  _schema: string;
  _version: string;
  _lastUpdated: string;
  config: ArboretumConfig;
  insights: Insight[];
  patterns: {
    id: string;
    title: string;
    description: string;
    relatedInsightIds: string[];
  }[];
}

export interface ArboretumViewState {
  season: Season;
  seasonProgress: number; // 0-1 for transitions
  shadowMode: boolean;
  focusedInsightId: string | null;
  cameraPreset: "overview" | "roots" | "trunk" | "canopy" | "bloom";
  filters: {
    branches: ThematicBranch[];
    emotions: EmotionalTone[];
    yearRange: [number, number];
  };
  showConnections: boolean;
  echoMode: boolean;
}

// Branch colors matching the site's aesthetic
export const BRANCH_COLORS: Record<ThematicBranch, string> = {
  relationships: "#ec4899", // pink
  career: "#f59e0b", // amber
  trauma: "#ef4444", // red
  joy: "#10b981", // emerald
  growth: "#8b5cf6", // purple
  identity: "#6366f1", // indigo
  purpose: "#06b6d4", // cyan
};

export const EMOTION_COLORS: Record<EmotionalTone, string> = {
  grief: "#1e3a5f",
  anger: "#dc2626",
  fear: "#7c3aed",
  joy: "#fbbf24",
  peace: "#10b981",
  longing: "#8b5cf6",
  hope: "#3b82f6",
  acceptance: "#6ee7b7",
};

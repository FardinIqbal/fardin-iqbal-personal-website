import { promises as fs } from "fs";
import path from "path";
import { ArboretumData, Insight, ArboretumConfig } from "@/types/arboretum";

const ARBORETUM_PATH = path.join(process.cwd(), "content", "arboretum.json");

export async function getArboretumData(): Promise<ArboretumData> {
  const content = await fs.readFile(ARBORETUM_PATH, "utf-8");
  return JSON.parse(content) as ArboretumData;
}

export async function getInsights(): Promise<Insight[]> {
  const data = await getArboretumData();
  return data.insights;
}

export async function getInsightById(id: string): Promise<Insight | undefined> {
  const insights = await getInsights();
  return insights.find((i) => i.id === id);
}

export async function getArboretumConfig(): Promise<ArboretumConfig> {
  const data = await getArboretumData();
  return data.config;
}

export async function getPatterns() {
  const data = await getArboretumData();
  return data.patterns;
}

// For client-side use - static import
export function getArboretumDataSync(): ArboretumData {
  // This will be replaced with dynamic import in client components
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@/../content/arboretum.json") as ArboretumData;
}

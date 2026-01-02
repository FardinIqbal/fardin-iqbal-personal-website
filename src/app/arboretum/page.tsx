import { Metadata } from "next";
import { ArboretumPage } from "@/components/arboretum/ArboretumPage";
import arboretumData from "@/../content/arboretum.json";
import { ArboretumData } from "@/types/arboretum";

export const metadata: Metadata = {
  title: "The Arboretum | Fardin Iqbal",
  description: "A living visualization of insights and patterns",
  robots: "noindex, nofollow",
};

export default function Page() {
  return <ArboretumPage data={arboretumData as ArboretumData} />;
}

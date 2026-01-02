import { Metadata } from "next";
import { PasswordGate } from "@/components/arboretum/ui/PasswordGate";
import { ArboretumView } from "@/components/arboretum/ArboretumView";
import { getArboretumData } from "@/lib/arboretum/content";

export const metadata: Metadata = {
  title: "The Arboretum of the Soul",
  description: "A living visualization of insights and the architecture of self",
  robots: "noindex, nofollow",
};

export default async function ArboretumPage() {
  const data = await getArboretumData();

  return (
    <PasswordGate>
      <ArboretumView data={data} />
    </PasswordGate>
  );
}

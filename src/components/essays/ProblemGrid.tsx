import { ReactNode } from "react";

interface ProblemGridProps {
  children: ReactNode;
}

export function ProblemGrid({ children }: ProblemGridProps) {
  return <div className="problem-grid">{children}</div>;
}



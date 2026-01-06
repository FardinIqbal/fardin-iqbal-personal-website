import { ReactNode } from "react";

interface JourneyItemProps {
  phase?: string;
  title: string;
  children: ReactNode;
}

export function JourneyItem({ phase, title, children }: JourneyItemProps) {
  return (
    <div className="journey-item">
      {phase && <div className="journey-phase">{phase}</div>}
      <div className="journey-title">{title}</div>
      <div className="journey-desc">{children}</div>
    </div>
  );
}

export function Journey({ children }: { children: ReactNode }) {
  return <div className="journey">{children}</div>;
}


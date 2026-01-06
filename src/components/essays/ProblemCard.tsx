import { ReactNode } from "react";

interface ProblemCardProps {
  icon: string;
  title: string;
  children: ReactNode;
}

export function ProblemCard({ icon, title, children }: ProblemCardProps) {
  return (
    <div className="problem-card">
      <div className="problem-icon">{icon}</div>
      <div>
        <div className="problem-title">{title}</div>
        <p className="problem-desc">{children}</p>
      </div>
    </div>
  );
}


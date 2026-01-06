import { ReactNode } from "react";

interface CalloutProps {
  title?: string;
  children: ReactNode;
  variant?: "default" | "success" | "warning";
}

export function Callout({ title, children, variant = "default" }: CalloutProps) {
  return (
    <div className={`callout ${variant !== "default" ? variant : ""}`}>
      {title && <div className="callout-title">{title}</div>}
      <div>{children}</div>
    </div>
  );
}



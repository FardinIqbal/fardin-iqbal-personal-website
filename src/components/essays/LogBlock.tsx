import { ReactNode } from "react";

interface LogBlockProps {
  children: ReactNode;
}

export function LogBlock({ children }: LogBlockProps) {
  return (
    <div className="log-block">
      {typeof children === "string" ? (
        <pre style={{ margin: 0, background: "transparent", padding: 0 }}>
          {children}
        </pre>
      ) : (
        children
      )}
    </div>
  );
}


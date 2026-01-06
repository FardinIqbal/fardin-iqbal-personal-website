import { ReactNode } from "react";

interface PullQuoteProps {
  children: ReactNode;
}

export function PullQuote({ children }: PullQuoteProps) {
  return (
    <div className="pull-quote">
      {typeof children === "string" ? <p>{children}</p> : children}
    </div>
  );
}




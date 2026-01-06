interface ArchitectureProps {
  title?: string;
  nodes: string[];
}

export function Architecture({ title, nodes }: ArchitectureProps) {
  return (
    <div className="architecture">
      {title && <div className="arch-title">{title}</div>}
      <div className="arch-flow">
        {nodes.map((node, index) => (
          <span key={index}>
            <span className="arch-node">{node}</span>
            {index < nodes.length - 1 && <span className="arch-arrow">→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}



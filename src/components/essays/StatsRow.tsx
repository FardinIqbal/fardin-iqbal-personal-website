interface Stat {
  value: string | number;
  label: string;
}

interface StatsRowProps {
  stats: Stat[];
}

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="stats-row">
      {stats.map((stat, index) => (
        <div key={index} className="stat">
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}




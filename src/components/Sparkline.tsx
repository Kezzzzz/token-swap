interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
  isPositive?: boolean;
}

export default function Sparkline({
  data,
  width = 60,
  height = 24,
  className = "",
  isPositive = true,
}: SparklineProps) {
  if (!data || data.length < 2) {
    return null;
  }

  // Calculate min and max for scaling
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;

  // Avoid division by zero
  if (range === 0) {
    return (
      <svg width={width} height={height} className={className}>
        <defs>
          <linearGradient id="fade-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopOpacity="0.1" />
            <stop offset="100%" stopOpacity="1" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1={height / 2}
          x2={width}
          y2={height / 2}
          className={isPositive ? "stroke-green-500" : "stroke-red-500"}
          strokeWidth="2"
          opacity="url(#fade-gradient)"
        />
      </svg>
    );
  }

  // Create points for the polyline
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  const uniqueId = `sparkline-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg 
      width={width} 
      height={height} 
      className={className}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        {/* Simple vertical gradient for fill */}
        <linearGradient id={`gradient-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.3" />
          <stop offset="100%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Area under the line (subtle fill) */}
      <path
        d={`M 0,${height} L ${points} L ${width},${height} Z`}
        fill={`url(#gradient-${uniqueId})`}
      />

      {/* The line itself */}
      <polyline
        points={points}
        fill="none"
        className={isPositive ? "stroke-green-500" : "stroke-red-500"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


import React from "react";

interface IProps {
  total: number;
  correct: number;
}

const StatsGraph: React.FC<IProps> = ({ correct, total }) => {
  const percentage = total === 0 ? 0 : (correct / total) * 100;
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="h-32 w-32" viewBox="0 0 36 36">
        <circle
          className="text-gray-200 dark:text-gray-900"
          stroke="currentColor"
          strokeWidth="3.5"
          fill="none"
          cx="18"
          cy="18"
          r="15.9155"
        />
        <circle
          className="text-teal-400"
          stroke="currentColor"
          strokeWidth="3.5"
          fill="none"
          cx="18"
          cy="18"
          r="15.9155"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.35s",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-black dark:text-white">
          {correct}
        </span>
        <span className="text-sm text-gray-500">/{total}</span>
      </div>
    </div>
  );
};

export default StatsGraph;

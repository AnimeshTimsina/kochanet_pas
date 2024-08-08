import React from "react";

interface IProps {
  pages: number;
  activePage: number;
}

const Indicator: React.FC<IProps> = ({ activePage, pages }) => {
  return (
    <div className="flex flex-row gap-2">
      {Array.from({ length: pages }, (_, i) => (
        <div
          key={`${i + 1}`}
          className={`h-1.5 w-8 rounded-full ${i + 1 <= activePage ? "bg-primary" : "bg-gray-300 dark:bg-gray-300"}`}
        ></div>
      ))}
    </div>
  );
};

export default Indicator;

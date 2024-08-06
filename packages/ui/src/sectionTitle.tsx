import React from "react";

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <h1 className="text-center text-4xl font-extrabold tracking-tight md:text-[5xl]">
      {children}
    </h1>
  );
};

export default SectionTitle;

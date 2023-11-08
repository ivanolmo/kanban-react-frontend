import type { ComponentProps } from "react";

const ChevronDownIcon: React.FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path stroke="current" stroke-width="2" fill="none" d="m1 1 4 4 4-4" />
    </svg>
  );
};

export default ChevronDownIcon;

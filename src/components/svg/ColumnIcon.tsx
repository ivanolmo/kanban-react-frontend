import type { ComponentProps } from "react";

const ColumnIcon: React.FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-columns"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="12" x2="12" y1="3" y2="21" />
    </svg>
  );
};

export default ColumnIcon;

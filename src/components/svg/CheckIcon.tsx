import type { ComponentProps } from "react";

const CheckIcon: React.FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        stroke="current"
        strokeWidth="2"
        fill="none"
        d="m1.276 3.066 2.756 2.756 5-5"
      />
    </svg>
  );
};

export default CheckIcon;

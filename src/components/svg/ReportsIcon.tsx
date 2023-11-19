import type { ComponentProps } from "react";

const ReportsIcon: React.FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" {...props}>
      <path d="M 21 8 L 23 8 L 23 22 L 7 22 L 7 20 L 8 20 L 8 21 L 22 21 L 22 9 L 21 9 Z M 20 19 L 20 5 L 18 5 L 18 6 L 19 6 L 19 18 L 5 18 L 5 17 L 4 17 L 4 19 Z M 1 16 L 1 2 L 17 2 L 17 16 Z M 10 15 L 10 13 L 5 13 L 5 15 Z M 10 7 L 5 7 L 5 9 L 10 9 Z M 5 10 L 5 12 L 10 12 L 10 10 Z M 16 13 L 11 13 L 11 15 L 16 15 Z M 16 10 L 11 10 L 11 12 L 16 12 Z M 16 7 L 11 7 L 11 9 L 16 9 Z M 2 6 L 16 6 L 16 3 L 2 3 Z M 2 9 L 4 9 L 4 7 L 2 7 Z M 2 12 L 4 12 L 4 10 L 2 10 Z M 2 15 L 4 15 L 4 13 L 2 13 Z M 2 15 " />
    </svg>
  );
};

export default ReportsIcon;

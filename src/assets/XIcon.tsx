import type { ComponentProps } from "react";

export function XIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="current"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="current"
      // className="w-6 h-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

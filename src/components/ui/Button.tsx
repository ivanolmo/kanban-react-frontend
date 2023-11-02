type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: string;
  size?: string;
  disabled?: boolean;
  hidden?: boolean;
  wide?: boolean;
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "rg",
  disabled,
  hidden,
  wide,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className={`btn text-md group flex items-center justify-center gap-1 ${variant} ${size} ${
        wide ? "wide" : ""
      } ${disabled ? "disabled" : ""} ${hidden ? "hidden" : ""}`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

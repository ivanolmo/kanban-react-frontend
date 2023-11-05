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

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "rg",
  disabled,
  hidden,
  wide,
  ...rest
}) => {
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
};

export default Button;

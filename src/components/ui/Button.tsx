type ButtonProps = {
  children: React.ReactNode;
  id?: string;
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
  id,
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
      id={id}
      type={type}
      className={`btn group flex items-center justify-center gap-1 text-md ${variant} ${size} ${
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

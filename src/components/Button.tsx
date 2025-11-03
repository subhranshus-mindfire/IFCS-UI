import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "outline" | "danger";
  className?: string;
  disabled?: boolean;
  to?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  className = "",
  disabled = false,
  to,
  ...props
}) => {
  const buttonClassName = `rounded-md bg-[var(--background2)] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--backgroundHover)] ${className}`;

  if (to) {
    return (
      <Link
        to={to}
        className={buttonClassName}
        tabIndex={disabled ? -1 : undefined}
        aria-disabled={disabled}
        onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          if (typeof props.onClick === "function") {
            // @ts-ignore: onClick may expect a button event, but we are in an anchor context
            props.onClick(e);
          }
        }}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type="submit"
      className={buttonClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

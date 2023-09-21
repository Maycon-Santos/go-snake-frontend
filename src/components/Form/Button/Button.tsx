import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

interface ButtonProps extends PropsWithChildren {
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit";
  className?: string;
  autoFocus?: boolean;
  href?: LinkProps["href"];
  onClick?: () => void;
  variant?: "primary" | "primary-reverse" | "secondary" | "tertiary" | "error";
  slanted?: boolean;
  Component?: "button" | typeof Link;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    disabled,
    loading,
    className,
    autoFocus,
    href,
    onClick,
    type = "button",
    variant = "primary",
    Component = "button",
    slanted,
    children,
  } = props;

  return (
    <Component
      href={href as LinkProps["href"]}
      type={Component === "button" ? type : undefined}
      disabled={Component === "button" ? disabled : undefined}
      className={classNames(
        className,
        styles.button,
        styles[`variant-${variant}`],
        {
          [styles.slanted]: slanted,
          [styles.loading]: loading,
        }
      )}
      onClick={onClick}
      autoFocus={autoFocus}
    >
      <span
        className={classNames(styles.content, {
          [styles.slanted]: slanted,
        })}
      >
        {children}
      </span>
    </Component>
  );
};

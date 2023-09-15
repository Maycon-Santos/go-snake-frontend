import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

interface ButtonProps extends PropsWithChildren {
  type?: "button" | "submit";
  className?: string;
  href?: LinkProps["href"];
  onClick?: () => void;
  variant?: "primary" | "primary-reverse" | "secondary" | "error";
  slanted?: boolean;
  Component?: "button" | typeof Link;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
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
      className={classNames(
        className,
        styles.button,
        styles[`variant-${variant}`],
        {
          [styles.slanted]: slanted,
        }
      )}
      onClick={onClick}
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

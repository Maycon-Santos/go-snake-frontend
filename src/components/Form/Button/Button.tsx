import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

interface BaseButtonProps {
  color?: "primary" | "primary-reverse";
  Component?: "button" | typeof Link;
}

type ButtonProps = BaseButtonProps &
  PropsWithChildren<React.HTMLProps<HTMLButtonElement>>;

type ButtonAsLinProps = BaseButtonProps & PropsWithChildren<LinkProps>;

export const Button: React.FC<ButtonProps | ButtonAsLinProps> = (props) => {
  const { color = "primary", href, Component = "button", children } = props;

  return (
    <Component
      href={href as LinkProps["href"]}
      className={classNames(styles.button, styles[`color-${color}`])}
    >
      {children}
    </Component>
  );
};

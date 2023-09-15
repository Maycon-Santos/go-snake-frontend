import classNames from "classnames";
import styles from "./Logo.module.css";

interface LogoProps extends React.HTMLProps<HTMLHeadElement> {
  variant?: "small" | "medium";
}

export const Logo: React.FC<LogoProps> = (props) => {
  const { variant = "medium", className } = props;

  return (
    <h1
      className={classNames(styles.logo, className, "overflow-hidden", {
        ["text-center text-6xl md:text-left md:text-8xl"]: variant === "medium",
        ["text-4xl md:text-5xl overflow-hidden"]: variant === "small",
      })}
    >
      Go Snake
    </h1>
  );
};

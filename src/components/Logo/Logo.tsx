import classNames from "classnames";
import styles from "./Logo.module.css";

interface LogoProps extends React.HTMLProps<HTMLHeadElement> {}

export const Logo: React.FC<LogoProps> = (props) => {
  const { className } = props;

  return (
    <h1
      className={classNames(
        styles.logo,
        className,
        "text-center text-6xl md:text-left md:text-8xl"
      )}
    >
      Go Snake
    </h1>
  );
};

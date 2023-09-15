import classNames from "classnames";
import localFont from "next/font/local";
import styles from "./Input.module.css";

const pressStart2P = localFont({
  src: "../../../assets/fonts/PressStart2P-Regular.ttf",
});

interface InputProps extends React.HTMLProps<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  const { className, ...rest } = props;
  return (
    <input
      className={classNames(pressStart2P.className, styles.input, className)}
      {...rest}
    />
  );
};

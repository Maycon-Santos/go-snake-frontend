import { PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./Separator.module.css";

interface SeparatorProps
  extends PropsWithChildren<React.HTMLProps<HTMLDivElement>> {}

export const Separator: React.FC<SeparatorProps> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <div className={classNames(className, styles.separator)} {...rest}>
      {children}
    </div>
  );
};

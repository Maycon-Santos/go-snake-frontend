import classNames from "classnames";
import { PropsWithChildren } from "react";

interface FormProps
  extends PropsWithChildren<React.HTMLProps<HTMLFormElement>> {}

export const Form: React.FC<FormProps> = (props) => {
  const { className, children, ...rest } = props;
  return (
    <form className={classNames(className)} {...rest}>
      {children}
    </form>
  );
};

import classNames from "classnames";
import { PropsWithChildren } from "react";

type Data = { [k: string]: string };

export interface FormProps extends PropsWithChildren {
  className?: string;
  onSubmit?: (data: Data) => void;
}

export const Form: React.FC<FormProps> = (props) => {
  const { className, onSubmit, children, ...rest } = props;

  return (
    <form
      className={classNames(className)}
      onSubmit={(e) => {
        e.preventDefault();

        const data: Data = {};

        const elements = Array.from(
          e.currentTarget.elements
        ) as HTMLInputElement[];

        elements.forEach((element) => {
          const name = element.getAttribute("name");
          const type = element.getAttribute("type");

          if (name === null || element.tagName != "INPUT") {
            return;
          }

          if (type === "text" || type === "password") {
            data[name] = element.value;
          }
        });

        if (onSubmit) onSubmit(data);
      }}
      {...rest}
    >
      {children}
    </form>
  );
};

import { PropsWithChildren, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./Modal.module.css";
import OutsideClickHandler from "../OutsideClickHandler";

export interface ModalProps extends PropsWithChildren {
  title?: string;
  text?: string;
  state?: ReturnType<typeof useModal>;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { state, title, text, children } = props;

  if (!state?.isOpen) {
    return null;
  }

  return (
    <div className={classNames(styles.wrapper, "p-6")}>
      <OutsideClickHandler
        handler={() => state?.toggle()}
        className={classNames(styles.modal, "p-6 flex flex-col gap-3")}
      >
        {Boolean(title) && <span className="text-base">{title}</span>}
        {Boolean(text) && <span className="text-xs">{text}</span>}
        {children}
      </OutsideClickHandler>
    </div>
  );
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return useMemo(() => {
    let onClose: () => void;

    return {
      isOpen,
      onClose: (fn: () => void) => {
        onClose = fn;
      },
      toggle() {
        if (isOpen && onClose) {
          onClose();
        }

        setIsOpen(!isOpen);
      },
    };
  }, [isOpen]);
};

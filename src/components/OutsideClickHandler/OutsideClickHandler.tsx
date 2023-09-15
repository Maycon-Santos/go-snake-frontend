import { PropsWithChildren, useEffect, useRef } from "react";

interface OutsideClickHandlerProps
  extends PropsWithChildren<React.HTMLProps<HTMLDivElement>> {
  handler?: () => void;
}

export const OutsideClickHandler: React.FC<OutsideClickHandlerProps> = (
  props
) => {
  const { children, handler, ...rest } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (handler) handler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler, ref]);

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
};

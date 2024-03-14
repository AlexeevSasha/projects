import { Children, cloneElement, isValidElement, ReactNode, useMemo } from "react";

export const useCloneElement = (id: string, children: ReactNode) => {
  const modifiedChildren = useMemo(
    () =>
      Children.map(children, (child: ReactNode) => {
        if (isValidElement(child)) {
          return cloneElement(child, { popupid: id } as object);
        }
        return child;
      }),
    [],
  );

  return { modifiedChildren };
};

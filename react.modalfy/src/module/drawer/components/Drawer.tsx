import cls from "./drawer.module.scss";
import clsPopup from "@/styles/popup.module.scss";
import { IDrawer } from "@/module/drawer/interfaces/drawer";
import { useDebouncePopup } from "@/common/hooks/useDebouncePopup";
import { classNames } from "@/common/lib/classNames";
import { drawerEvent } from "@/module/drawer/utils/drawerEvent";
import { useCloneElement } from "@/common/hooks/useCloneElement";
import { useEffect } from "react";

const positionStyles = {
  right: cls.right,
  left: cls.left,
  top: cls.top,
  bottom: cls.bottom,
};

export const Drawer = ({ children, id, ...attr }: IDrawer) => {
  const { modifiedChildren } = useCloneElement(id, children);
  const { closeModal, isClose } = useDebouncePopup({
    cb: () => {
      attr?.callbackAnimationEnd?.();
      drawerEvent.close(id);
    },
    delay: 250,
  });

  const onBackdropClick = () => {
    if (attr?.closeBackdropClick !== false) closeModal();
    attr?.callbackBackdropClick?.();
  };

  useEffect(() => {
    return () => {
      attr?.callbackAfterClose?.();
    };
  }, []);

  return (
    <div data-id={`modalfy-drawer-${id}`} className={cls.drawer}>
      <div
        data-position={attr.position}
        className={classNames(cls.content, positionStyles[attr.position], {
          [cls[attr.position + "Close"]]: isClose,
        })}
      >
        {modifiedChildren}
      </div>
      <div
        role='presentation'
        onClick={onBackdropClick}
        className={classNames(clsPopup.backdrop, {
          [clsPopup.backdropClose]: isClose,
        })}
      />
    </div>
  );
};

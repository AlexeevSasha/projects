import { useEffect } from "react";
import cls from "./modal.module.scss";
import clsPopup from "@/styles/popup.module.scss";
import { IModal } from "@/module/modal/interfaces/modal";
import { useDebouncePopup } from "@/common/hooks/useDebouncePopup";
import { modalEvent } from "@/module/modal/utils/modalEvent";
import { classNames } from "@/common/lib/classNames";
import { useCloneElement } from "@/common/hooks/useCloneElement";

export const Modal = ({ id, children, ...attr }: IModal) => {
  const { modifiedChildren } = useCloneElement(id, children);
  const { closeModal, isClose } = useDebouncePopup({
    cb: () => {
      attr?.callbackAnimationEnd?.();
      modalEvent.close(id);
    },
    delay: 250,
  });

  const onBackdropClick = () => {
    attr?.closeBackdropClick && closeModal();
    attr?.callbackBackdropClick?.();
  };

  useEffect(() => {
    return () => {
      attr?.callbackAfterClose?.();
    };
  }, []);

  return (
    <div data-id={`modalfy-modal-${id}`} className={cls.modal}>
      <div
        className={classNames(cls.content, {
          [cls.contentClose]: isClose,
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

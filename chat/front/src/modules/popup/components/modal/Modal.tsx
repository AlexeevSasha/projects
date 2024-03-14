import { IModal } from "@/modules/popup/interfaces/modal";
import { useDebouncePopup } from "@/modules/popup/hooks/useDebouncePopup";
import { modal } from "@/modules/popup/helpers/modal";
import styles from "./modal.module.scss";
import { classNames } from "@/common/lib/classNames/classNames";

export const Modal = (props: IModal) => {
  const { closeModal, isClose } = useDebouncePopup({
    cb: () => modal.close(props.id),
    delay: 250,
  });

  return (
    <div className={styles.modal}>
      <div
        className={classNames(styles.content, {
          [styles.contentClose]: isClose,
        })}
      >
        {props.children(props.id)}
      </div>
      <div
        data-testid='close-modal'
        role='presentation'
        onClick={closeModal}
        className={classNames(styles.backdrop, {
          [styles.backdropClose]: isClose,
        })}
      />
    </div>
  );
};

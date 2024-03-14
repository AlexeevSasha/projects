import { useCallback } from "react";
import { IPopupParam } from "@/modules/popup/interfaces/popup";
import { IModal } from "@/modules/popup/interfaces/modal";
import { Modal } from "@/modules/popup/components/modal/Modal";

export const useModal = ({ previous, setPopupsCb }: IPopupParam) => {
  const addModal = useCallback(
    ({ detail }: { detail: IModal }) => {
      const map = previous.current["modal"];
      map.set(
        detail.id,
        <Modal key={detail.id} id={detail.id}>
          {detail.children}
        </Modal>,
      );
      setPopupsCb("modal", map);
    },
    [previous],
  );

  const deleteModal = useCallback(
    ({ detail }: { detail: IModal }) => {
      const map = previous.current["modal"];
      map.delete(detail.id);
      setPopupsCb("modal", map);
    },
    [previous],
  );

  return { addModal, deleteModal };
};

import { UserT } from "../../interfaces/UserT";
import { FormEvent, useCallback, useState } from "react";
import { updateUser } from "../../../../api/user";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Modal } from "../../../../common/components/modal/modal";
import { FormChangeUser } from "./formChangeUser";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

interface IProps {
  user: UserT;
  updateUsersList: (user: UserT) => void;
}

export const ChangeUser = ({ user, updateUsersList }: IProps) => {
  const { locale } = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});

  const success = (user: UserT) => {
    updateUsersList(user);
    setShowModal(false);
  };

  const onClose = useCallback(() => setShowModal(false), []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    updateUser({ id: user.id, ...data }, () => success({ ...user, ...data })).then();
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className={"h-5 w-5 text-gray-400 transition-colors hover:text-orange-500"}
      >
        <PencilSquareIcon />
      </button>
      {showModal && (
        <Modal
          title={getLanguage(locale).modal.user.change_email}
          description={user.name}
          content={<FormChangeUser onSubmit={onSubmit} onClose={onClose} setUser={setData} />}
          outsideClick={onClose}
          classNames={"max-w-md"}
        />
      )}
    </div>
  );
};

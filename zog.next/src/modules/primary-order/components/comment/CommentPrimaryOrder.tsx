import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { UserRoleT } from "../../../user/interfaces/UserRoleT";
import { AddCommentPrimaryOrder } from "./AddCommentPrimaryOrder";
import { Modal } from "../../../../common/components/modal/modal";
import { IPrimaryOrder } from "../../interfaces/PrimaryOrder";

interface IProps {
  id: string;
  comment: string;
  role: UserRoleT;
  onChangePrimaryOrder: (order: IPrimaryOrder) => void;
}

export const CommentPrimaryOrder = ({ comment, role, id, onChangePrimaryOrder }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showComment, setShowComment] = useState(false);

  return (
    <div>
      <div className={"flex gap-3"}>
        {comment ? (
          <div
            onClick={() => setShowComment(true)}
            className={"cursor-pointer font-medium text-blue-600"}
          >
            {lang.common.open}
          </div>
        ) : (
          <div> {lang.common.absent}</div>
        )}

        {role === "Admin" && (
          <button
            className={"h-5 w-5 text-gray-400 transition-colors hover:text-orange-500"}
            onClick={() => setShowAddForm(true)}
          >
            <PlusIcon />
          </button>
        )}
      </div>
      {showAddForm && (
        <Modal
          title={
            comment ? lang.modal.application.comment_change : lang.modal.application.comment_add
          }
          content={
            <AddCommentPrimaryOrder
              onChangePrimaryOrder={onChangePrimaryOrder}
              id={id}
              comment={comment}
              onClose={() => setShowAddForm(false)}
            />
          }
          outsideClick={() => setShowAddForm(false)}
        />
      )}

      {showComment && (
        <Modal
          title={lang.table.comment}
          content={<div className={"h-44 overflow-auto p-4"}>{comment}</div>}
          outsideClick={() => setShowComment(false)}
        />
      )}
    </div>
  );
};

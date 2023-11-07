import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";
import { changePrimaryOrder } from "../../../../api/primary-order";
import { IPrimaryOrder } from "../../interfaces/PrimaryOrder";

interface IProps {
  id: string;
  comment: string;
  onClose: () => void;
  onChangePrimaryOrder: (order: IPrimaryOrder) => void;
}

export const AddCommentPrimaryOrder = (props: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const [comment, setComment] = useState(props.comment);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    changePrimaryOrder({ comment, id: props.id }).then((res) => {
      props.onChangePrimaryOrder(res);
      props.onClose();
    });
  };

  return (
    <form className={"p-4"} onSubmit={onSubmit}>
      <div>
        <label
          htmlFor={"likeIt"}
          className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {lang.modal.application.comment_enter}
        </label>
        <textarea
          rows={6}
          style={{ minHeight: "80px" }}
          className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={(e) => setComment(e.target.value)}
          id={"likeIt"}
          name={"likeIt"}
          value={comment}
        />
      </div>
      <div className="mb-2 flex items-center justify-center rounded-b border-t border-solid border-slate-200 pt-6 pl-6 pr-6">
        <button
          className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
          type="button"
          onClick={props.onClose}
        >
          {lang.common.cancel}
        </button>
        <button
          className={`${
            props.comment === comment ? "pointer-events-none bg-gray-400" : ""
          }  mr-1 mb-1 rounded bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600`}
          type="submit"
        >
          {lang.common.add}
        </button>
      </div>
    </form>
  );
};

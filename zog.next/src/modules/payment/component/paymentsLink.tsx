import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";

interface IProps {
  title: string | JSX.Element;
  onClick: () => void;
  link: string;
  classNameBG?: string;
}

export const PaymentsLink = ({ onClick, link, title, classNameBG }: IProps) => {
  if (!link) return null;
  return (
    <div className={" p-4"}>
      <div className={"flex items-center"}>
        <strong className={"text-xl"}>{title}</strong>
        <div onClick={onClick} className={"inline-flex h-6 w-6 cursor-pointer pl-2 text-gray-500"}>
          <DocumentDuplicateIcon />
        </div>
      </div>

      <div
        className={`mt-2 inline-block bg-gray-500 p-4 font-bold text-white ${classNameBG || ""}`}
      >
        {link}
      </div>
    </div>
  );
};

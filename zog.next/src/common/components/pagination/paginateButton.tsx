import React from "react";

interface IProps {
  content: JSX.Element;
  onClick?: () => void;
  className?: string;
}

export const PaginateButton = ({ content, onClick, className }: IProps) => {
  return (
    <li
      onClick={onClick}
      className={`cursor-pointer border  border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
        className || ""
      }`}
    >
      {content}
    </li>
  );
};

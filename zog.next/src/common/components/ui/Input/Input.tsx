import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label?: string;
  classWrapper?: string;
}

export const Input = ({ id, name, label, ...attr }: IProps) => {
  return (
    <div className={attr.classWrapper}>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        {...attr}
      />
    </div>
  );
};

import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, InputHTMLAttributes, useCallback } from "react";
import { useDndFiles } from "../hooks/useDndFiles";
import { checkInputFileExist } from "../constants/checkInputFileExist";
import { useRouter } from "next/router";
import { getLanguage } from "../../../public/locales/lang";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  files: File[];
  setFiles: (cb: (value: File[]) => File[]) => void;
}

export const InputFile = ({ files, setFiles, ...attr }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale).setting.banners;

  const deleteFile = (name: string) => setFiles((prev) => prev.filter((el) => el.name !== name));
  const setFilesDnd = useCallback(
    (files: File[]) => {
      if (!attr.multiple) {
        const file = files[0] as File;
        setFiles(() => [file]);
        return;
      }
      setFiles((prev) => checkInputFileExist([...prev, ...files]));
    },
    [attr.multiple]
  );
  const { refDrop, dragging } = useDndFiles<HTMLDivElement>(setFilesDnd);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length) {
      const files = e.target.files;
      if (!attr.multiple) {
        const file = files[0] as File;
        setFiles(() => [file]);
        return;
      }
      setFiles((prev) => checkInputFileExist([...prev, ...files]));
    }
  };

  return (
    <div>
      <div ref={refDrop} draggable="true" className="flex w-full items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className={`dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100  ${
            dragging ? "border-orange-500 bg-orange-100" : ""
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className={"mb-4 h-10 w-10 text-gray-500"}>
              <ArrowUpTrayIcon />
            </div>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">{lang.click_download}</span> {lang.or_dnd_file}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{lang.png_jpg}</p>
          </div>
          <input
            onChange={handleChange}
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/jpg, image/jpeg, image/png"
            {...attr}
          />
        </label>
      </div>
      <div className={"mt-5 ml-2  flex flex-wrap items-center gap-5"}>
        {files.map((el, i) => (
          <div key={i} className={"flex items-center border p-1"}>
            <div className={"h-40 w-40 "}>
              <img
                className={"h-full w-full object-contain"}
                src={URL.createObjectURL(el)}
                alt="banner-mini"
              />
            </div>
            <div
              onClick={() => deleteFile(el.name)}
              className={
                "h-5 w-5 cursor-pointer text-gray-400 transition-colors hover:text-orange-500"
              }
            >
              <TrashIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

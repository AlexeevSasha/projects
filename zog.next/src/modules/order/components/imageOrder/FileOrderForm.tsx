import { InputFile } from "../../../../common/components/inputFile";
import { FormEvent, useState } from "react";
import { Loading } from "../../../../common/components/loading/loading";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

interface IProps {
  onClose: () => void;
  onSubmit: (files: File[]) => void;
  multiInput?: boolean;
}
export const FileOrderForm = ({ onClose, onSubmit, multiInput }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const addFiles = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(files);
    setLoading(false);
  };

  return (
    <div className={"relative"}>
      <form className={`relative flex-auto p-6 ${loading ? "pointer-events-none opacity-30" : ""}`}>
        <div className={"mb-5"}>
          <InputFile files={files} setFiles={setFiles} multiple={multiInput} />
        </div>
        <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 pt-6 pl-6 pr-6">
          <button
            className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
            type="button"
            onClick={onClose}
          >
            {lang.common.cancel}
          </button>
          <button
            disabled={!files.length || loading}
            onClick={addFiles}
            className={`mr-1 mb-1 rounded bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600 ${
              !files.length || loading ? "bg-gray-500 opacity-50" : ""
            }`}
            type="submit"
          >
            {lang.common.add}
          </button>
        </div>
      </form>
      {loading ? <Loading /> : null}
    </div>
  );
};

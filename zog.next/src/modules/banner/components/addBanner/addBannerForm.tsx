import { InputFile } from "../../../../common/components/inputFile";
import { addBanner } from "../../../../api/banner";
import { FormEvent, useState } from "react";
import { IBanner } from "../../interfaces/banner";
import { Loading } from "../../../../common/components/loading/loading";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";
import { OptionsT } from "../../../../common/interfaces/Options";
import { BannerAccessRole } from "../bannerAccessRole";
import { Input } from "../../../../common/components/ui/Input/Input";

interface IProps {
  onClose: () => void;
  setBanners: (banners: IBanner[]) => void;
}

export const AddBannerForm = ({ onClose, setBanners }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);

  const [selectedOption, setSelectedOption] = useState<OptionsT[]>([
    { value: "All", label: "Всем" },
  ]);
  const [link, setLink] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const addFiles = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const roles = selectedOption.map((el) => el.value);
    const banners = await addBanner(files, roles, link);
    if (banners) {
      setBanners(banners);
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className={"relative"}>
      <form className={`relative flex-auto p-6 ${loading ? "pointer-events-none opacity-30" : ""}`}>
        <div className={"mb-5"}>
          <InputFile files={files} setFiles={setFiles} />
        </div>
        <div className={"mb-5"}>
          <Input
            label={"Ссылка куда ведёт баннер"}
            id={"link"}
            name={"link"}
            value={link}
            required
            onChange={(e) => setLink(e.target.value)}
            className="h-10 w-full rounded border border-gray-400 py-1 px-2"
            placeholder={lang.setting.banners.enter_link}
          />
        </div>
        <div className={"mb-5"}>
          <BannerAccessRole value={selectedOption} setValue={setSelectedOption} />
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

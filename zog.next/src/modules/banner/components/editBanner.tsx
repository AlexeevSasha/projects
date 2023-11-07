import { FormEvent, useState } from "react";
import { Modal } from "../../../common/components/modal/modal";
import { changeBanner } from "../../../api/banner";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";
import { createPortal } from "react-dom";
import { OptionsT } from "../../../common/interfaces/Options";
import { BannerAccessRole } from "./bannerAccessRole";
import { userRoles } from "../../../common/constants/userRoles";
import { getRolesValue } from "../../user/constants/getRolesValue";
import { Input } from "../../../common/components/ui/Input/Input";

interface IProps {
  onDelete(): void;
  id: string;
  link: string;
  access: string[];
}

export const EditBanner = (props: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);

  const [link, setLink] = useState(props.link);
  const [selectedOption, setSelectedOption] = useState<OptionsT[]>(
    [
      { value: "All", label: "Всем" },
      ...userRoles?.map((elem) => ({
        value: elem,
        label: getRolesValue(lang)[elem],
      })),
    ].filter((el) => props.access.includes(el.value))
  );
  const [show, setShow] = useState({ delete: false, change: false });

  const onShowModal = (type: "delete" | "change", value: boolean) => {
    setShow((prev) => ({ ...prev, [type]: value }));
  };

  const deleteBanner = () => {
    onShowModal("delete", false);
    props.onDelete();
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const access = selectedOption.map((el) => el.value);
    await changeBanner(props.id, link, access);
    onShowModal("change", false);
  };

  return (
    <div>
      <div className={" flex w-full  flex-col md:flex-row"}>
        <div className={"flex-1"}>
          <button
            type={"button"}
            onClick={() => onShowModal("change", true)}
            className={
              "mt-2 w-full bg-green-500 p-2 font-bold text-white transition-colors hover:bg-green-700"
            }
          >
            {lang.setting.banners.change_banner}
          </button>

          {show.change &&
            createPortal(
              <Modal
                title={lang.setting.banners.change_banner}
                content={
                  <form onSubmit={onSubmit} className={"flex flex-col gap-4 p-4 "}>
                    <Input
                      label={"Ссылка куда ведёт баннер"}
                      id={"link"}
                      name={"link"}
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="h-10 w-full rounded border border-gray-400 py-1 px-2"
                      placeholder={lang.setting.banners.enter_link}
                    />

                    <div className={"w-full"}>
                      <BannerAccessRole value={selectedOption} setValue={setSelectedOption} />
                    </div>
                    <button type={"submit"} className=" rounded bg-blue-500 p-2 text-white">
                      {lang.common.add}
                    </button>
                  </form>
                }
                outsideClick={() => onShowModal("change", false)}
              />,
              document.getElementById("portal") as HTMLDivElement
            )}
        </div>

        <div className={"flex-1"}>
          <button
            type={"button"}
            onClick={() => onShowModal("delete", true)}
            className={
              "mt-2 w-full bg-red-400 p-2 font-bold text-white transition-colors hover:bg-red-700"
            }
          >
            {lang.setting.banners.delete_banner}
          </button>
          {show.delete &&
            createPortal(
              <Modal
                title={lang.setting.banners.you_sure_delete_banner}
                content={
                  <div className="mb-2 flex items-center justify-center rounded-b border-t border-solid border-slate-200 pt-6 pl-6 pr-6">
                    <button
                      className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                      type="button"
                      onClick={() => onShowModal("delete", false)}
                    >
                      {lang.common.cancel}
                    </button>
                    <button
                      className="mr-1 mb-1 rounded bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
                      type="submit"
                      onClick={deleteBanner}
                    >
                      {lang.setting.banners.delete_banner}
                    </button>
                  </div>
                }
                outsideClick={() => onShowModal("delete", false)}
              />,
              document.getElementById("portal") as HTMLDivElement
            )}
        </div>
      </div>
    </div>
  );
};

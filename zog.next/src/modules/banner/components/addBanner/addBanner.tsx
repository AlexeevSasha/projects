import { PlusIcon } from "@heroicons/react/24/solid";
import { useCallback, useState } from "react";
import { Modal } from "../../../../common/components/modal/modal";
import { AddBannerForm } from "./addBannerForm";
import { IBanner } from "../../interfaces/banner";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

interface IProps {
  setBanners: (banners: IBanner[]) => void;
}

export const AddBanner = ({ setBanners }: IProps) => {
  const { locale } = useRouter();

  const [show, setShow] = useState(false);

  const onClose = useCallback(() => setShow(false), []);
  return (
    <div>
      <button
        className={
          " flex items-center gap-2  rounded-lg bg-blue-500 p-3 py-2 font-bold  text-white transition-colors hover:bg-blue-700 "
        }
        onClick={() => setShow(true)}
      >
        <div className={" h-5 w-5"}>
          <PlusIcon />
        </div>
        {getLanguage(locale).setting.banners.add_new_banner}
      </button>

      {show && (
        <Modal
          title={getLanguage(locale).setting.banners.add_new_banner}
          content={<AddBannerForm setBanners={setBanners} onClose={onClose} />}
          outsideClick={onClose}
        />
      )}
    </div>
  );
};

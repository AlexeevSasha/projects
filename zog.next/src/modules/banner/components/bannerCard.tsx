import { Bars3Icon } from "@heroicons/react/24/solid";
import { IBanner } from "../interfaces/banner";
import { useCallback, useState } from "react";
import { Loading } from "../../../common/components/loading/loading";
import { EditBanner } from "./editBanner";

interface IProps extends IBanner {
  deleteBanner: (id: string) => void;
  classNames?: string;
}

export const BannerCard = ({
  url,
  public_id,
  deleteBanner,
  id,
  link,
  classNames,
  access,
}: IProps) => {
  const [loading, setLoading] = useState(true);

  const deleteCard = useCallback(async () => {
    setLoading(true);
    await deleteBanner(public_id);
    setLoading(false);
  }, [public_id]);

  return (
    <div className={"relative "}>
      <div
        className={`border p-1 hover:border-orange-500 ${classNames || ""} ${
          loading ? "pointer-events-none opacity-30" : ""
        }`}
      >
        <div className={"flex  items-center"}>
          <div className={"flex w-16 justify-center"}>
            <button className={"h-7 w-7 text-gray-400 transition-colors hover:text-orange-500"}>
              <Bars3Icon />
            </button>
          </div>
          <div style={{ flex: 1, margin: "0 auto" }} className={" w-full max-w-sm overflow-hidden"}>
            <img
              onLoad={() => setLoading(false)}
              className={"h-full w-full object-contain"}
              key={url}
              src={url}
              alt="banners"
            ></img>
          </div>
        </div>
        <EditBanner id={id} onDelete={deleteCard} link={link} access={access} />
      </div>
      {loading ? <Loading /> : null}
    </div>
  );
};

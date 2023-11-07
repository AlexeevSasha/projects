import { IBanner } from "../interfaces/banner";
import { useState } from "react";
import { Loading } from "../../../common/components/loading/loading";

export const BannerCardLink = ({ url, link }: IBanner) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={"w-fll relative inline-block overflow-hidden   sm:max-w-xs"}>
      <a
        className={`${loading ? "pointer-events-none opacity-30" : ""}`}
        target={"_blank"}
        href={link}
        rel="noreferrer"
        download
      >
        <img
          className={"h-full w-full object-contain"}
          onLoad={() => setLoading(false)}
          src={url}
          alt="banner"
        />
      </a>
      {loading ? <Loading /> : null}
    </div>
  );
};

import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import { linkPartnerRegister, linkPartnerUtm } from "../constants/links";
import { useMemo } from "react";
import { UserPartnerInfoT } from "../../user/interfaces/UserT";
import { useCopyToClipboard } from "../../../common/hooks/useCopyToClipboard";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  user: UserPartnerInfoT;
}

export const PartnerLink = ({ user }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale).partner;
  const { copy } = useCopyToClipboard();
  const linkUtm = useMemo(() => linkPartnerUtm(user.utm_partner || ""), [user?.utm_partner]);
  const linkRegister = useMemo(() => linkPartnerRegister(user?.id), [user?.id]);

  return (
    <div>
      <div className={"mb-4"}>
        <div>
          <h2 className={"inline-block bg-blue-200 p-1 font-bold "}>{lang.link_form}</h2>
          <div
            onClick={() => copy(linkUtm)}
            className={"inline-flex h-6 w-6 cursor-pointer pl-2 text-gray-500"}
          >
            <DocumentDuplicateIcon />
          </div>
        </div>

        <a
          className="block text-blue-600 underline decoration-current"
          href={linkUtm}
          target="_blank"
          rel="noreferrer"
        >
          {linkUtm}
        </a>
      </div>
      <hr />
      {user.mainPartner ? null : (
        <div className={"pt-4"}>
          <div>
            <h2 className={" mb-1 inline-block bg-green-300 p-1 font-bold"}>
              {lang.link_register}
            </h2>
            <div
              onClick={() => copy(linkRegister)}
              className={"inline-flex h-6 w-6 cursor-pointer pl-2 text-gray-500"}
            >
              <DocumentDuplicateIcon />
            </div>
          </div>

          <p className="text-blue-600 ">{linkRegister}</p>
        </div>
      )}
    </div>
  );
};

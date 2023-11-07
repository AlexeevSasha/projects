import { UserPartnerInfoT } from "../../user/interfaces/UserT";
import { useMemo, Fragment } from "react";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

export const usePartner = (user: UserPartnerInfoT) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale).partner;

  const subjectPartners = useMemo(
    () => (
      <div>
        {user?.subjectPartners && user?.subjectPartners.length ? (
          <span className={"mb-1 bg-gray-200 p-2"}>
            {lang.you_are} <strong>{lang.main_partner}</strong> {lang.for}:
          </span>
        ) : (
          <span className={"bg-gray-200 p-2"}>
            {lang.you_are_not_anyone} <strong>{lang.main_partner}</strong>
          </span>
        )}
        {user?.subjectPartners?.map((el, i, array) => (
          <Fragment key={el.id}>
            <div className={"pt-3 pl-1"}>
              {el?.name ? el?.name + " - " : ""}
              {el.email}
            </div>
            {array.length - 1 !== i && <hr />}
          </Fragment>
        ))}
      </div>
    ),
    [user.subjectPartners?.length, lang]
  );

  return { subjectPartners };
};

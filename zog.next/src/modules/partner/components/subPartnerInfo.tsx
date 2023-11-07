import { PaysSubPartnerT } from "../../user/interfaces/PaysSubPartnerT";
import { AppTable } from "../../../components/ui/AppTable";
import { subPartnerColumns } from "../constants/subPartnerColumns";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  paysSubPartner: PaysSubPartnerT[];
}

export const SubPartnerInfo = ({ paysSubPartner }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);

  return paysSubPartner.length ? (
    <AppTable columns={subPartnerColumns(lang)} rows={paysSubPartner} />
  ) : (
    <div className={"p-4 text-center"}>{lang.partner.history_empty}</div>
  );
};

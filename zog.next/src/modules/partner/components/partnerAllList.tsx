import { InvoiceInfoT } from "../interfaces/InvoiceInfoT";
import { AppTable } from "../../../components/ui/AppTable";
import { allPartnerTableColumns } from "../constants/allPartnerTableColumns";
import { useMemo, useState } from "react";
import { getAllBalance } from "../constants/getAllBalance";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  partnerList: InvoiceInfoT[];
}

export const PartnerAllList = ({ partnerList }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const [lists, setLists] = useState(partnerList);
  const { balance, review } = useMemo(() => getAllBalance(lists), [lists]);

  const onDelete = (id: string) => {
    setLists((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <div>
      <div className={"mb-2 mt-4 p-3"}>
        <div className={"mb-1 font-bold"}>Всего:</div>
        <div>
          {lang.partner.balance}: <strong>{balance} ₽</strong>
        </div>
        <div>
          {lang.partner.requested}: <strong>{review} ₽</strong>
        </div>
      </div>
      <hr />
      <AppTable columns={allPartnerTableColumns(lang, onDelete)} rows={lists} />
    </div>
  );
};

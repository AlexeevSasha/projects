import axios from "axios";
import { useEffect, useState } from "react";
import { AppTable } from "../../../components/ui/AppTable";
import { partnerOrdersTableColumns } from "../constants/partnerOrdersTableColumns";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

/**
 * Таблица с заявками клиентов, которые пришли от текущего партнёра
 */

export const PartnerOrdersTable = () => {
  const { locale } = useRouter();

  const [tableData, setTableData] = useState();
  useEffect(() => {
    axios.get("/api/clients/getFromPartner").then((res) => {
      setTableData(res.data.data);
    });
  }, []);

  return <AppTable columns={partnerOrdersTableColumns(getLanguage(locale))} rows={tableData} />;
};

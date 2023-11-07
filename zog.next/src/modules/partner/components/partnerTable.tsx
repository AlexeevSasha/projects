import axios from "axios";
import { useEffect, useState } from "react";
import { AppTable } from "../../../components/ui/AppTable";
import { partnerOrdersTableColumns } from "../constants/partnerOrdersTableColumns";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

/**
 * Таблица с партнёрами
 */

export const PartnerTable = () => {
  const { locale } = useRouter();
  const [tableData, setTableData] = useState();
  useEffect(() => {
    axios.get("/api/clients").then((res) => {
      setTableData(res.data.data);
    });
  }, []);

  return <AppTable columns={partnerOrdersTableColumns(getLanguage(locale))} rows={tableData} />;
};

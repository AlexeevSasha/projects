import { useSession } from "next-auth/react";
import { AppTable } from "../../../../components/ui/AppTable";
import { orderTableColumns } from "../../constants/orderTableColumns";
import { OrderT } from "../../interfaces/OrderT";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";
import { useEffect, useMemo, useState } from "react";
import { UserT } from "../../../user/interfaces/UserT";

interface IProps {
  orders: OrderT[];
  handlerDelete: (id: string) => void;
  updateClientList: (order: OrderT) => void;
}

export const TableOrders = ({ orders, handlerDelete, updateClientList }: IProps) => {
  const { data } = useSession();
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const [user, setUser] = useState<UserT | null>(null);

  useEffect(() => {
    !user && data?.user && setUser(data?.user as UserT);
  }, [data?.user]);

  return useMemo(
    () => (
      <AppTable
        columns={orderTableColumns(lang, user, handlerDelete, updateClientList)}
        rows={orders}
      />
    ),
    [lang, user, orders.length]
  );
};

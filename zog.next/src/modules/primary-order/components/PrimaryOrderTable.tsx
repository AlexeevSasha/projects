import { IPrimaryOrder } from "../interfaces/PrimaryOrder";
import { AppTable } from "../../../components/ui/AppTable";
import { primaryOrderTableColumns } from "../constants/primaryOrderTableColumns";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { UserT } from "../../user/interfaces/UserT";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  primaryOrderList: IPrimaryOrder[];
  onDeletePrimaryOrder: (id: string) => void;
  onChangePrimaryOrder: (order: IPrimaryOrder) => void;
}

export const PrimaryOrderTable = ({
  primaryOrderList,
  onDeletePrimaryOrder,
  onChangePrimaryOrder,
}: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const { data } = useSession();
  const [user, setUser] = useState<UserT | null>(null);

  useEffect(() => {
    !user && data?.user && setUser(data?.user as UserT);
  }, [data?.user]);

  return useMemo(
    () => (
      <div>
        <AppTable
          columns={primaryOrderTableColumns(lang, user, onDeletePrimaryOrder, onChangePrimaryOrder)}
          rows={primaryOrderList}
        />
      </div>
    ),
    [user, locale, primaryOrderList]
  );
};

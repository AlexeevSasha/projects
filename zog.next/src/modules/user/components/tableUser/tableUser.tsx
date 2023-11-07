import { useSession } from "next-auth/react";
import { userRoles } from "../../../../common/constants/userRoles";
import { AppTable } from "../../../../components/ui/AppTable";
import { userTableColumns } from "../../constants/userTableColumns";
import { UserPartnerInfoT } from "../../interfaces/UserT";
import { UserRoleT } from "../../interfaces/UserRoleT";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

interface IProps {
  users: UserPartnerInfoT[];
  updateRole: (role: UserRoleT, isPartner: boolean, user: UserPartnerInfoT) => void;
  updateUsersList: (user: UserPartnerInfoT) => void;
  handlerDeleteUser: (id: string) => void;
}

export const TableUser = ({ users, updateRole, updateUsersList, handlerDeleteUser }: IProps) => {
  const { data } = useSession();
  const { locale } = useRouter();
  const lang = getLanguage(locale);

  return (
    <AppTable
      columns={userTableColumns(
        lang,
        userRoles,
        data?.user?.id || "",
        updateRole,
        updateUsersList,
        handlerDeleteUser
      )}
      rows={users}
    />
  );
};

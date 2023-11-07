import { createColumnHelper } from "@tanstack/react-table";
import { UserPartnerInfoT } from "../interfaces/UserT";
import { UserRoleT } from "../interfaces/UserRoleT";
import { ChangeUser } from "../components/changeUser/changeUser";
import { DeleteUser } from "../components/deleteUser";
import { deleteUser } from "../../../api/user";
import { LanguageT } from "../../../common/interfaces/LanguageT";

const columnHelper = createColumnHelper<UserPartnerInfoT>();

export const userTableColumns = (
  lang: LanguageT,
  roles: UserRoleT[],
  userId: string,
  updateRole: (role: UserRoleT, isPartner: boolean, user: UserPartnerInfoT) => void,
  updateUsersList: (user: UserPartnerInfoT) => void,
  handlerDeleteUser: (id: string) => void
) => {
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>{lang.table.name}</span>,
    }),
    columnHelper.accessor("email", {
      cell: (info) => String(info.getValue()),
      header: () => <span>{lang.table.email}</span>,
    }),
    columnHelper.accessor("utm_partner", {
      cell: (info) => {
        const access = info.row.original.userRole === "Partner" || info.row.original.isPartner;
        return access ? info.getValue()?.toString() : "";
      },
      header: () => <span>{lang.table.utm_partner}</span>,
    }),
    columnHelper.accessor("userRole", {
      cell: (info) => (
        <select
          value={info.getValue()}
          id="countries"
          className="block w-full w-24 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={(event) =>
            updateRole(
              event.currentTarget.value as UserRoleT,
              info.row.original.isPartner,
              info.row.original
            )
          }
          disabled={userId === info.row.original.id}
        >
          {roles?.map((elem) => (
            <option key={elem} value={elem}>
              {elem}
            </option>
          ))}
        </select>
      ),
      header: () => <span>{lang.table.role}</span>,
    }),
    columnHelper.accessor("isPartner", {
      cell: (info) => (
        <div className={"c flex justify-center "}>
          <input
            checked={info.getValue()}
            type="checkbox"
            className="h-6  w-6 cursor-pointer rounded-md border-0 text-green-600 focus:ring-0"
            disabled={info.row.original.userRole === "Partner"}
            onChange={(event) => {
              updateRole(
                info.row.original.userRole,
                event.currentTarget.checked,
                info.row.original
              );
            }}
          />
        </div>
      ),
      header: () => <div className={"text-center"}>{lang.table.partner}</div>,
    }),
    columnHelper.accessor("mainPartner", {
      cell: (info) => <div className={"flex justify-center"}>{info?.getValue()?.email || ""}</div>,
      header: () => <div className={"text-center"}>{lang.table.main_partner}</div>,
    }),
    columnHelper.accessor("id", {
      cell: (info) => {
        return (
          <div className={"flex justify-center gap-3 "}>
            <ChangeUser updateUsersList={updateUsersList} user={info.cell.row.original} />
            <DeleteUser
              onDelete={() => deleteUser(info.getValue(), handlerDeleteUser)}
              user={info.cell.row.original}
            />
          </div>
        );
      },
      header: () => <div className={"text-center"}>{lang.table.actions}</div>,
    }),
  ];

  return columns;
};

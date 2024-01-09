import React, { useMemo } from "react";
import { UserRolesEnum } from "../../../common/interfaces/user/UserRolesEnum";
import { AppSettings } from "../../../common/constants/appSettings";
import { IControlTable } from "../../../common/components/Table/TableBody";
import { useHistory } from "react-router";
import { IThead } from "../../../common/components/Table/TableHead";
import { useSelector } from "react-redux";
import { authorizationSelector } from "../../../module/authorization/authorizationSelector";
import { ModalText } from "../../../common/components/Popup/ui/ModalText";

interface IProps {
  onDeleteRegister: (id: number) => void;
}

export const useRegisterTable = ({ onDeleteRegister }: IProps) => {
  const history = useHistory();
  const { login } = useSelector(authorizationSelector);

  const tableHead: IThead[] = useMemo(
    () => [
      {
        name: "ID Заявки",
        value: "idOrder",
        width: "100%",
        type: "open_link",
        onClick: (value: number) => history.push(`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal/${value}/info`),
      },
      { name: "ID Регистра", value: "id", width: "100%" },
      { name: "Наименование регистра", value: "name", width: "100%" },
      { name: "Статус", value: "status", width: "100%" },
      { name: "Дата создания", value: "createdAt", type: "date", width: "150px" },
      { name: "Дата обновления", value: "lastUpdate", type: "date", width: "150px" },
    ],
    [history]
  );

  const control = useMemo(() => {
    const items = [
      {
        name: "watch",
        onClick: (value) => history.push(`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/register/${value}/checklist`),
        value: "id",
      } as IControlTable,
      {
        name: "clickRow",
        onClick: (value) => history.push(`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/register/${value}/checklist`),
        value: "id",
      } as IControlTable,
    ];

    if (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) {
      items.push({
        name: "delete",
        onClick: (value) => onDeleteRegister(Number(value) || 0),
        value: "id",
        modalSettings: {
          description: (
            <ModalText>
              Вместе с регистром удалятся все созданные в нем <br />
              контрольные списки, критерии включения и прочие <br />
              настройки. Восстановить удаленные настройки будет <br />
              невозможно
            </ModalText>
          ),
        },
      });
    }

    return items;
  }, [login, history, onDeleteRegister]);

  return { tableHead, control };
};

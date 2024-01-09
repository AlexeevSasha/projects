import React, { useEffect, useMemo, useState } from "react";
import { UserRolesEnum } from "../../../../common/interfaces/user/UserRolesEnum";
import { OrderStatusEnum } from "../../../../common/interfaces/order/OrderStatusEnum";
import { IconEye } from "../../../../common/components/Icon/IconEye";
import { IconEdit } from "../../../../common/components/Icon/IconEdit";
import { IconContainerFloatingmes } from "common/components/Table/UIcomponent/UIcomponent";
import { ru } from "common/lang/ru";
import styled from "styled-components";
import { ModalDeleteWIthIcon } from "../../../../common/components/Modal/ModalDeleteWIthIcon";

interface IProps {
  user: string;
  status: OrderStatusEnum;
  openOrder: (id: number) => void;
  deleteOrder: (id: number) => void;
  id: number;
}

export const Controls: React.FC<IProps> = (props) => {
  const [deleteButton, setDeleteButton] = useState(<></>);
  const [editButton, setEditButton] = useState(<></>);
  const [viewButton, setViewButton] = useState(<></>);

  const deleteContent = useMemo(
    () => <ModalDeleteWIthIcon id={"delete_" + props.id} onDelete={async () => props.deleteOrder(props.id)} />,
    [props]
  );

  const editContent = (
    <IconContainerFloatingmes
      title={ru.floatingmes.edit}
      onClick={() => props.openOrder(props.id)}
      id={"edit_" + props.id}
    >
      <IconEdit />
    </IconContainerFloatingmes>
  );

  const viewContent = (
    <IconContainerFloatingmes title={"Открыть"} onClick={() => props.openOrder(props.id)} id={"view_" + props.id}>
      <IconEye />
    </IconContainerFloatingmes>
  );

  useEffect(() => {
    if (props.status === OrderStatusEnum.New) {
      if (
        props.user === UserRolesEnum.RegistryExpert ||
        props.user === UserRolesEnum.RegistrySuperExpert ||
        props.user === UserRolesEnum.RegistryAdmin ||
        props.user === UserRolesEnum.RegistrySuperUsr
      ) {
        setDeleteButton(deleteContent);
        setEditButton(editContent);
      }
    } else {
      if (props.status === OrderStatusEnum.Validation) {
        if (props.user === UserRolesEnum.RegistryExpert || props.user === UserRolesEnum.RegistrySuperExpert) {
          setViewButton(viewContent);
        }
        if (props.user === UserRolesEnum.RegistryAdmin || props.user === UserRolesEnum.RegistrySuperUsr) {
          setEditButton(editContent);
        }
      } else {
        if (props.status === OrderStatusEnum.Completed) {
          if (
            props.user === UserRolesEnum.RegistryExpert ||
            props.user === UserRolesEnum.RegistrySuperExpert ||
            props.user === UserRolesEnum.RegistryAdmin ||
            props.user === UserRolesEnum.RegistryOrgCurator ||
            props.user === UserRolesEnum.RegistryDiseaseKurator
          ) {
            setViewButton(viewContent);
          }
          if (props.user === UserRolesEnum.RegistrySuperUsr) {
            setEditButton(editContent);
          }
        } else {
          if (props.status === OrderStatusEnum.Editing) {
            if (
              props.user === UserRolesEnum.RegistryExpert ||
              props.user === UserRolesEnum.RegistrySuperExpert ||
              props.user === UserRolesEnum.RegistrySuperUsr ||
              props.user === UserRolesEnum.RegistryAdmin
            ) {
              setEditButton(editContent);
            }
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <ControlContainer>
      {viewButton}
      {editButton}
      {deleteButton}
    </ControlContainer>
  );
};

const ControlContainer = styled.div`
  width: 80px;
  display: flex;
  justify-content: flex-end;
`;

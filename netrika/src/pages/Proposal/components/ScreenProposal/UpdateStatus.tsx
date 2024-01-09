import { theme } from "common/styles/theme";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOrderListItem } from "../../../../common/interfaces/order/IOrderListItem";
import { OrderStatusEnum } from "../../../../common/interfaces/order/OrderStatusEnum";
import { IOrderStatusTrigger } from "../../../../common/interfaces/order/IOrderStatusTrigger";
import { OrderTriggerEnum } from "../../../../common/interfaces/order/OrderTriggerEnum";
import { UserRolesEnum } from "../../../../common/interfaces/user/UserRolesEnum";
import { styled } from "../../../../common/styles/styled";
import { authorizationSelector } from "../../../../module/authorization/authorizationSelector";
import { ProposalGeneralInfoThunk } from "../../../../module/proposalGeneralInfo/proposalGeneralInfoThunk";
import { ProposalListThunk } from "../../../../module/proposalList/proposalListThunk";
import { Controls } from "./Controls";

interface IProps {
  info: IOrderListItem;
  openOrder: (id: number) => void;
  updateList: () => void;
  id: string;
  orderID: number;
}

export const UpdateStatus: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const stateAuth = useSelector(authorizationSelector);

  const deleteProposal = useCallback(
    async (id: number) => {
      await dispatch(ProposalListThunk.delete(id));
      props.updateList();
    },
    [props, dispatch]
  );

  const proposalTo = async (info: IOrderListItem, status: OrderStatusEnum, trigger: OrderTriggerEnum) => {
    await dispatch(ProposalGeneralInfoThunk.updateStatus(info.id, { status, trigger } as IOrderStatusTrigger));
    props.updateList();
  };

  const proposalToReject = async (info: IOrderListItem) => {
    if (info.tableName) {
      await dispatch(
        ProposalGeneralInfoThunk.updateStatus(info.id, {
          status: OrderStatusEnum.Editing,
          trigger: OrderTriggerEnum.Reject,
        })
      );
    } else {
      await dispatch(
        ProposalGeneralInfoThunk.updateStatus(info.id, {
          status: OrderStatusEnum.New,
          trigger: OrderTriggerEnum.RejectNew,
        })
      );
    }
    props.updateList();
  };

  return (
    <Act>
      <ContainerButton>
        {props.info.actions &&
          props.info.actions.map((item) => (
            <div key={item}>
              {item === OrderTriggerEnum.Validate &&
                (stateAuth.login === UserRolesEnum.RegistryExpert ||
                  stateAuth.login === UserRolesEnum.RegistrySuperExpert ||
                  stateAuth.login === UserRolesEnum.RegistryAdmin ||
                  stateAuth.login === UserRolesEnum.RegistrySuperUsr) && (
                  <ButtonAct
                    id={props.id + "validate_" + props.orderID}
                    onClick={() => proposalTo(props.info, OrderStatusEnum.Validation, OrderTriggerEnum.Validate)}
                  >
                    Отправить в обработку
                  </ButtonAct>
                )}

              {item === OrderTriggerEnum.ReturnToValidate && stateAuth.login === UserRolesEnum.RegistrySuperUsr && (
                <ButtonAct
                  id={props.id + "return_to_validate_" + props.orderID}
                  onClick={() => proposalTo(props.info, OrderStatusEnum.Validation, OrderTriggerEnum.ReturnToValidate)}
                >
                  Вернуть в обработку
                </ButtonAct>
              )}

              {item === OrderTriggerEnum.Publication &&
                (stateAuth.login === UserRolesEnum.RegistryAdmin ||
                  stateAuth.login === UserRolesEnum.RegistrySuperUsr) && (
                  <ButtonAct
                    id={props.id + "publication_" + props.orderID}
                    onClick={() => proposalTo(props.info, OrderStatusEnum.Completed, OrderTriggerEnum.Publication)}
                  >
                    Публикация
                  </ButtonAct>
                )}

              {item === OrderTriggerEnum.Modify &&
                (stateAuth.login === UserRolesEnum.RegistryExpert ||
                  stateAuth.login === UserRolesEnum.RegistrySuperExpert ||
                  stateAuth.login === UserRolesEnum.RegistryAdmin ||
                  stateAuth.login === UserRolesEnum.RegistrySuperUsr) && (
                  <ButtonAct
                    id={props.id + "modify_" + props.orderID}
                    onClick={() => proposalTo(props.info, OrderStatusEnum.Editing, OrderTriggerEnum.Modify)}
                  >
                    Внести изменения
                  </ButtonAct>
                )}

              {item === OrderTriggerEnum.Development &&
                (stateAuth.login === UserRolesEnum.RegistryExpert ||
                  stateAuth.login === UserRolesEnum.RegistrySuperExpert ||
                  stateAuth.login === UserRolesEnum.RegistryAdmin ||
                  stateAuth.login === UserRolesEnum.RegistrySuperUsr) && (
                  <ButtonAct
                    id={props.id + "development_" + props.orderID}
                    onClick={() => proposalTo(props.info, OrderStatusEnum.Validation, OrderTriggerEnum.Development)}
                  >
                    Отправить в разработку
                  </ButtonAct>
                )}

              {item === OrderTriggerEnum.Reject &&
                (stateAuth.login === UserRolesEnum.RegistryAdmin ||
                  stateAuth.login === UserRolesEnum.RegistrySuperUsr) && (
                  <ButtonAct id={props.id + "reject_" + props.orderID} onClick={() => proposalToReject(props.info)}>
                    Отклонить
                  </ButtonAct>
                )}
            </div>
          ))}
      </ContainerButton>
      <VerticalLine />
      <Controls
        user={stateAuth.login}
        status={props.info.status}
        openOrder={props.openOrder}
        deleteOrder={deleteProposal}
        id={props.info.id}
      />
    </Act>
  );
};

const Act = styled.div`
  display: flex;
`;

const VerticalLine = styled.div`
  background: ${theme.colors.lightGray};
  width: 1px;
  min-width: 1px;
  margin-left: 20px;
`;

const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  flex-wrap: wrap;
`;

export const ButtonAct = styled.div`
  line-height: 130%;
  padding: 4px 30px;
  color: ${theme.colors.hightBlue};
  border: 1px solid ${theme.colors.hightBlue};
  box-sizing: border-box;
  border-radius: 19px;
  margin: 2px 4px;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.green};
    border: 1px solid ${theme.colors.green};
  }
`;

import { IOrder } from "../../../../common/interfaces/order/IOrder";
import { orderStatusMap } from "../../../../common/helpers/orderStatusMap";
import { OrderTriggerEnum } from "../../../../common/interfaces/order/OrderTriggerEnum";
import { UserRolesEnum } from "../../../../common/interfaces/user/UserRolesEnum";
import { Button } from "../../../../common/ui/Button/Button";
import { ProposalGeneralInfoThunk } from "../../../../module/proposalGeneralInfo/proposalGeneralInfoThunk";
import { OrderStatusEnum } from "../../../../common/interfaces/order/OrderStatusEnum";
import moment from "moment/moment";
import { IconInfo } from "../../../../common/components/Icon/IconInfo";
import React from "react";
import { styled } from "../../../../common/styles/styled";
import { theme } from "../../../../common/styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { proposalGeneralInfoSelector } from "../../../../module/proposalGeneralInfo/proposalGeneralInfoSelector";
import { authorizationSelector } from "../../../../module/authorization/authorizationSelector";

export const StatementDataProposal = (props: IOrder) => {
  const dispatch = useDispatch();
  const state = useSelector(proposalGeneralInfoSelector);
  const stateAuth = useSelector(authorizationSelector);

  return (
    <StatementData>
      <Title>Данные заявления</Title>
      {props.id && (
        <Row>
          ID Заявки:
          <span id={"order_id"}>{props.id}</span>
        </Row>
      )}
      {props?.registerId && (
        <Row>
          ID Регистра:
          <span id={"order_id"}>{props.registerId}</span>
        </Row>
      )}
      <Row>
        Статус заявки:
        <ButtonContainer>
          <span>{orderStatusMap.get(props.status)}</span>
          {props.actions?.find((item) => item === OrderTriggerEnum.Publication) &&
            (stateAuth.login === UserRolesEnum.RegistryAdmin || stateAuth.login === UserRolesEnum.RegistrySuperUsr) && (
              <Button
                style={{
                  paddingTop: 4,
                  paddingBottom: 4,
                }}
                isLoading={state.loadingOrderStatus}
                id={"publication_" + props.id}
                onClick={() =>
                  !state.loadingOrderStatus &&
                  dispatch(
                    ProposalGeneralInfoThunk.updateStatusGeneralInfo(props.id, {
                      status: OrderStatusEnum.Completed,
                      trigger: OrderTriggerEnum.Publication,
                    })
                  )
                }
              >
                Публикация
              </Button>
            )}
        </ButtonContainer>
      </Row>
      <Row>
        Дата создания:
        <span>{moment(props.creationDate).format("DD MMMM YYYY")}</span>
      </Row>
      <Row>
        Заявитель:
        <span>{props.userName}</span>
      </Row>
      <BlockInfo>
        <div>
          <IconInfo />
        </div>
        <span>Данную заявку можно сохранить на любом этапе и позднее продолжить редактирование.</span>
      </BlockInfo>
    </StatementData>
  );
};

const Title = styled.h2`
  margin-bottom: 16px;
`;

const StatementData = styled.div`
  margin: 12px 0;
  position: relative;
`;

const Row = styled.div`
  color: ${theme.colors.hightBlue};
  display: grid;
  grid-template-columns: 280px auto;
  padding: 5px 0;
  position: relative;

  span {
    color: ${theme.colors.black};
    font-weight: 600;
  }
`;

const BlockInfo = styled.div`
  position: absolute;
  width: 300px;
  right: 80px;
  top: 35px;
  display: flex;
  line-height: 19px;
  letter-spacing: 0.0025em;
  color: ${theme.colors.hightBlue};

  div {
    margin-right: 16px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

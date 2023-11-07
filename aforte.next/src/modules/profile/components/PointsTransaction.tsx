import styled from "astroturf/react";
import { Button } from "common/components/Button";
import { useState } from "react";
import { UserPointsTransactionT } from "../interfaces/userPointsTransaction";

type Props = {
  transaction: UserPointsTransactionT[];
};

export const PointsTransaction = ({ transaction }: Props) => {
  const [transactionCount, setTransactionCoun] = useState(4);
  return (
    <Conteinter>
      <Title>История списания <span>и начисления</span></Title>
      <ListWrapper>
        {transaction
          .map((item) => (
            <div key={item.id}>
              <PaymentDateMobile>{item.date}</PaymentDateMobile>
              <TransactionBlock>
                <TransactionInfo>
                  <TransactionType>
                    {item.type === "payment" ? "Оплата заказа" : "Начисление за заказ"}
                  </TransactionType>
                  <OrderNumber>
                    {item.type === "payment"
                      ? `Списание за заказ №${item.orderNumber}`
                      : `Начисление за заказ №${item.orderNumber}`}
                  </OrderNumber>
                </TransactionInfo>
                <PaymentInfo>
                  <PaymentDate>{item.date}</PaymentDate>
                  <PointsCount additional={item.type === "additional"}>
                    {item.type === "payment" ? "-" : "+"} {item.sum}
                  </PointsCount>
                </PaymentInfo>
              </TransactionBlock>
              <CustomLine />
            </div>
          ))
          .slice(0, transactionCount)}
      </ListWrapper>
      <CustomButton typeBtn="lightBlue" onClick={() => setTransactionCoun(transactionCount + 1)}>Показать еще</CustomButton>
    </Conteinter>
  );
};
const Conteinter = styled.div`
  @import "variables";
  background: $white;
  display: flex;
  flex-direction: column;
  border-radius: 32px;
  padding: 28px 32px;
  margin-top: 16px;
  @include respond-to(small) {
    padding: 24px 20px 15px 20px;
    border-radius: 28px;
    margin-top: 8px;
  }
`;

const ListWrapper = styled.div`
  div:last-child {
    hr {
      display: none;
    }
  }
  `;

const Title = styled.p`
  @import "variables";
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 137%;
  margin-bottom: 32px;
  @include respond-to(small) {
    font-size: 16px;
    margin-bottom: 20px;
    span {
      display: none;
    }
  }
`;
const TransactionBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  width: 100%;
  @include respond-to(small) {
    justify-content: space-between;
  }
`;
const TransactionInfo = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  width: 60%;
  @include respond-to(small) {
    width: 100%;
  }
`;
const TransactionType = styled.span`
  @import "variables";
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  margin-bottom: 4px;
  @include respond-to(small) {
    font-size: 14px;
  }
`;
const OrderNumber = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 14px;
  line-height: 137%;
  opacity: 0.4;
  @include respond-to(small) {
    font-size: 13px;
  }
`;
const PaymentInfo = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 40%;
  @include respond-to(small) {
    width: 100%;
    justify-content: flex-end;
  }
`;
const PaymentDate = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 14px;
  line-height: 137%;
  opacity: 0.4;
  @include respond-to(small) {
    display: none;
  }
`;
const PaymentDateMobile = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 13px;
  line-height: 137%;
  opacity: 0.4;
  display: none;
  @include respond-to(small) {
    display: block;
    margin-bottom: 8px;
  }
`;
const PointsCount = styled.span<{ additional?: boolean }>`
  @import "variables";
  font-weight: 500;
  font-size: 16px;
  line-height: 137%;
  &.additional {
    color: $greenMain;
  }
  @include respond-to(small) {
    font-size: 14px;
  }
`;
const CustomLine = styled.hr`
  @import "variables";
  width: 100%;
  margin: 20px 0px;
  border-color: #7aa0db;
  opacity: 0.1;
  @include respond-to(small) {
    margin: 16px 0px;
  }
`;
const CustomButton = styled(Button)`
  @import "variables";
  width: 100%;
  padding: 19px 0px;
  margin-top: 28px;
  @include respond-to(small) {
    margin-top: 36px;
  }
`;

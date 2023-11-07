import styled from "astroturf/react";
import { IconDelivery } from "common/components/icons/IconDelivery";
import { UserAddressT } from "../interfaces/userAddress";
import { AddressForm } from "./AddressForm";

type Props = {
  userAddress: UserAddressT[];
};

export const DeliveryAddress = ({ userAddress }: Props) => {
  return (
    <Container>
      {userAddress.length ? (
        <TitleBlock>
          <IconDelivery />
          <Text>Адрес для доставки</Text>
        </TitleBlock>
      ) : null}
      <Wrapper>
        <AddressForm address={userAddress} />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin: 24px 0px 36px 0px;
  @include respond-to(small) {
    margin: 24px 0px 40px 0px;
  }
`;
const TitleBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  svg {
    width: 24px;
    height: 24px;
  }
  @media (max-width: 1320px) {
    display: none;
  }
`;
const Text = styled.div`
  margin: 0;
  font-weight: 600;
  font-size: 16px;
  margin-left: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

import styled from "astroturf/react";
import { Favorites } from "modules/products/components/Favorites";
import { PharmaciesT } from "modules/profile/interfaces/pharmacies";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../ContextProvider";
import { ModalNames } from "common/interfaces/modal";

type Props = {
  pharmacie: PharmaciesT;
};

export const PharmacieInfoModal = ({ pharmacie }: Props) => {
  const { closeModal } = useContext(AppContext);

  return (
    <Container>
      <InfoBlock>
        <TextBlock>
          <Name>{pharmacie.title}</Name>
          <Text>
            {pharmacie.address} <br />
            {pharmacie.subway ? pharmacie.subway : " "}
          </Text>
          <Text>Время работы - {pharmacie.workingHours.join(" ")}</Text>
          <Text>Оплата - карта, наличные</Text>
        </TextBlock>
        <Favorites id={pharmacie.id} isPharmacy />
      </InfoBlock>
      <CustomBtn
        href={`pharmacies/${pharmacie.id}`}
        onClick={() => closeModal(ModalNames.POPUP_MODAL)}
      >
        Подробнее об аптеке
      </CustomBtn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 24px;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;
  margin-bottom: 12px;
`;

const Text = styled.span`
  font-weight: 400;
  font-size: 13px;
  line-height: 140%;
`;

const CustomBtn = styled(Link)`
  @import "variables";

  width: 100%;
  margin-top: 20px;
  padding: 17px 0px;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  border-radius: 16px;
  background: $blue1;
  color: $white;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: $blue2;
  }
`;

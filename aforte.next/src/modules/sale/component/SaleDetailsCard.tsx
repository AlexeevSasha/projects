import styled from "astroturf/react";
import { NextImage } from "../../../common/components/NextImage";
import { Product } from "../../products/components/Product";
import { Share } from "../../../common/components/shareSocial/Share";
import { SaleDetailsT } from "../interfaces/sale";
import { TermsOfSale } from "./TermsOfSale";
import { Button } from "../../../common/components/Button";
import { useContext } from "react";
import { AppContext } from "../../../common/components/ContextProvider";
import { ModalNames } from "../../../common/interfaces/modal";
import { XSSProtection } from "../../products/utils/XSSProtection";

type Props = {
  saleDetails: SaleDetailsT;
  isPromocode?: boolean;
};

export const SaleDetailsCard = ({ saleDetails, isPromocode }: Props) => {
  const { openModal } = useContext(AppContext);

  return (
    <Container>
      <ContainerShare>
        <Product.TagCards labels={saleDetails.labels} />
        <Share />
      </ContainerShare>
      <Title>{saleDetails.title}</Title>
      <Content
        dangerouslySetInnerHTML={{
          __html: XSSProtection(saleDetails.description.replace(/(\r\n|\r|\n)/g, "<br>")),
        }}
      />
      <ButtonContainer>
        {isPromocode ? <CustomButton typeBtn={"blue"}>Применить промокод</CustomButton> : null}

        <CustomButton
          onClick={() =>
            openModal(ModalNames.POPUP_MODAL, {
              children: <TermsOfSale terms={saleDetails.termsOfSale} />,
            })
          }
          typeBtn={"lightBlue"}
        >
          Условия проведения акции
        </CustomButton>
      </ButtonContainer>
      <ImageContainer>
        <NextImage
          style={{ objectFit: "cover", borderRadius: 28 }}
          src={saleDetails.image}
          alt={"sale"}
        />
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(300px, 500px);
  grid-column-gap: 40px;
  align-items: start;
  background: $white;
  color: $black;
  padding: 40px;
  border-radius: 40px;

  & > div {
    grid-column: 1;
  }

  @include respond-to(small) {
    padding: 20px;
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  @import "variables";
  max-width: 500px;
  width: 100%;
  height: 260px;
  grid-column: 2 !important;
  grid-row-start: 1;
  grid-row-end: 6;

  @include respond-to(small) {
    height: 190px;
    grid-column: 1 !important;
    grid-row: 3;
    margin-bottom: 16px;
  }
`;

const Content = styled.div`
  @import "variables";

  font-weight: 400;
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.02em;

  & > :last-child {
    margin-bottom: 0;
  }

  p {
    margin: 0 0 12px;
  }

  ul,
  ol {
    margin: 0 0 20px;
    padding: 0;
    display: grid;
    grid-gap: 6px;

    li::marker {
      color: $greenMain;
    }
  }

  li {
    font-size: 14px;
    line-height: 26px;
    letter-spacing: 0.02em;
    margin-left: 16px;
    padding-left: 10px;
  }
`;

const ContainerShare = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.div`
  @import "variables";

  margin-bottom: 20px;
  font-weight: 600;
  font-size: 24px;
  line-height: 137%;
`;

const CustomButton = styled(Button)`
  @import "variables";

  padding: 20px 28px;

  @include respond-to(small) {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: repeat(2, 260px);
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  margin-top: 30px;
  grid-row: 5;

  @include respond-to(large) {
    grid-template-columns: 1fr;
  }
`;

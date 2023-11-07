import styled from "astroturf/react";
import { IconDiscount } from "../icons/IconDiscount";
import { IconShop } from "../icons/IconShop";
import { IconDelivery } from "../icons/IconDelivery";
import { IconHeart } from "../icons/IconHeart";
import { IconScanner } from "../icons/IconScanner";
import { IconStar } from "../icons/IconSrar";
import { CompanyT } from "../../interfaces/company";
import { XSSProtection } from "../../../modules/products/utils/XSSProtection";

type Props = Pick<CompanyT, "principlesWork">;

export const PrinciplesOfWork = ({ principlesWork }: Props) => {
  return (
    <Container>
      <div>{principlesWork.title}</div>
      <Paragraph
        dangerouslySetInnerHTML={{
          __html: XSSProtection(principlesWork.description.replace(/(\r\n|\r|\n)/g, "<br>")),
        }}
      />
      <ContainerCards>
        <ContainerCard>
          <CircleIcon>
            <IconDiscount />
          </CircleIcon>
          <div>Не завышаем цены на товары</div>
        </ContainerCard>
        <ContainerCard>
          <CircleIcon>
            <IconShop />
          </CircleIcon>
          <div>Заботимся об уровне сервиса и предлагаем удобный самовывоз</div>
        </ContainerCard>
        <ContainerCard>
          <CircleIcon>
            <IconDelivery />
          </CircleIcon>
          <div>Организуем правильные транспортировку и хранение</div>
        </ContainerCard>
        <ContainerCard>
          <CircleIcon icon={"star"}>
            <IconStar />
          </CircleIcon>
          <div>Отбираем лучших поставщиков</div>
        </ContainerCard>
        <ContainerCard>
          <CircleIcon icon={"scanner"}>
            <IconScanner />
          </CircleIcon>
          <div>Следим за качеством медикаментов</div>
        </ContainerCard>
        <ContainerCard>
          <CircleIcon>
            <IconHeart />
          </CircleIcon>
          <div>Стремимся помочь именно вам, а не продать популярные лекарства</div>
        </ContainerCard>
      </ContainerCards>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-row-gap: 20px;
  font-weight: 600;
  font-size: 20px;
  line-height: 137%;
`;

const Paragraph = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.02em;
`;

const ContainerCards = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 60px;
  grid-row-gap: 20px;

  @include respond-to(small) {
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
  }
`;

const ContainerCard = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr;
  grid-column-gap: 16px;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;
`;

const CircleIcon = styled.div<{ icon?: "scanner" | "star" }>`
  @import "variables";

  width: 48px;
  height: 48px;
  padding: 16px;
  background: rgba(83, 131, 199, 0.1);
  border-radius: 50%;

  svg {
    display: block;
    width: 16px;
    height: 16px;

    path {
      fill: $blue1;
    }

    g {
      opacity: 1;
    }
  }

  &.icon-scanner {
    path {
      fill: none;
      stroke: $blue1;
    }
  }
  &.icon-star {
    svg {
      width: 20px;
      height: 20px;
      margin: -2px;
    }
  }
`;

import styled from "astroturf/react";
import { IconCup } from "../icons/IconCup";
import { IconCalendar } from "../icons/IconCalendar";
import { IconPlanet } from "../icons/IconPlanet";

export const AboutCompanyCards = () => {
  return (
    <ContainerCards>
      <ContainerCard>
        <CircleIcon>
          <IconCup />
        </CircleIcon>
        <div>
          <div>1 место</div>
          <p>в рейтинге российских фармдистрибьюторов*</p>
        </div>
      </ContainerCard>
      <ContainerCard>
        <CircleIcon>
          <IconPlanet />
        </CircleIcon>
        <div>
          <div>400 брендов</div>
          <p>и прямых контрактов с производителями</p>
        </div>
      </ContainerCard>
      <ContainerCard>
        <CircleIcon icon={"calendar"}>
          <IconCalendar />
        </CircleIcon>
        <div>
          <div>21 год</div>
          <p>работы на фармацевтическом рынке </p>
        </div>
      </ContainerCard>
    </ContainerCards>
  );
};

const ContainerCards = styled.div`
  @import "variables";

  display: flex;

  & > div:not(:first-child) {
    margin-left: 16px;
  }

  @include respond-to(small) {
    flex-direction: column;

    & > div:not(:first-child) {
      margin-left: 0;
      margin-top: 8px;
    }
  }
`;

const ContainerCard = styled.div`
  @import "variables";

  max-width: 300px;
  width: 100%;
  display: grid;
  justify-content: center;
  grid-row-gap: 16px;
  background: rgba(109, 196, 123, 0.1);
  padding: 36px 24px;
  border-radius: 32px;
  font-weight: 600;
  font-size: 24px;
  line-height: 137%;
  color: $greenHover;
  text-align: center;

  p {
    margin: 16px 0 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.02em;
  }

  @include respond-to(small) {
    padding: 16px;
    text-align: start;
    max-width: 100%;
    grid-template-columns: 60px 1fr;
    grid-column-gap: 16px;
    justify-content: start;
    align-items: center;
    font-size: 16px;

    p {
      margin: 4px 0 0;
      font-size: 13px;
    }
  }
`;

const CircleIcon = styled.div<{ icon?: "calendar" }>`
  @import "variables";

  width: 60px;
  height: 60px;
  padding: 18px;
  background: $greenMain;
  border-radius: 50%;
  margin: 0 auto;

  &.icon-calendar {
    g {
      path {
        stroke: $white;
      }
      & > path:last-child {
        fill: $white;
        stroke: none;
      }
    }
  }
`;

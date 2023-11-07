import styled from "astroturf/react";
import { IconInstruction } from "../../../common/components/icons/IconInstruction";
import { IconAnalogue } from "../../../common/components/icons/IconAnalogue";
import { IconReviews } from "../../../common/components/icons/IconReviews.";

export const AnchorOfMedicinalProduct = () => {
  return (
    <Container>
      <div>О препарате</div>
      <ContainerItem>
        <li>
          <a href={"#instructions-for-use"}>
            <IconInstruction />
            Инструкция по применению
          </a>
        </li>
        <li>
          <a href={"#drug-analogues"}>
            <IconAnalogue />
            Аналоги препарата
          </a>
        </li>
        <li>
          <a href={"#reviews"}>
            <IconReviews />
            Отзывы
          </a>
        </li>
      </ContainerItem>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  background: $white;
  color: $black;
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;
  border-radius: 32px;
  padding: 24px 28px 28px;
`;

const ContainerItem = styled.ul`
  @import "variables";

  margin: 16px 0 0;
  padding: 0;
  display: grid;
  grid-row-gap: 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;
  color: $black;
  list-style-type: none;

  a {
    display: flex;
    align-items: center;
    color: inherit;
  }

  svg {
    margin-right: 12px;

    path {
      fill: #dde6f4;
    }
    rect:last-child {
      fill: #dde6f4;
    }
    rect:first-child {
      stroke: #dde6f4;
    }
  }

  li {
    &:hover {
      font-weight: bold;
      path {
        fill: $blue1;
      }
      rect:last-child {
        fill: $blue1;
      }
      rect:first-child {
        stroke: $blue1;
      }
    }
  }
`;

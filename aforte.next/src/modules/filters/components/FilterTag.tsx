import styled from "astroturf/react";
import { IconCross } from "../../../common/components/icons/IconCross";

type Props = {
  title: string;
  handlerClick: () => void;
  pharmacies?: boolean;
};

export const FilterTag = ({ title, handlerClick, pharmacies }: Props) => {
  return (
    <ContainerTag pharmacies={pharmacies}>
      <span>{title}</span>
      <div onClick={handlerClick}>
        <IconCross />
      </div>
    </ContainerTag>
  );
};

const ContainerTag = styled.div<{ pharmacies?: boolean }>`
  @import "variables";

  display: inline-flex;
  align-items: center;
  border-radius: 16px;
  padding: 8px 14px;
  background: $blue1;
  color: $white;
  font-weight: 600;
  font-size: 13px;

  &.pharmacies {
    background: $blue-3;
    color: $blueMain;
    &:hover {
      background: $blue1;
      color: $white;
    }
  }

  div {
    width: 12px;
    min-width: 12px;
    height: 12px;
    margin-left: 6px;
  }

  svg {
    cursor: pointer;
    width: 100%;
    height: 100%;
    path {
      stroke: $blue-1;
    }
  }

  @include respond-to(small) {
    background: $blue-3;
    color: $blueMain;

    svg {
      path {
        stroke: $blueMain;
      }
    }
  }
`;

import { hexToRgb } from "../utils/hexToRgb";
import styled from "astroturf/react";
import { ProductT } from "../interfaces/product";

type Props = Pick<ProductT, "labels">;

export const TagCards = ({ labels }: Props) => {
  return (
    <ContainerTag>
      {labels?.map((el, i) => (
        <CardProductTag style={{ color: el?.color, background: hexToRgb(el?.color, 0.2) }} key={i}>
          {el.title}
        </CardProductTag>
      ))}
    </ContainerTag>
  );
};

const ContainerTag = styled.div`
  @import "variables";

  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap-reverse;
  height: 26px;
  z-index: 2;

  & > div:not(:first-child) {
    margin-bottom: 2px;
  }
`;

const CardProductTag = styled.div`
  @import "variables";

  white-space: nowrap;
  padding: 6px 10px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 12px;
  margin-right: 4px;

  @include respond-to(small) {
    padding: 3.5px 8px;
  }
`;

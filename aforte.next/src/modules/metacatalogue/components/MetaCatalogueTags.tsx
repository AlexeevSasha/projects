import { CustomSwiper } from "../../slider/components/CustomSwiper";
import styled from "astroturf/react";
import Link from "next/link";
import { ActiveIngredientsT } from "../interfaces/metaCatalogue";

type Props = {
  tags: ActiveIngredientsT[] | null;
  isImpacts?: boolean;
};

export const MetaCatalogueTags = ({ tags, isImpacts }: Props) => {
  return tags?.length ? (
    <Container>
      <div>{isImpacts ? "Воздействие" : "Действующее вещество"} :</div>
      <CustomSwiper<ActiveIngredientsT>
        arrowSettings={{ hidden: true }}
        id={"active-ingredient"}
        items={tags}
      >
        {(param) => (
          <Tag
            href={`/product/metacatalogue/${isImpacts ? "disease" : "active-ingredient"}?id=${
              param.id
            }`}
          >
            {param.name}
          </Tag>
        )}
      </CustomSwiper>
    </Container>
  ) : null;
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: fit-content(200px) minmax(300px, 1fr);
  grid-column-gap: 16px;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 137%;
  color: $black;

  @include respond-to(small) {
    grid-template-columns: minmax(300px, 1fr);

    & > div:first-child {
      margin-bottom: 8px;
    }
  }
`;

const Tag = styled(Link)`
  @import "variables";

  @include transition();

  display: inline-block;
  border-radius: 28px;
  background: $white;
  color: $blue1;
  padding: 12px 20px;
  font-weight: 600;
  font-size: 13px;
  margin: 8px 4px;

  &:hover {
    box-shadow: 0 3px 4px rgba(19, 51, 103, 0.08);
  }

  @include respond-to(small) {
    margin: 0 8px 0 0;
    padding: 8px 16px;
    color: $white;
    background: $blue1;

    &:hover {
      box-shadow: none;
      background: $blue2;
    }
  }
`;

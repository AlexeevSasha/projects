import { useRouter } from "next/router";
import { FilterTag } from "./FilterTag";
import styled from "astroturf/react";
import { getTagsFromQuery } from "../utils/getTagsFromQuery";
import { removeTagsQuery } from "../utils/removeTagsQuery";

type Props = {
  textAlign?: "start";
};

export const FilterTags = ({ textAlign }: Props) => {
  const router = useRouter();

  return getTagsFromQuery(router.query).length ? (
    <ContainerTags textAlign={textAlign}>
      {getTagsFromQuery(router.query)?.map(([key, value], i) => (
        <FilterTag
          handlerClick={() => removeTagsQuery(key, value, router)}
          key={i}
          title={value}
        />
      ))}
    </ContainerTags>
  ) : null;
};

const ContainerTags = styled.div<{ textAlign?: Props["textAlign"] }>`
  @import "variables";

  text-align: end;

  &.textAlign-start {
    text-align: start;
  }

  & > div {
    margin-bottom: 4px;
    margin-left: 4px;
  }

  @include respond-to(small) {
    display: none;
  }
`;

import { AlphabetResultCard } from "./AlphabetResultCard";
import { AlphabetSearchResultT } from "../interfaces/metaCatalogue";
import styled from "astroturf/react";

type Props = {
  metaCatalogue: AlphabetSearchResultT[];
};

export const AlphabetResult = ({ metaCatalogue }: Props) => {
  return (
    <Container>
      {metaCatalogue?.map((el) => (
        <AlphabetResultCard key={el.title} {...el} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  column-count: 4;
  column-gap: 16px;

  & > div {
    margin-bottom: 16px;
  }

  @include respond-to(large) {
    column-count: 3;
  }

  @include respond-to(small) {
    column-count: 1;
    & > div {
      margin-bottom: 8px;
    }
  }
`;

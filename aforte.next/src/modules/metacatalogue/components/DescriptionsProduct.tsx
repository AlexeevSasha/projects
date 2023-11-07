import { MetaCatalogueT } from "../interfaces/metaCatalogue";
import styled from "astroturf/react";

type Props = Pick<MetaCatalogueT, "descriptionSections">;

export const DescriptionsProduct = ({ descriptionSections }: Props) => {
  return (
    <Container>
      {descriptionSections.map((el) => (
        <Content key={el.header}>
          {el.header}
          <p>{el.content}</p>
        </Content>
      ))}
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-row-gap: 43px;
  padding: 40px 40px 48px;
  border-radius: 32px;
  background: $white;
  color: $black;

  @include respond-to(small) {
    padding: 24px 12px;
    grid-row-gap: 24px;
  }
`;

const Content = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;
  letter-spacing: 0.02em;

  p {
    margin: 12px 0 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
  }
`;

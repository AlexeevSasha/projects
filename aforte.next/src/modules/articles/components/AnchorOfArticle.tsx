import styled from "astroturf/react";

type Props = {
  anchors: string[];
};

export const AnchorOfArticle = ({ anchors }: Props) => {
  return (
    <Container>
      <Title>Содержание статьи:</Title>
      <ContainerItem>
        {anchors.map((el) => (
          <li key={el}>
            <a href={`#${el}`}>{el}</a>
          </li>
        ))}
      </ContainerItem>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  background: $white;
  border-radius: 32px;
  padding: 24px 24px 32px;
`;

const Title = styled.h4`
  @import "variables";

  margin: 0 0 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 200%;
  letter-spacing: 0.02em;
  color: rgb($black, 0.4);
`;

const ContainerItem = styled.ul`
  @import "variables";

  margin: 0;
  padding: 0 0 0 24px;
  display: grid;
  grid-gap: 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;
  color: $blue1;

  li::marker {
    color: $blue1;
  }

  a {
    color: inherit;
  }
`;

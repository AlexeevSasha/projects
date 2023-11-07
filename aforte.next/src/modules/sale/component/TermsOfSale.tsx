import styled from "astroturf/react";
import { XSSProtection } from "../../products/utils/XSSProtection";

type Props = {
  terms: string;
};

export const TermsOfSale = ({ terms }: Props) => {
  return (
    <Container>
      <Content
        dangerouslySetInnerHTML={{
          __html: XSSProtection(terms.replace(/(\r\n|\r|\n)/g, "<br>")),
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  padding: 40px;
  color: $black;
  width: 940px;

  @include respond-to(large) {
    width: 650px;
  }

  @include respond-to(small) {
    width: 100%;
    padding: 24px;
  }
`;

const Content = styled.div`
  @import "variables";

  display: grid;
  grid-row-gap: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  letter-spacing: 0.02em;

  & > :last-child {
    margin-bottom: 0;
  }

  h4 {
    margin: 0 0 8px;
  }

  h3 {
    margin: 0;
    font-weight: 600;
    font-size: 22px;
    line-height: 137%;

    @include respond-to(small) {
      font-size: 20px;
    }
  }

  p {
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 26px;
    letter-spacing: 0.02em;
  }

  ol,
  ul {
    margin: 0;
    padding: 0;
    display: grid;
    grid-gap: 8px;

    li {
      margin-left: 16px;
      padding-left: 10px;
    }
  }

  @include respond-to(small) {
    grid-row-gap: 16px;
  }
`;

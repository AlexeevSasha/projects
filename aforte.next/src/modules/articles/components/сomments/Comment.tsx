import styled from "astroturf/react";
import { ArticleCommentT } from "../../interfaces/articleComments";

export const Comment = (props: ArticleCommentT) => {
  return (
    <Container>
      <Title>{props.name}</Title>
      <Content>{props.text}</Content>
      <Date>{props.date}</Date>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: minmax(100px, 170px) 1fr;
  grid-row-gap: 12px;
  color: $black;
  padding-bottom: 40px;
  border-bottom: 1px solid $blue-2;

  @include respond-to(small) {
    grid-template-columns: 1fr;
    padding-bottom: 24px;
  }
`;

const Title = styled.h3`
  @import "variables";

  margin: 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 137%;
  letter-spacing: 0.02em;
`;

const Date = styled.span`
  @import "variables";

  grid-column: 1;
  display: block;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: rgb($black, 0.4);
`;

const Content = styled.p`
  @import "variables";

  grid-column: 2;
  grid-row-start: 1;
  grid-row-end: 4;
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.02em;

  @include respond-to(small) {
    grid-column: 1;
    grid-row: 2;
  }
`;

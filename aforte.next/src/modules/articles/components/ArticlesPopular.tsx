import styled from "astroturf/react";
import { ArticleT } from "../interfaces/article";
import { ArticleSmallCard } from "./ArticleSmallCard";

type Props = {
  articles: ArticleT[];
  title?: string;
};

export const ArticlesPopular = ({ articles, title }: Props) => {
  return (
    <Container>
      {title ? <Title>{title}</Title> : null}
      {articles.map((el) => (
        <ArticleSmallCard key={el.id} {...el} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-gap: 24px;
  background: $white;
  padding: 20px 24px;
  border-radius: 32px;

  @include respond-to(small) {
    padding: 20px;
  }
`;

const Title = styled.h4`
  @import "variables";

  color: $black;
  margin: 0;
  font-weight: 600;
  font-size: 18px;
  line-height: 137%;
`;

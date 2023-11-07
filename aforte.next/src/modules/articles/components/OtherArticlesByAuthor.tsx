import styled from "astroturf/react";
import { TitleWithButtonTop } from "../../../common/components/TitleWithButtonTop";
import { ArticleT } from "../interfaces/article";
import { ArticleSmallCard } from "./ArticleSmallCard";

type Props = {
  articles: ArticleT[];
};

export const OtherArticlesByAuthor = ({ articles }: Props) => {
  return (
    <div>
      <ContainerTitle>
        <TitleWithButtonTop title={"Другие статьи автора"} link={"/"} />
      </ContainerTitle>
      <Container>
        <Title>Другие статьи автора</Title>
        {articles.map((el, i) => (
          <ArticleSmallCard key={i} {...el} />
        ))}
      </Container>
    </div>
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

  @include respond-to(small) {
    display: none;
  }
`;

const ContainerTitle = styled.div`
  @import "variables";

  display: none;
  margin-bottom: 12px;

  @include respond-to(small) {
    display: block;
  }
`;

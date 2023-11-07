import { Author } from "./Author";
import styled from "astroturf/react";
import { AuthorT } from "../interfaces/author";
import Link from "next/link";

type Props = {
  authors: AuthorT[];
};

export const PopularAuthors = ({ authors }: Props) => {
  return (
    <Container>
      <Title>Популярные авторы</Title>
      {authors.map((el) => (
        <Link key={el.id} href={`blog/author/${el.id}`}>
          <Author {...el} />
        </Link>
      ))}
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-gap: 24px;
  padding: 8px 28px;

  @include respond-to(small) {
    padding: 8px 12px;
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

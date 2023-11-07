import { Author } from "./Author";
import styled from "astroturf/react";
import { SocialMediaAuthor } from "./SocialMediaAuthor";
import { AuthorT, SocialMediaAuthorT } from "../interfaces/author";

type Props = {
  author: AuthorT;
  socialMedia: SocialMediaAuthorT[];
  description: string;
};

export const AuthorDetails = ({ author, description, socialMedia }: Props) => {
  return (
    <Container>
      <Author {...author} />
      <SocialMediaAuthor socialMedia={socialMedia} />
      <Paragraph>{description}</Paragraph>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr fit-content(250px);
  align-items: center;
  gap: 8px;

  @include respond-to(small) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Paragraph = styled.p`
  @import "variables";

  grid-row-start: 2;
  grid-column-start: 1;
  grid-column-end: 3;
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.02em;
  padding-left: 88px;

  @include respond-to(small) {
    grid-column-end: 2;
    padding: 0;
  }
`;

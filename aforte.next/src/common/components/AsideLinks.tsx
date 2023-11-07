import styled from "astroturf/react";
import Link from "next/link";
import { asideLinks } from "../constants/asideLinks";
import { AsideLinksIDT } from "../interfaces/asideLinks";

type Props = {
  links: Array<AsideLinksIDT>;
  activeLink: AsideLinksIDT;
};

export const AsideLinks = ({ links, activeLink }: Props) => {
  return (
    <Container>
      {asideLinks
        .filter((el) => links.includes(el.id))
        .sort((a, b) => links.indexOf(a.id) - links.indexOf(b.id))
        .map((el) => (
          <LinkContainer isActive={activeLink === el.id} key={el.id} href={el.link}>
            {el.icon}
            {el.text}
          </LinkContainer>
        ))}
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-row-gap: 16px;
  padding: 24px;
  background: $white;
  color: $black;
  border-radius: 32px;
  font-weight: 500;
  font-size: 16px;
  line-height: 137%;
`;

const LinkContainer = styled(Link)<{ isActive: boolean }>`
  @import "variables";

  @include transition();

  display: flex;
  align-items: center;

  &:hover {
    font-weight: 600;

    & > div {
      opacity: 1;
    }
  }

  &.isActive {
    pointer-events: none;
    font-weight: 600;
    & > div {
      opacity: 1;
    }
  }
`;

import styled from "astroturf/react";
import Link from "next/link";
import { IconArraySmall } from "./icons/IconArraySmall";

type BreadcrumbType = {
  title: string;
  link: string;
};

type Breadcrumbs = {
  breadcrumbs: BreadcrumbType[];
};

export const Breadcrumbs = ({ breadcrumbs }: Breadcrumbs) => {
  return (
    <Container>
      {breadcrumbs.map((el, i) => (
        <CustomLink key={i} href={el.link}>
          <span>{el.title}</span>
          <IconArraySmall />
        </CustomLink>
      ))}
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 16px;
`;

const CustomLink = styled(Link)`
  @import "variables";

  @include transition();

  white-space: nowrap;
  margin-right: 16px;
  position: relative;
  display: inline-flex;
  align-items: center;
  color: $blue1;
  font-weight: 500;
  font-size: 13px;
  line-height: 137%;

  &:hover {
    color: $blue2;
  }

  span {
    margin-right: 8px;
  }
`;

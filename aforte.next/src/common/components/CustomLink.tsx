import styled from "astroturf/react";
import Link from "next/link";

export const CustomLink = styled(Link)<{ size?: "sm" | "md" | "lg" }>`
  @import "variables";

  @include transition();

  font-weight: 600;
  font-size: 14px;
  line-height: 137%;
  color: $black;
  text-decoration: none;

  &:hover {
    color: $blue1;
  }

  /* &. */
`;

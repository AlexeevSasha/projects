import Link from "next/link";
import React, { FC } from "react";
import styled from "styled-components";

interface IProps {
  url: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export const NextLink: FC<IProps> = ({ url, target, children, rel, ariaLabel }) => {
  return (
    <Link prefetch={false} href={url} passHref>
      <StyledLink target={target ?? "_blank"} rel={rel} aria-label={ariaLabel}>
        {children}
      </StyledLink>
    </Link>
  );
};

const StyledLink = styled.a`
  text-decoration: none;
`;

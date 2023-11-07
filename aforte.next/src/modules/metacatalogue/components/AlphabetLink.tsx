import { alphabet } from "../utils/alphabetArray";
import styled from "astroturf/react";
import Link from "next/link";

type Props = {
  type: "ru" | "en" | "number";
};

export const AlphabetLink = ({ type }: Props) => {
  return (
    <>
      {alphabet[type]?.map((el) => (
        <LinkStyle href={`/product?content=${el}`} key={el}>
          {el}
        </LinkStyle>
      ))}
    </>
  );
};

const LinkStyle = styled(Link)`
  @import "variables";

  @include transition();

  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: $white;
  color: $blue1;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;

  &:hover {
    color: $white;
    background: $blue1;
  }
`;

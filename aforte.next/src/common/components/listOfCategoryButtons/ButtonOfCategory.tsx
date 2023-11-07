import styled from "astroturf/react";
import { CategoryButtonT } from "../../interfaces/categoryButton";
import { useState } from "react";

type Props = CategoryButtonT & {
  bg?: "blue";
};

export const ButtonOfCategory = ({ name, bg }: Props) => {
  const [active, setActive] = useState(false);
  const handleClick = () => setActive((prev) => !prev);

  return (
    <TagStyle active={active} onClick={handleClick} bg={bg}>
      {name}
    </TagStyle>
  );
};

const TagStyle = styled.span<{ bg?: Props["bg"]; active: boolean }>`
  @import "variables";

  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  border-radius: 28px;
  background: $white;
  color: $blue1;
  padding: 12px 20px;
  font-weight: 600;
  font-size: 13px;
  line-height: 137%;

  &.bg-blue {
    background: $blue-2;
  }

  @include respond-to(small) {
    padding: 8px 16px;
    font-size: 12px;

    &.bg-blue {
      background: $white;
    }
  }

  &.active {
    background: $blue1;
    color: $white;
  }
`;

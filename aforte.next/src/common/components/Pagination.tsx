import styled from "astroturf/react";
import { useState } from "react";

type Props = {
  total: number;
  onChange: (v: number) => void;
};

export const Pagination = ({ total, onChange }: Props) => {
  const [active, setActive] = useState(1);
  const onClickButton = (val: number) => {
    setActive(val);
    onChange(val);
  };

  return (
    <Container>
      {Array.from(Array(total), (v, i) => ++i).map((el) => (
        <Button key={el} isActive={active === el} onClick={() => onClickButton(el)}>
          {el}
        </Button>
      ))}
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: flex;

  @include respond-to(small) {
    display: none;
  }
`;

const Button = styled.div<{ isActive?: boolean }>`
  @import "variables";

  @include transition();

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: $blue1;
  border-radius: 16px;
  background: $white;
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;
  min-width: 60px;
  height: 60px;
  margin-left: 8px;

  &:hover {
    background: $blue-2;
  }

  &.isActive {
    color: $white;
    background: $blue1;
    pointer-events: none;
  }

  @media (max-width: 900px) {
    min-width: 45px;
    height: 45px;
  }
`;

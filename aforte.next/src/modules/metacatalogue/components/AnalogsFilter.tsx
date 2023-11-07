import styled from "astroturf/react";
import { useState } from "react";

const analogs = [
  { id: "all", name: "Все" },
  { id: "composition", name: "По составу" },
  { id: "impacts", name: "По воздействию" },
];

export const AnalogsFilter = () => {
  const [active, setActive] = useState("all");
  return (
    <Container>
      {analogs.map((el) => (
        <Tag isActive={active === el.id} onClick={() => setActive(el.id)} key={el.id}>
          {el.name}
        </Tag>
      ))}
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: flex;
  align-items: center;
  height: fit-content;
  width: fit-content;
  background: $blue-2;
  border-radius: 28px;
  font-weight: 600;
  font-size: 13px;
  line-height: 137%;
  color: $blue1;

  span:not(:last-child) {
    margin-right: 4px;
  }
`;

const Tag = styled.span<{ isActive: boolean }>`
  @import "variables";

  @include transition();

  white-space: nowrap;
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 28px;

  &:hover {
    background: $blue-1;
    color: $white;
  }

  &.isActive {
    pointer-events: none;
    color: $white;
    background: $blue1;
  }

  @include respond-to(small) {
    padding: 8px 16px;
  }
`;

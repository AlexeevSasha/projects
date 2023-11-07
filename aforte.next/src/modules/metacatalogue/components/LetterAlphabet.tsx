import styled from "astroturf/react";

export const LetterAlphabet = styled.div<{ isActive?: boolean }>`
  @import "variables";

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

  &.isActive {
    color: $white;
    background: $blue1;
    pointer-events: none;
  }
`;

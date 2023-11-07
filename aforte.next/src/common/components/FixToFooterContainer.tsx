import styled from "astroturf/react";

export const FixToFooterContainer = styled.div`
  @import "variables";

  display: none;

  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 4px 34px rgba(59, 78, 106, 0.2);
  border-radius: 24px;
  padding: 12px 12px 82px;
  background: $white;
  z-index: 50;

  @include respond-to(small) {
    display: block;
  }
`;

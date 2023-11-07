import styled from "astroturf/react";

export const ContainerIconAsideLinks = styled.div<{ icon?: "info" | "bring-friend" }>`
  @import "variables";

  @include transition();

  opacity: 0.3;
  margin-right: 12px;
  width: 22px;
  height: 22px;
  overflow: hidden;

  svg {
    width: 22px;
    height: 22px;
  }

  path {
    fill: $blue1;
  }

  g {
    opacity: 1;
  }

  &.icon-info {
    svg {
      width: 20px;
      height: 20px;
      path {
        fill: $white;
      }
    }
  }

  &.icon-bring-friend {
    svg {
      circle {
        fill: $blue1;
      }
    }
  }
`;

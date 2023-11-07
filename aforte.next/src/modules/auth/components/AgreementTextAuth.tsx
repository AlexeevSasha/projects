import styled from "astroturf/react";
import { ParagraphAuth } from "./ParagraphAuth";

export const AgreementTextAuth = styled(ParagraphAuth)`
  @import "variables";

  color: rgb($black, 0.4);

  a {
    color: $blue1;
  }
`;

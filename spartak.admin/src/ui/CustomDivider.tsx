import styled from "styled-components";
import { Divider } from "antd";

export const CustomDivider = styled(Divider)`
  height: 2rem;
  @media (max-width: 1000px) {
    display: none;
  }
`;

import styled from "styled-components";
import {Select} from "antd";

export const CustomSelect = styled(Select)`
  min-width: 6rem;
  max-width: 16rem;
  width: inherit;
  @media (max-width: 1000px) {
    max-width: 100%;
  }
`;

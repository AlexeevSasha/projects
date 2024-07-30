import {Input} from "antd";
import styled from "styled-components";

export const CustomInput = styled(Input)`
  max-width: 16rem;
  @media (max-width: 1000px) {
    max-width: 100%;
  }
`;

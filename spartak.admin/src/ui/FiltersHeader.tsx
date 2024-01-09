import styled from "styled-components";
import { Form, Input } from "antd";

export const FiltersContainer = styled(Form)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
  grid-gap: 16px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const FormItem = styled(Form.Item)`
  min-width: 16rem;

  @media (max-width: 1250px) {
    min-width: auto;
  }

  @media (max-width: 1000px) {
    max-width: 100%;
  }
`;

export const FilterInput = styled(Input)`
  min-width: 16rem;

  @media (max-width: 1000px) {
    max-width: 100%;
  }
`;

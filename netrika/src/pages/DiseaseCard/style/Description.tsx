import { theme } from "common/styles/theme";
import { styled } from "../../../common/styles/styled";
import { CardTitle } from "../../../common/components/Card/CardTitle";

export const DescriptionTitle = styled(CardTitle)`
  /* font-weight: bold; */
`;

export const Value = styled(DescriptionTitle)`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  svg {
    margin-left: 8px;
  }
`;

export const Type = styled(DescriptionTitle)`
  color: ${theme.colors.black};
  width: 60%;
`;

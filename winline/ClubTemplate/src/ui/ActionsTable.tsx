import styled from "styled-components";
import { theme } from "../assets/theme/theme";
import { Button } from "antd";

export const DeleteAction = styled(Button).attrs({ className: "delete-button" })`
  color: ${theme.colors.red};
`;

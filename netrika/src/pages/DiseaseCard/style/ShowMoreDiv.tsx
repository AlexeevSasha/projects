import { theme } from "common/styles/theme";
import { css, styled } from "../../../common/styles/styled";

export const ShowMoreDiv = styled.div<{ border?: boolean }>`
  margin: auto;
  cursor: pointer;
  line-height: 130%;
  text-align: center;
  color: ${theme.colors.green};

  padding: 15px 0;
  position: relative;

  ${(props) =>
    props.border
      ? css`
          &:after {
            content: " ";
            position: absolute;
            background: ${theme.colors.gray};
            width: calc(100% + 50px);
            height: 1px;
            top: 0;
            left: -25px;
          }
        `
      : ""}
`;

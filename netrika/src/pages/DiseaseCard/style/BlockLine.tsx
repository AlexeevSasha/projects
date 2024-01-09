import { styled } from "../../../common/styles/styled";

export const BlockLine = styled.div<{ isOpened?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  cursor: ${(props) => (props.isOpened ? "pointer" : "default")};
  margin-right: ${(props) => (props.isOpened ? "0" : "17px")};
  margin-bottom: 15px;
`;

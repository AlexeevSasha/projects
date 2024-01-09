import { styled } from "../../styles/styled";

export const Container = styled.div`
  padding-right: 35px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ContainerWithFooter = styled.div<{ overflow?: string }>`
  margin-bottom: 60px;
  overflow: ${(props) => (props.overflow ? props.overflow : "hidden")};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const StatementData = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CustomStatementData = styled(StatementData)`
  padding: 2.5px 0 2.5px 0;
  height: 42px;
`;

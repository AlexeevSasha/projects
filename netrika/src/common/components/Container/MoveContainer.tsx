import { styled } from "common/styles/styled";
import React from "react";

interface IProps {
  firstBlock: React.ReactElement;
  secondBlock: React.ReactElement;
  height?: string;
}

export const MoveContainer = React.memo((props: IProps) => {
  return (
    <Container height={props.height} className={"MoveContainer"}>
      {props.firstBlock}
      {props.secondBlock}
    </Container>
  );
});

const Container = styled.div<{ height?: string }>`
  // height: ${(props) => (props.height ? props.height : "71vh")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

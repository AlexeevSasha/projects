import React from "react";
import { IconCheck } from "../../components/Icon/IconCheck";
import { IconUnCheck } from "../../components/Icon/IconUnCheck";
import { styled } from "../../styles/styled";

interface IProps {
  check: boolean;
  onCheck?: (id: number | string) => void;
  checkId: number | string;
  hideMarginLeft?: boolean;
  id?: string;
  disabled?: boolean;
}

export const CheckBox: React.FC<IProps> = (props) => {
  const onClick = () => {
    if (props.onCheck && !props.disabled) props.onCheck(props.checkId);
  };

  return (
    <Container
      onClick={onClick}
      className={props.check ? "checkbox-active" : ""}
      hideMarginLeft={props.hideMarginLeft}
      id={props.id}
      disabled={props.disabled}
    >
      {props.check ? (
        <span>
          <IconCheck disabled={props.disabled} />
        </span>
      ) : (
        <span>
          <IconUnCheck />
        </span>
      )}
      {props.children}
    </Container>
  );
};

const Container = styled.div<{ hideMarginLeft?: boolean; disabled?: boolean }>`
  margin-left: ${(props) => (props.hideMarginLeft ? "" : "30px")};
  cursor: ${(props) => (props.disabled ? "inherit" : "pointer")};
  display: flex;
  align-items: center;
  white-space: nowrap;

  span {
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
`;

import React from "react";
import { css, styled } from "../../styles/styled";
import { theme } from "../../styles/theme";
import { ButtonStyles } from "../../ui/Button/styles/ButtonStyles";

interface IProps {
  button?: boolean;
  onClose?: () => void;
  onSave?: () => void;
  disableSave?: boolean;
}

export const Footer: React.FC<IProps> = (props) => {
  return (
    <BottomBlock height={props.button ? "100px" : "30px"}>
      {props.button && (
        <>
          {props.onSave ? (
            <Button onClick={props.onSave} disabled={props.disableSave}>
              Сохранить
            </Button>
          ) : null}
          <Button color={"primary"} onClick={props.onClose}>
            Закрыть
          </Button>
        </>
      )}
    </BottomBlock>
  );
};

const BottomBlock = styled.div<{ height: string }>`
  background: ${theme.colors.white};
  border-top: 2px solid ${theme.colors.green};
  height: ${(props) => props.height};
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Button = styled(ButtonStyles)<{ disabled?: boolean }>`
  cursor: pointer;
  border-radius: 20px;
  font-weight: 600;
  line-height: 19px;
  text-align: center;
  padding: 10px 65px;
  border: 1px solid ${theme.colors.green};
  margin-right: 60px;

  ${(props) =>
    props.disabled
      ? css`
          border: 1px solid ${theme.colors.hightBlue};
          background: white;
          color: ${theme.colors.hightBlue};
        `
      : undefined}

  &:hover {
    ${(props) =>
      props.disabled
        ? css``
        : css`
            opacity: 0.8;
          `}
  }
`;

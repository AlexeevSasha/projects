import React, { useCallback, useState } from "react";
import { Button } from "./Button";
import styled from "styled-components";

interface IProps {
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  textSubmit?: string;
  textClose?: string;
  disabledSubmit?: boolean;
  closeAfter?: boolean;
}

//скрываем id если кнопка disabled, нужно для автотестов !!

export const ButtonsModalForm = ({ onSubmit, onClose, disabledSubmit, ...props }: IProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = useCallback(async () => {
    setLoading(true);
    await onSubmit();
    props?.closeAfter && onClose();
    setLoading(false);
  }, [onSubmit, onClose, props]);

  return (
    <Container>
      <Button
        id={disabledSubmit ? undefined : "button_save"}
        onClick={onClick}
        isLoading={loading}
        disabled={disabledSubmit}
        style={{ padding: "10px 65px" }}
        color={"primary"}
      >
        {props.textSubmit || "Сохранить"}
      </Button>
      <Button disabled={loading} onClick={onClose} fullWith style={{ maxWidth: 200 }} id={"button_close"}>
        {props.textClose || "Закрыть"}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  justify-content: end;
  gap: 24px;
`;

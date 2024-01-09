import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from "react";
import { Input } from "../../../common/ui/Input/Input";
import { useSelector } from "react-redux";
import { dictionaryNSISelector } from "../../../module/dictionaryNSI/dictionaryNSISelector";
import { IconLoading } from "../../../common/components/Icon/IconLoading";
import { ModalContainer } from "../../../common/components/Popup/components/ModalContainer";
import { ButtonsModalForm } from "../../../common/ui/Button/ButtonsModalForm";
import styled from "styled-components";
import { modal } from "../../../common/helpers/event/modalEvent";
import { Button } from "../../../common/ui/Button/Button";

interface IProps {
  onSave: (date: string) => void;
  onStop: (id: string) => void;
  updateList: () => void;
}

export const ModalAddNSI: React.FC<IProps> = (props) => {
  const { sessionIdList, sessionToken } = useSelector(dictionaryNSISelector);
  const [inSession, setInSession] = useState<number>(0);
  const [isError, setIsError] = useState(false);
  const [oid, setOid] = useState("");

  const clickSave = async () => {
    if (oid) {
      await props.onSave(oid);
      setInSession(1);
    } else {
      setIsError(true);
    }
  };

  const onStop = (event: MouseEvent<HTMLElement>, id: string) => {
    props.onStop(id);
    setInSession(0);
  };

  const onChangeOid = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setOid(event.currentTarget.value);
  }, []);

  const closeModal = useCallback(() => {
    setOid("");
    setIsError(false);
    modal.close();
  }, []);

  useEffect(() => {
    if (inSession && sessionIdList.length === 0) {
      closeModal();
      props.updateList();
    }
    // eslint-disable-next-line
  }, [sessionIdList.length]);

  return (
    <ModalContainer width={800} title={"Форма добавления нового справочника"}>
      {sessionIdList.length > 0 && props.onStop ? (
        <>
          <IconLoading />
          <Button
            style={{ marginTop: 10 }}
            fullWith
            color={"primary"}
            onClick={(event: MouseEvent<HTMLElement>) => onStop(event, sessionToken)}
            id={"button_stop"}
          >
            Отменить загрузку
          </Button>
        </>
      ) : (
        <Container>
          <Input
            label={"Введите OID справочника из системы НСИ"}
            fullWidth
            onChange={onChangeOid}
            error={isError && !oid}
            value={oid}
          />
          <ButtonsModalForm textSubmit={"Импортировать"} onSubmit={clickSave} onClose={closeModal} />
        </Container>
      )}
    </ModalContainer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

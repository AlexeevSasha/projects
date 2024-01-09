import React, { useCallback, useEffect, useState } from "react";
import { styled } from "../../../../common/styles/styled";
import { InputUpload } from "../../../../common/ui/Input/InputUpload";
import { ButtonsModalForm } from "../../../../common/ui/Button/ButtonsModalForm";
import { LabelStyle } from "../../../../common/ui/Input/styles/labelStyles";
import { TextArea } from "../../../../common/ui/Input/TextArea";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";

interface IProps {
  onSubmit: (description: string, file: File) => void;
}

export const ModalAddFile = (props: IProps) => {
  const [file, setFile] = useState<File>();
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!file || !description) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [file, description]);

  const onClose = useCallback(() => {
    modal.close();
  }, []);

  const onSubmit = async () => {
    if (file && description) {
      await props.onSubmit(description, file);
      onClose();
    }
  };

  return (
    <ModalContainer
      title={"Добавление нового файла"}
      width={800}
      footer={<ButtonsModalForm disabledSubmit={disabled} onSubmit={onSubmit} onClose={onClose} />}
    >
      <ContentWrapper>
        <TextArea
          label={" Описание файла"}
          isRequired
          id={"file_description"}
          placeholder={"Описание файла"}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          maxLength={1000}
        />

        <div>
          <LabelStyle isRequired>Файл</LabelStyle>
          <InputUpload cbFile={(file) => setFile(file)} accept={[".doc", ".docx", ".pdf", ".xlsx", ".rtf", ".txt"]} />
        </div>
      </ContentWrapper>
    </ModalContainer>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

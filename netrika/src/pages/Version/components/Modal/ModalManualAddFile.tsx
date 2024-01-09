import React, { useState } from "react";
import { InputUpload } from "../../../../common/ui/Input/InputUpload";
import { useDispatch } from "react-redux";
import { RegisterPlatformThunk } from "../../../../module/registerPlatform/registerPlatformThunk";
import { LabelStyle } from "../../../../common/ui/Input/styles/labelStyles";
import { ButtonsModalForm } from "../../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";

export const ModalManualAddFile = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);

  const downloadFile = async () => {
    if (!file) return;
    dispatch(
      RegisterPlatformThunk.uploadFile(file, () => {
        dispatch(RegisterPlatformThunk.getManual());
      })
    );
  };

  return (
    <ModalContainer
      title={"Настройка справочника ролей пользователя"}
      width={800}
      footer={<ButtonsModalForm onSubmit={downloadFile} onClose={() => modal.close()} />}
    >
      <LabelStyle isRequired>Файл</LabelStyle>
      <InputUpload
        messageValidate={{ accept: "Расширение файла не .pdf Выберите ,пожалуйста, именно PDF" }}
        cbFile={(file) => setFile(file)}
        accept={[".pdf"]}
      />
    </ModalContainer>
  );
};

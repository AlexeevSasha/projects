import React, { useEffect, useState } from "react";
import { RegistryPlatformRequest } from "../../../api/registryPlatformRequest";
import { ModalManualAddFile } from "./Modal/ModalManualAddFile";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { authorizationSelector } from "../../../module/authorization/authorizationSelector";
import { UserRolesEnum } from "../../../common/interfaces/user/UserRolesEnum";
import { IconDownloadLink } from "../../../common/components/Icon/IconDownloadLink";
import { theme } from "../../../common/styles/theme";
import { RegisterPlatformThunk } from "../../../module/registerPlatform/registerPlatformThunk";
import { registerPlatformSelector } from "../../../module/registerPlatform/registerPlatformSelector";
import { saveAs } from "file-saver";
import { IconLoading } from "../../../common/components/Icon/IconLoading";
import { successPopup } from "../../../common/helpers/toast/success";
import { ButtonCreateElem } from "../../../common/ui/Button/ButtonCreateElem";
import { modal } from "../../../common/helpers/event/modalEvent";

export const ManualUser = () => {
  const dispatch = useDispatch();
  const { login } = useSelector(authorizationSelector);
  const { manualFile, manual, loading } = useSelector(registerPlatformSelector);
  const [showManual, setShowManual] = useState(false);

  useEffect(() => {
    new RegistryPlatformRequest().checkExistsManual().then((res) => {
      setShowManual(res.result);
      res.result && dispatch(RegisterPlatformThunk.getManual());
    });
  }, [dispatch]);

  useEffect(() => {
    if (manualFile) {
      saveAs(manualFile, manual?.name || "без названия");
      successPopup("Файл успешно скачен");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manualFile]);

  const downloadManual = () => {
    dispatch(RegisterPlatformThunk.downloadFile());
  };

  const openModal = () => {
    modal.open(<ModalManualAddFile />);
  };

  return (
    <Container>
      {showManual && (
        <DownloadManual onClick={downloadManual}>
          Открыть руководство пользователя <IconDownloadLink />
        </DownloadManual>
      )}
      {login === UserRolesEnum.RegistrySuperUsr && (
        <ButtonCreateElem text="Загрузить руководство пользователя" onClick={openModal} />
      )}
      {loading ? (
        <LoadingContainer>
          <IconLoading />
        </LoadingContainer>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const DownloadManual = styled.div`
  cursor: pointer;
  color: ${theme.colors.green};
  text-decoration: underline;

  svg {
    margin-left: 4px;
    fill: ${theme.colors.green};
  }
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: ${theme.colors.opacityGray};
  display: flex;
  align-items: center;
  z-index: 1002;
`;

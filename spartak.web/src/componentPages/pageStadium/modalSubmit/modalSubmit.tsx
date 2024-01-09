import React, { useMemo } from "react";
import { ModalLayout } from "../../../components/modal/modalLayout";
import { Modal } from "../../../components/modal/modal";
import { lang } from "../../../../public/locales/lang";
import styled from "styled-components";
import { H1 } from "../../../components/modal/modalUi";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { useRouter } from "next/router";

interface IProps {
  alert: "success" | "error";
  setAlert: (value: "success" | "error" | undefined) => void;
}

export const ModalSubmit = ({ alert, setAlert }: IProps) => {
  const { locale = "ru" } = useRouter();
  const t = useMemo(() => lang[locale ?? "ru"], [locale]);

  return (
    <Modal clickClose={() => setAlert(undefined)}>
      <ModalLayout onClose={() => setAlert(undefined)} hideSocial={true}>
        <Header>{t.form.alerts[alert === "success" ? "sendFormSuccessTitle" : "sendFormErrorTitle"]}</Header>
        <Description
          dangerouslySetInnerHTML={{ __html: t.form.alerts[alert === "success" ? "sendFormSuccess" : "sendFormError"] }}
        />
        <div style={{ width: "inherit", display: "flex", justifyContent: "center" }}>
          <ConfirmButton type="red" onClick={() => setAlert(undefined)} className="submitBtn">
            хорошо
          </ConfirmButton>
        </div>
      </ModalLayout>
    </Modal>
  );
};

const Header = styled(H1)`
  margin: 0 1.1vw 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 0 0 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0 4vw 6vw;
  }
`;

const Description = styled.span`
  font-size: 0.83vw;
  color: ${theme.colors.grayDark};
  width: 100%;
  text-align: center;
  margin-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    margin-bottom: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    margin-bottom: 10.67vw;
  }
`;

const ConfirmButton = styled(CustomButton)`
  width: 9.38vw !important;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 23.47vw !important;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 48vw !important;
  }
`;

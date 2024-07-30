import { ContentStyled, HeaderStyled, TitleStyled } from "../../ui/commonComponents";
import { Card } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Language } from "./components/Language";

export const Settings = () => {
  const { t } = useTranslation();

  return (
    <>
      <HeaderStyled>
        <TitleStyled level={4}>{t("settings.title")}</TitleStyled>
      </HeaderStyled>
      <ContentStyled>
        <CardStyle>
          <Language />
        </CardStyle>
      </ContentStyled>
    </>
  );
};

const CardStyle = styled(Card)`
  min-height: calc(100vh - 112px);
`;

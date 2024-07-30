import { ContentStyled, HeaderStyled, TitleStyled } from "../../ui/commonComponents";
import { Card } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { MobileForm } from "./components/MobileForm";

export const MobileLayout = ({ access }: { access: boolean }) => {
  const { t } = useTranslation();

  return (
    <>
      <HeaderStyled>
        <TitleStyled level={4}>{t("mobileConfig.title")}</TitleStyled>
      </HeaderStyled>
      <ContentStyled>
        <CardStyle>
          <MobileForm access={access} />
        </CardStyle>
      </ContentStyled>
    </>
  );
};

const CardStyle = styled(Card)`
  min-height: calc(100vh - 112px);
`;

import { Card } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { StateType } from "../../core/redux/store";
import { ContentStyled, FallBack, HeaderStyled, TitleStyled } from "../../ui/commonComponents";
import { Loader } from "../../ui/Loader";

export const MarketingLayout = ({ access }: { access: boolean }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentInfoPage = useSelector((state: StateType) => state.infoPage.currentInfoPage);
  const infoPageFormTitle = currentInfoPage ? t("common.buttonsText.edit") : t("common.buttonsText.create");

  const title: Record<string, string> = {
    "/marketing/story": t("marketing.story.title"),
    "/marketing/banner": t("marketing.banner.title"),
    "/marketing/infoPages": t("marketing.infoPages.title"),
    "/marketing/infoPages/form": infoPageFormTitle + " " + t("marketing.infoPages.form.title")
  };

  return (
    <>
      <HeaderStyled>
        <TitleStyled level={4}>{title[location.pathname]}</TitleStyled>
      </HeaderStyled>
      <ContentStyled>
        <Card>
          <React.Suspense
            fallback={
              <FallBack>
                <Loader />
              </FallBack>
            }
          >
            <Outlet />
          </React.Suspense>
        </Card>
      </ContentStyled>
    </>
  );
};

export default MarketingLayout;

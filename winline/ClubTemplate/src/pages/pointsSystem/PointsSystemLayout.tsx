import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card } from "antd";
import { Loader } from "../../ui/Loader";
import { ContentStyled, HeaderStyled, TitleStyled, FallBack } from "../../ui/commonComponents";

const PointsSystemLayout = ({ access }: { access: boolean }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const title: Record<string, string> = {
    "/pointsSystem/loyalty": t("pointsSystem.loyalty.title"),
    "/pointsSystem/poll": t("pointsSystem.poll.title"),
    "/pointsSystem/products": t("pointsSystem.products.title"),
    "/pointsSystem/orders": t("pointsSystem.orders.title")
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

export default PointsSystemLayout;

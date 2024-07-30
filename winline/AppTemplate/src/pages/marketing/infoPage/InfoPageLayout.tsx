import React from "react";
import { Outlet } from "react-router-dom";
import { FallBack } from "../../../ui/commonComponents";
import { Loader } from "../../../ui/Loader";

export const InfoPageLayout = ({ access }: { access: boolean }) => {
  return (
    <React.Suspense
      fallback={
        <FallBack>
          <Loader />
        </FallBack>
      }
    >
      <Outlet />
    </React.Suspense>
  );
};

export default InfoPageLayout;

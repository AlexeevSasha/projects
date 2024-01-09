import { routePaths } from "common/constants/routePaths";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Redirect } from "../../ui/Redirect";

const SpecialOfferTable = lazy(async () =>
  import("./SpecialOfferTable").then((module) => ({
    default: module.SpecialOfferTable,
  }))
);

const SpecialOfferForm = lazy(async () =>
  import("./SpecialOfferForm").then((module) => ({
    default: module.SpecialOfferForm,
  }))
);

interface IProps {
  access: boolean;
}

export const SpecialOffer = ({ access }: IProps) => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<SpecialOfferTable access={access} />} />

        {access && [
          <Route key={1} path={`${routePaths.form.create}/*`} element={<SpecialOfferForm />} />,
          <Route key={2} path={`${routePaths.form.edit()}/*`} element={<SpecialOfferForm />} />,
        ]}

        <Route path="*" element={<Redirect path={"/"} />} />
      </Route>
    </Routes>
  );
};

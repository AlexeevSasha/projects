import { routePaths } from "common/constants/routePaths";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Redirect } from "../../ui/Redirect";

const LoyaltyTable = lazy(async () => import("./LoyaltyTable").then((module) => ({ default: module.LoyaltyTable })));

const LoyaltyForm = lazy(async () => import("./LoyaltyForm").then((module) => ({ default: module.LoyaltyForm })));

interface IProps {
  access: boolean;
}

export const Loyalty = ({ access }: IProps) => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LoyaltyTable access={access} />} />

        {access && [
          <Route key={1} path={`${routePaths.form.create}/*`} element={<LoyaltyForm />} />,
          <Route key={2} path={`${routePaths.form.edit()}/*`} element={<LoyaltyForm />} />,
        ]}

        <Route path="*" element={<Redirect path={"/"} />} />
      </Route>
    </Routes>
  );
};

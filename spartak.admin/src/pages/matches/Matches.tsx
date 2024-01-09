import { routePaths } from "common/constants/routePaths";
import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Redirect } from "../../ui/Redirect";

const MatchesTable = lazy(async () =>
  import("./MatchesTable").then((module) => ({
    default: module.MatchesTable,
  }))
);
const MatchesForm = lazy(async () =>
  import("./MatchesFormContainer").then((module) => ({
    default: module.MatchesFormContainer,
  }))
);

interface IProps {
  access: boolean;
}

export const Matches = ({ access }: IProps) => (
  <Routes>
    <Route path="/">
      <Route index element={<MatchesTable access={access} />} />
      {access && [
        <Route key="1" path={routePaths.form.create + "/*"} element={<MatchesForm />} />,
        <Route key="2" path={routePaths.form.edit() + "/*"} element={<MatchesForm />} />,
      ]}
      <Route path="*" element={<Redirect path={"/"} />} />
    </Route>
  </Routes>
);

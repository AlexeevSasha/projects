import { routePaths } from "common/constants/routePaths";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Redirect } from "../../ui/Redirect";

const TournamentsTable = lazy(async () =>
  import("./TournamentsTable").then((module) => ({
    default: module.TournamentsTable,
  }))
);
const TournamentsForm = lazy(async () =>
  import("./TournamentsForm").then((module) => ({
    default: module.TournamentsForm,
  }))
);

interface IProps {
  access: boolean;
}

export const Tournaments = ({ access }: IProps) => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<TournamentsTable access={access} />} />
        {access && [
          <Route key={1} path={`${routePaths.form.create}/*`} element={<TournamentsForm />} />,
          <Route key={2} path={`${routePaths.form.edit()}/*`} element={<TournamentsForm />} />,
        ]}
        <Route path="*" element={<Redirect path={"/"} />} />
      </Route>
    </Routes>
  );
};

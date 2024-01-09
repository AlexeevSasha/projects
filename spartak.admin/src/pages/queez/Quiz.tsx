import { routePaths } from "common/constants/routePaths";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Redirect } from "../../ui/Redirect";

const CompetitionsTable = lazy(async () =>
  import("./QuizTable").then((module) => ({
    default: module.QuizTable,
  }))
);

const CompetitionsForm = lazy(async () =>
  import("./QuizForm").then((module) => ({
    default: module.QuizForm,
  }))
);

interface IProps {
  access: boolean;
}

export const Quiz = ({ access }: IProps) => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<CompetitionsTable access={access} />} />

        {access && [
          <Route key={1} path={`${routePaths.form.create}/*`} element={<CompetitionsForm />} />,
          <Route key={2} path={`${routePaths.form.edit()}/*`} element={<CompetitionsForm />} />,
        ]}

        <Route path="*" element={<Redirect path={"/"} />} />
      </Route>
    </Routes>
  );
};

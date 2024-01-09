import { routePaths } from "common/constants/routePaths";
import React, { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Redirect } from "../../ui/Redirect";
import { getCategoriesByFilters } from "../../store/mediaCategories/mediaCategoryActionAsync";
import { useAppDispatch } from "../../store";

const MediaTable = lazy(async () =>
  import(/* MediaTable */ "./MediaTable").then((module) => ({
    default: module.MediaTable,
  }))
);
const MediaForm = lazy(async () =>
  import(/* MediaForm */ "./MediaForm").then((module) => ({
    default: module.MediaForm,
  }))
);

interface IProps {
  access: boolean;
}

export const Media = ({ access }: IProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCategoriesByFilters({ pageSize: 100 }));
  }, []);

  return (
    <Routes>
      <Route path="/">
        <Route index element={<MediaTable access={access} />} />
        {access && [
          <Route key={1} path={`${routePaths.form.create}/*`} element={<MediaForm />} />,
          <Route key={2} path={`${routePaths.form.edit()}/*`} element={<MediaForm />} />,
        ]}
        <Route path="*" element={<Redirect path={"/"} />} />
      </Route>
    </Routes>
  );
};

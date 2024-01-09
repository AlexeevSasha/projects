import React from "react";
import { Route, Switch } from "react-router-dom";
import { WorkSection } from "common/components/Container/WorkSection";
import { routesRegister } from "../../constants/routes";
import { AppSettings } from "../../constants/appSettings";

export const RouterRegister: React.FC = () => {
  return (
    <WorkSection>
      <Switch>
        {routesRegister.map((route, idx) => {
          return (
            <Route
              key={idx}
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}${route.path}`}
              render={() => <route.component />}
            />
          );
        })}
      </Switch>
    </WorkSection>
  );
};

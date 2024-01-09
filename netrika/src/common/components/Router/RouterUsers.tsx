import React from "react";
import { Route, Switch } from "react-router-dom";
import { routesUsers } from "common/constants/routes";
import { WorkSection } from "common/components/Container/WorkSection";
import { AppSettings } from "../../constants/appSettings";

export const RouterUsers: React.FC = () => {
  return (
    <WorkSection>
      <Switch>
        {routesUsers.map((route, idx) => {
          return route.component ? (
            <Route
              key={idx}
              path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}${route.path}`}
              render={() => <route.component />}
            />
          ) : null;
        })}
      </Switch>
    </WorkSection>
  );
};

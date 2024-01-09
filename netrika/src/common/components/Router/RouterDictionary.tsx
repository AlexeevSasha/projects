import React from "react";
import { Route, Switch } from "react-router-dom";
import { WorkSection } from "common/components/Container/WorkSection";
import { routesDirectory } from "../../constants/routes";
import { AppSettings } from "../../constants/appSettings";

export const RouterDictionary: React.FC = () => {
  return (
    <WorkSection>
      <Switch>
        {routesDirectory.map((route, idx) => {
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

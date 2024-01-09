import React from "react";
import { Route, Switch } from "react-router-dom";
import { WorkSection } from "common/components/Container/WorkSection";
import { routerProposal } from "../../constants/routes";
import { AppSettings } from "../../constants/appSettings";

export const RouterProposal: React.FC = () => {
  return (
    <WorkSection>
      <Switch>
        {routerProposal.map((route, idx) => {
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

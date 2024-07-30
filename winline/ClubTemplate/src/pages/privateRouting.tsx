import React, { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { routePaths } from "../common/constants/routePaths";
import { accessNames } from "../common/accessControles/accessNames";
import PointsSystemLayout from "./pointsSystem/PointsSystemLayout";
import Loyalty from "./pointsSystem/components/Loyalty";
import Product from "./pointsSystem/components/Product";
import Orders from "./pointsSystem/components/Orders";
import Polls from "./pointsSystem/components/Polls";

const EmployeeRoleTable = lazy(async () => import("./employeesRoles/RoleTable").then((module) => ({ default: module.RoleTable })));
const EmployeeTable = lazy(async () => import("./employees/EmployeeTable").then((module) => ({ default: module.EmployeeTable })));
const SystemLogTable = lazy(async () => import("./systemLog/SystemLogTable").then((module) => ({ default: module.SystemLogTable })));
const UserNotificationsLayout = lazy(async () =>
  import("./usersNotifications/UserNotificationsLayout").then((module) => ({ default: module.UserNotificationsLayout }))
);
const UserViewing = lazy(async () => import("./users/UsersViewing").then((module) => ({ default: module.UsersViewing })));
const AdvLayout = lazy(async () => import("./adv/AdvLayout").then((module) => ({ default: module.AdvLayout })));
const MatchesTable = lazy(async () => import("./matches/MatchesTable").then((module) => ({ default: module.MatchesTable })));
const StoryLayout = lazy(async () => import("./story/StoryLayout").then((module) => ({ default: module.StoryLayout })));

const MobileApp = React.lazy(async () => import("./mobileConfig/MobileLayout").then((module) => ({ default: module.MobileLayout })));
const Settings = React.lazy(async () => import("./settings/Settings").then((module) => ({ default: module.Settings })));

interface IProps {
  accessPolicies: string;
}

interface IRoute {
  path: string;
  access: string;
  element: Function;
  children?: IRoute[];
}

export const PrivateRouting = (props: IProps) => {
  return (
    <Routes>
      {routes
        .filter((item) => props.accessPolicies.includes(item.access) || props.accessPolicies.includes("fullAccess"))
        .map((route) =>
          route.children ? (
            <Route key={route.path} path={route.path} element={route.element(true)}>
              {route.children.map((children, i) => {
                const propsRoute = /*i === 0 ? { index: true } : */ { path: children.path };

                return (
                  <Route
                    key={i}
                    {...propsRoute}
                    element={children.element(
                      props.accessPolicies.includes(`${route.access}.write`) || props.accessPolicies.includes("fullAccess")
                    )}
                  />
                );
              })}
              <Route path={"*"} element={<Navigate to={route.path} replace />} />
            </Route>
          ) : (
            <Route
              key={route.path}
              path={route.path.toString()}
              element={route.element(
                props.accessPolicies.includes(`${route.access}.write`) || props.accessPolicies.includes("fullAccess"),
                props.accessPolicies.includes(`role.write`) || props.accessPolicies.includes("fullAccess"),
                props.accessPolicies.includes(`role.read`) || props.accessPolicies.includes("fullAccess")
              )}
            />
          )
        )}
      <Route path={routePaths.tableContent.settings} element={<Settings />} />
      <Route path="*" element={<Navigate to={routePaths.base} />} />
    </Routes>
  );
};

const routes: IRoute[] = [
  {
    path: routePaths.tableContent.users,
    access: accessNames.user,
    element: (access: boolean) => <UserViewing access={access} />
  },
  {
    path: routePaths.tableContent.usersNotification,
    access: accessNames.notification,
    element: (access: boolean) => <UserNotificationsLayout access={access} />
  },
  {
    path: routePaths.tableContent.employee,
    access: accessNames.employee,
    element: (access: boolean, writeRole: boolean, readRole: boolean) => (
      <EmployeeTable access={access} writeRole={writeRole} readRole={readRole} />
    )
  },
  {
    path: routePaths.tableContent.employeeRole,
    access: accessNames.role,
    element: (access: boolean) => <EmployeeRoleTable access={access} />
  },
  {
    path: routePaths.tableContent.mobileConfig,
    access: accessNames.mobileConfig,
    element: (access: boolean) => <MobileApp access={access} />
  },
  {
    path: routePaths.tableContent.systemLog,
    access: accessNames.log,
    element: (access: boolean) => <SystemLogTable access={access} />
  },
  {
    path: routePaths.tableContent.adv,
    access: accessNames.banner,
    element: (access: boolean) => <AdvLayout access={access} />
  },
  {
    path: routePaths.tableContent.matches,
    access: accessNames.matching,
    element: (access: boolean) => <MatchesTable access={access} />
  },
  {
    path: routePaths.tableContent.story,
    access: accessNames.banner,
    element: (access: boolean) => <StoryLayout access={access} />
  },
  {
    path: routePaths.tableContent.points.main,
    access: accessNames.points,
    element: (access: boolean) => <PointsSystemLayout access={access} />,
    children: [
      {
        path: routePaths.tableContent.points.loyalty,
        access: accessNames.points,
        element: (access: boolean) => <Loyalty access={access} />
      },
      {
        path: routePaths.tableContent.points.products,
        access: accessNames.points,
        element: (access: boolean) => <Product access={access} />
      },
      {
        path: routePaths.tableContent.points.poll,
        access: accessNames.points,
        element: (access: boolean) => <Polls access={access} />
      },
      {
        path: routePaths.tableContent.points.orders,
        access: accessNames.points,
        element: (access: boolean) => <Orders access={access} />
      },
      {
        path: "",
        access: accessNames.points,
        element: () => <Navigate to={routePaths.tableContent.points.loyalty} />
      }
    ]
  }
];

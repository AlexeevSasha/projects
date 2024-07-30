import React, { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { routePaths } from "../common/constants/routePaths";
import { accessNames } from "../common/accessControles/accessNames";
import { LoyaltyForm } from "./loyalty/components/form/LoyaltyForm";
import { LoyaltyLayout } from "./loyalty/LoyaltyLayout";

const EmployeeRoleTable = lazy(async () => import("./employeesRoles/RoleTable").then((module) => ({ default: module.RoleTable })));
const EmployeeTable = lazy(async () => import("./employees/EmployeeTable").then((module) => ({ default: module.EmployeeTable })));
const SystemLogTable = lazy(async () => import("./systemLog/SystemLogTable").then((module) => ({ default: module.SystemLogTable })));
const UserNotificationsLayout = lazy(async () =>
  import("./usersNotifications/UserNotificationsLayout").then((module) => ({ default: module.UserNotificationsLayout }))
);
const UserViewing = lazy(async () => import("./users/UsersViewing").then((module) => ({ default: module.UsersViewing })));
const AdvLayout = lazy(async () => import("./adv/AdvLayout").then((module) => ({ default: module.AdvLayout })));
const LoyaltyTable = React.lazy(async () =>
  import("./loyalty/components/LoyaltyTable").then((module) => ({ default: module.LoyaltyTable }))
);
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
  if (!location.pathname.includes("/loyalty/stock")) {
    localStorage.removeItem("loyalty");
  }

  return (
    <Routes>
      {routes
        .filter((item) => props.accessPolicies.includes(item.access) || props.accessPolicies.includes("fullAccess"))
        .map((route) =>
          route.children ? (
            <Route key={route.path} path={route.path} element={route.element(true)}>
              {route.children.map((children, i) => {
                const propsRoute = i === 0 ? { index: true } : { path: children.path };

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
      <Route path={routePaths.tableContent.settings} element={<Settings/>}/>
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
    path: routePaths.tableContent.loyalty.main,
    access: accessNames.loyalty,
    element: (access: boolean) => <LoyaltyLayout access={access} />,
    children: [
      {
        path: "",
        access: accessNames.loyalty,
        element: (access: boolean) => <LoyaltyTable access={access} />
      },
      {
        path: routePaths.tableContent.loyalty.newLoyalty,
        access: accessNames.loyalty,
        element: (access: boolean) => (access ? <LoyaltyForm access={access} /> : <Navigate to={routePaths.tableContent.loyalty.main} />)
      }
    ]
  },
  // {
  //   path: routePaths.tableContent.loyalty.newLoyalty,
  //   access: accessNames.loyalty,
  //   element: (access: boolean) => (access ? <LoyaltyForm /> : <Navigate to={routePaths.tableContent.loyalty.main} />)
  // },
  {
    path: routePaths.tableContent.systemLog,
    access: accessNames.log,
    element: (access: boolean) => <SystemLogTable access={access} />
  },
  {
    path: routePaths.tableContent.adv,
    access: accessNames.banner,
    element: (access: boolean) => <AdvLayout access={access} />
  }
];

import React, { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { routePaths } from "../common/constants/routePaths";
import { accessNames } from "../common/accessControles/accessNames";
import MarketingLayout from "./marketing/MarketingLayout";
import InfoPageLayout from "./marketing/infoPage/InfoPageLayout";

const EmployeeRoleTable = lazy(async () => import("./employeesRoles/RoleTable").then((module) => ({ default: module.RoleTable })));
const EmployeeReminders = lazy(async () =>
  import("./employeesReminders/RemindersTable").then((module) => ({ default: module.RemindersTable }))
);
const EmployeeTable = lazy(async () => import("./employees/EmployeeTable").then((module) => ({ default: module.EmployeeTable })));
const SystemLogTable = lazy(async () => import("./systemLog/SystemLogTable").then((module) => ({ default: module.SystemLogTable })));
const UserNotificationsLayout = lazy(async () =>
  import("./usersNotifications/UserNotificationsLayout").then((module) => ({ default: module.UserNotificationsLayout }))
);
const UserViewing = lazy(async () => import("./users/UsersViewing").then((module) => ({ default: module.UsersViewing })));
const Settings = React.lazy(async () => import("./settings/Settings").then((module) => ({ default: module.Settings })));

const StoryLayout = lazy(async () => import("./marketing/story/StoryLayout").then((module) => ({ default: module.StoryLayout })));
const BannerLayout = lazy(async () => import("./marketing/banner/BannerLayout").then((module) => ({ default: module.BannerLayout })));
const InfoPageTable = lazy(async () => import("./marketing/infoPage/InfoPageTable").then((module) => ({ default: module.InfoPageTable })));
const FormInfoPage = lazy(async () =>
  import("./marketing/infoPage/components/form/FormInfoPage").then((module) => ({ default: module.FormInfoPage }))
);

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
                  >
                    {children.children ? (
                      children.children.map((child, ind) => {
                        const propsChildRoute = { path: child.path };

                        return (
                          <Route
                            key={ind}
                            {...propsChildRoute}
                            element={child.element(
                              props.accessPolicies.includes(`${children.access}.write`) || props.accessPolicies.includes("fullAccess")
                            )}
                          />
                        );
                      })
                    ) : (
                      <Route path={"*"} element={<Navigate to={children.path} replace />} />
                    )}
                  </Route>
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
    path: routePaths.tableContent.systemLog,
    access: accessNames.log,
    element: (access: boolean) => <SystemLogTable access={access} />
  },
  {
    path: routePaths.tableContent.marketing.main,
    access: accessNames.marketing,
    element: (access: boolean) => <MarketingLayout access={access} />,
    children: [
      {
        path: routePaths.tableContent.marketing.story,
        access: accessNames.marketing,
        element: (access: boolean) => <StoryLayout access={access} />
      },
      {
        path: routePaths.tableContent.marketing.banner,
        access: accessNames.marketing,
        element: (access: boolean) => <BannerLayout access={access} />
      },
      {
        path: routePaths.tableContent.marketing.infoPages.main,
        access: accessNames.marketing,
        element: (access: boolean) => <InfoPageLayout access={access} />,
        children: [
          {
            path: "",
            access: accessNames.marketing,
            element: (access: boolean) => <InfoPageTable access={access} />
          },
          {
            path: routePaths.tableContent.marketing.infoPages.form,
            access: accessNames.marketing,
            element: (access: boolean) =>
              access ? <FormInfoPage access={access} /> : <Navigate to={routePaths.tableContent.marketing.infoPages.main} />
          }
        ]
      },
      {
        path: "",
        access: accessNames.marketing,
        element: () => <Navigate to={routePaths.tableContent.marketing.story} />
      }
    ]
  },
  {
    path: routePaths.tableContent.employeeReminders,
    access: accessNames.reminder,
    element: (access: boolean) => <EmployeeReminders access={access} />
  }
];

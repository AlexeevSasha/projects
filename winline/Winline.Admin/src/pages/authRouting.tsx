import React, { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { routePaths } from "../common/constants/routePaths";

const SignIn = lazy(async () => import("./signIn/SignIn").then((module) => ({ default: module.SignIn })));
const ForgotPassword = lazy(async () => import("./forgotPassword/ForgotPassword").then((module) => ({ default: module.ForgotPassword })));
const RecoveryPassword = lazy(async () =>
  import("./recoveryPassword/RecoveryPassword").then((module) => ({ default: module.RecoveryPassword }))
);
const Invitation = lazy(async () => import("./invitation/Invitation").then((module) => ({ default: module.Invitation })));
const OperationSuccess = lazy(async () =>
  import("./operationSuccess/OperationSuccess").then((module) => ({ default: module.OperationSuccess }))
);
const OperationError = lazy(async () => import("./operationError/OperationError").then((module) => ({ default: module.OperationError })));

export const AuthRouting = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<SignIn />} />
        <Route path={routePaths.sign.forgotPassword} element={<ForgotPassword />} />
        <Route path={routePaths.sign.recoveryPassword} element={<RecoveryPassword />} />
        <Route path={routePaths.sign.invitation} element={<Invitation />} />
        <Route path={routePaths.sign.recoveryPasswordSuccess} element={<OperationSuccess />} />
        <Route path={routePaths.sign.invitationSuccess} element={<OperationSuccess />} />
        <Route path={routePaths.sign.recoveryPasswordError} element={<OperationError />} />
        <Route path={routePaths.sign.invitationError} element={<OperationError />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

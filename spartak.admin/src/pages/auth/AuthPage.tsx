import { routePaths } from "common/constants/routePaths";
import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Redirect } from "ui/Redirect";

const SignIn = lazy(async () => import("./signIn/SignIn").then((module) => ({ default: module.SignIn })));
const ForgotPassword = lazy(async () =>
  import(/* ForgotPassword */ "./forgotPassword/ForgotPassword").then((module) => ({
    default: module.ForgotPassword,
  }))
);
const RecoveryPassword = lazy(async () =>
  import(/* RecoveryPassword */ "./recoveryPassword/RecoveryPassword").then((module) => ({
    default: module.RecoveryPassword,
  }))
);
const Invitation = lazy(async () =>
  import(/* Invitation */ "./invitation/Invitation").then((module) => ({
    default: module.Invitation,
  }))
);
const OperationSuccess = lazy(async () =>
  import(/* OperationSuccess */ "./operationSuccess/OperationSuccess").then((module) => ({
    default: module.OperationSuccess,
  }))
);
const OperationError = lazy(async () =>
  import(/* OperationError */ "./operationError/OperationError").then((module) => ({
    default: module.OperationError,
  }))
);

export const AuthPage = () => {
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
        <Route path="*" element={<Redirect path="/" />} />
      </Route>
    </Routes>
  );
};

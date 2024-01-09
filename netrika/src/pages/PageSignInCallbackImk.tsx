import { AuthServiceImk } from "module/authorization/AuthServiceImk";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { PageLoading } from "./PageLoading";

export const PageSignInCallbackImk = React.memo(() => {
  const history = useHistory();

  useEffect(() => {
    const authService = new AuthServiceImk();
    authService
      .redirect()
      .then((val) => {
        history.push(val.state);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [history]);

  return <PageLoading text="Обработка обратного вызова аутентификации" />;
});

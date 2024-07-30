import { post } from "../baseRequest";

export const authorization = async (authDataRequest: string) => {
  //TODO Диме проверить
  // const authDataRequest2 = "client_id=" + encodeURIComponent('admin.client') + '&client_secret=' +
  //     encodeURIComponent('9F45EA47-9BD6-48D8-B218-273A256DB093') + '&grant_type=password' + '&scope='
  //     + encodeURIComponent('openid profile offline_access admin-api policy')
  //     + '&username=' + 'test%40gmail.com' + '&password=' + '005';

  return post<string>(`${process.env.REACT_APP_IDENTITY}/connect/token`, authDataRequest, "application/x-www-form-urlencoded");
};

export const invitation = async (body: { token: string; password: string }) =>
  post<string>(`${process.env.REACT_APP_ADMIN}/v1/EmployeeActivation/AcceptRegisterByToken`, JSON.stringify(body), "application/json");

export const recovery = async (body: { token: string; password: string }) =>
  post<string>(`${process.env.REACT_APP_ADMIN}/v1/EmployeeActivation/RestorePasswordByToken`, JSON.stringify(body), "application/json");

export const forgot = async (email: string) =>
  post<string>(`${process.env.REACT_APP_ADMIN}/v1/EmployeeActivation/Forgot`, JSON.stringify(email), "application/json");

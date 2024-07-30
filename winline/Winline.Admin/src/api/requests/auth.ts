import {post} from '../baseRequest';

export const authorization = async (authDataRequest: string) =>
    post<string>(
        `${process.env.REACT_APP_IDENTITY}/connect/token`,
        authDataRequest,
        'application/x-www-form-urlencoded'
    );

export const invitation = async (body: { token: string; password: string }) =>
    post<string>(
        `${process.env.REACT_APP_ADMIN}/EmployeeActivation/AcceptRegisterByToken`,
        JSON.stringify(body),
        'application/json'
    );

export const recovery = async (body: { token: string; password: string }) =>
    post<string>(
        `${process.env.REACT_APP_ADMIN}/EmployeeActivation/RestorePasswordByToken`,
        JSON.stringify(body),
        'application/json'
    );

export const forgot = async (email: string) =>
    post<string>(
        `${process.env.REACT_APP_ADMIN}/EmployeeActivation/Forgot`,
        JSON.stringify(email),
        'application/json'
    );



import type {IAuthInfo, IUserInfo} from "../../../api/dto/auth/IAuth";
import { storageNames } from "../../../modules/authorization/constants/storageNames";

export const setStorageAuth = (remember: boolean, authDataResponse: IAuthInfo) => {
    if (remember) {
        localStorage.setItem(storageNames.localAuthData, JSON.stringify(authDataResponse));
    } else {
        sessionStorage.setItem(storageNames.sessionAuthData, JSON.stringify(authDataResponse));
    }
};

export const setStorageUserInfo = (remember: boolean, userData: Omit<IUserInfo, 'remember'>) => {
    if (remember) {
        localStorage.setItem(storageNames.localUserInfo, JSON.stringify({ ...userData, remember }));
    } else {
        sessionStorage.setItem(storageNames.sessionUserInfo, JSON.stringify({ ...userData, remember} ));
    }
};

export const getStorageUserInfo = () => {
    if (!!localStorage.getItem(storageNames.localUserInfo)) {
        const userInfoLocal = localStorage.getItem(storageNames.localUserInfo);

        return userInfoLocal ? JSON.parse(userInfoLocal) : {};
    } else if (!!sessionStorage.getItem(storageNames.sessionUserInfo)) {
        const userInfoSession = sessionStorage.getItem(storageNames.sessionUserInfo);

        return userInfoSession ? JSON.parse(userInfoSession) : {};
    } else {
        return {};
    }
};

export const getStorageAuthData = () => {
    if (!!localStorage.getItem(storageNames.localAuthData)) {
        const userInfoLocal = localStorage.getItem(storageNames.localAuthData);

        return userInfoLocal ? JSON.parse(userInfoLocal) : {};
    } else if (!!sessionStorage.getItem(storageNames.sessionAuthData)) {
        const userInfoSession = sessionStorage.getItem(storageNames.sessionAuthData);

        return userInfoSession ? JSON.parse(userInfoSession) : {};
    } else {
        return {};
    }
};


export const clearStorageAndCookie = () => {
    // УДАЛЕНИЕ КУКИ
    // TODO Диме проверить
    // document.cookie = 'authorization=true; max-age=-1';
    localStorage.removeItem(storageNames.localUserInfo);
    localStorage.removeItem(storageNames.localAuthData);
    sessionStorage.removeItem(storageNames.sessionUserInfo);
    sessionStorage.removeItem(storageNames.sessionAuthData);
    localStorage.removeItem(storageNames.localExpAuthData);
    sessionStorage.removeItem(storageNames.localExpAuthData);
};

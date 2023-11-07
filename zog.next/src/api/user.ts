import axios from "axios";
import { toast } from "react-toastify";
import { UserPartnerInfoT, UserT } from "../modules/user/interfaces/UserT";
import { UserRoleT } from "../modules/user/interfaces/UserRoleT";
import { signIn, signOut } from "next-auth/react";

export const existsUserByEmail = async (email: string) => {
  try {
    const response = await axios.post("/api/users/exists", { email });
    return response.data.exists;
  } catch (error: any) {
    return false;
  }
};

export const updateUser = async (param: Partial<UserT>, callback?: () => void) => {
  try {
    const response = await axios.post("/api/users/update", param);
    toast.success(response.data.message);
    callback?.();
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const searchUser = async (page: number, value: string, role: UserRoleT | "") => {
  try {
    const response = await axios.post(`/api/users/postUser?page=${page}`, {
      searchText: value,
      role,
    });
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { userList: [], totalPage: 0 };
  }
};

export const updateUserRole = async (
  role: UserRoleT,
  isPartner: boolean,
  user: UserPartnerInfoT
) => {
  try {
    const response = await axios.post("/api/users/updateRole", {
      role,
      isPartner,
      user: user,
    });
    toast.success(response.data.message);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const checkUserUtm = async (id: string) => {
  try {
    await axios.post("/api/users/checkUtmPartner", { id });
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

export const deleteUser = async (id: string, callback: (id: string) => void) => {
  try {
    const response = await axios.delete(`/api/users/delete?id=${id}`);
    callback(id);
    toast.success(response.data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const getConsultants = async (callback: (consults: UserT[]) => void) => {
  try {
    const response = await axios.post<{ data: UserT[] }>("/api/users/getConsultants");
    callback(response.data.data);
  } catch (error: any) {
    callback([]);
  }
};

export const autoLogin = async (email: string, isManual: string) => {
  try {
    await signOut({ redirect: false });
    await signIn(
      "email",
      { email, redirect: false, callbackUrl: isManual ? "/lk" : "/lk/profile" },
      { auto_login: "true" }
    );
    const response = await axios.post<{ data: { url: string } }>("/api/users/auto-login", {
      email,
    });
    return response.data.data.url;
  } catch (error: any) {}
};

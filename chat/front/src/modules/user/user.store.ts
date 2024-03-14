import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { IUser } from "./interfaces/user";
import { IAuthSighIn, IAuthSighUp } from "../auth/interfaces/auth";
import { AuthRequest } from "@/api/authRequest";
import { localStorageCustom } from "@/common/helpers/storage";
import { StorageEnum } from "@/common/types/storage";

interface IUserStore {
  user: IUser | null;
  signIn: (values: IAuthSighIn) => Promise<void>;
  signUp: (values: IAuthSighUp) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    devtools(
      immer((set) => ({
        user: null,
        signIn: async (values) => {
          const response = await new AuthRequest().signin(values);
          if (response) {
            set({ user: response.user });
            localStorageCustom.set(StorageEnum.ACCESS_TOKEN, response.access_token);
          }
        },
        signUp: async (values) => {
          const response = await new AuthRequest().signup(values);
          if (response) {
            set({ user: response.user });
            localStorageCustom.set(StorageEnum.ACCESS_TOKEN, response.access_token);
          }
        },
        logout: async () => {
          await new AuthRequest().logout();
          localStorageCustom.clear();
        },
      })),
    ),
    { name: "state-user", version: 1 },
  ),
);

import { BaseRequest } from "@/api/baseRequest";
import { urlApiPath } from "@/common/constants/urlApiPath";
import { toast } from "react-toastic";
import { localStorageCustom } from "@/common/helpers/storage";
import { StorageEnum } from "@/common/types/storage";
import { IInviteFriend } from "@/modules/friend/interfaces/IInviteFriend";

export class FriendRequest extends BaseRequest {
  token: string;

  constructor() {
    super();
    this.token = localStorageCustom.get(StorageEnum.ACCESS_TOKEN) || "";
  }

  async getAllInvite(): Promise<IInviteFriend[]> {
    try {
      return await this.get(urlApiPath.friend.invite, this.token);
    } catch (error) {
      console.error("FriendRequest-getAllInvite", error);
    }
  }

  async invite(email: string): Promise<void> {
    try {
      const response = await this.post<{ message: string }>(urlApiPath.friend.invite, JSON.stringify({ email }), this.token);
      toast.success(response.message);
    } catch (error) {
      console.error("FriendRequest-invite", error);
    }
  }

  async accept(id: string): Promise<boolean> {
    try {
      const response = await this.get<{ message: string }>(urlApiPath.friend.accept + `?id=${id}`, this.token);
      toast.success(response.message);
      return true;
    } catch (error) {
      console.error("FriendRequest-accept", error);
    }
  }

  async reject(id: string): Promise<boolean> {
    try {
      const response = await this.get<{ message: string }>(urlApiPath.friend.reject + `?id=${id}`, this.token);
      toast.success(response.message);
      return true;
    } catch (error) {
      console.error("FriendRequest-reject", error);
    }
  }
}

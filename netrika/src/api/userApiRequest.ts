import { BaseRequest } from "./baseRequest";
import { IUsersRequest } from "../common/interfaces/user/IUsersRequest";
import { IUser } from "../common/interfaces/user/IUser";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";

export class UserApiRequest extends BaseRequest {
  getUserList(
    pageSize: number,
    pageIndex: number,
    usersRequestDto: IUsersRequest
  ): Promise<IControllerResponse<IPaginateItems<IUser[]>>> {
    return this.fetch(`/api/User/UsersList/?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
      method: "POST",
      body: JSON.stringify(usersRequestDto),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getUser(userId: number): Promise<IControllerResponse<IUser>> {
    return this.fetch(`/api/User/Users/${userId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateUser(user: IUser): Promise<IControllerResponse<IUser>> {
    return this.fetch("/api/User/Users", {
      method: "POST",
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteUser(userId: number): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/User/Users/${userId}`, {
      method: "DELETE",
    }).catch(BaseRequest.handleError);
  }

  getPassword(): Promise<IControllerResponse<string>> {
    return this.fetch("/api/User/generatePassword?length=10", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}

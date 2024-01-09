import { IAuthorization } from "common/interfaces/auth";
import { BaseApiService } from "./BaseApiService";

class IdentityRepository extends BaseApiService {
  constructor() {
    super("identity");
  }

  authorization = async (body: IAuthorization) => {
    const authDataRequest =
      "client_id=" +
      encodeURIComponent("admin.client") +
      "&client_secret=" +
      encodeURIComponent("9F45EA47-9BD6-48D8-B218-273A256DB093") +
      "&grant_type=password" +
      "&scope=" +
      encodeURIComponent("openid profile offline_access admin-api policy") +
      "&username=" +
      encodeURIComponent(body.login) +
      "&password=" +
      encodeURIComponent(body.password);

    return this.post<string>("connect/token", authDataRequest, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  };

  getUserInfo = async (token: string) =>
    this.get("connect/userinfo", { headers: { Authorization: `Bearer ${token}` } });
}

export const identityRepository = new IdentityRepository();

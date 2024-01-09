import { NoticeEntity, NoticeFilters } from "common/interfaces/notifications";
import { BaseApiService } from "./BaseApiService";

class NotificationsRepository extends BaseApiService {
  constructor() {
    super("admin");
  }

  fetchByFilter = async (filter: NoticeFilters) => {
    const res = await this.get(`odata/Notification?${this.getODataQuery(filter)}`);

    return { items: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: NoticeEntity["Id"]) => {
    const res = await this.get(`odata/Notification?$filter=Id eq ${id}`);

    return res.value[0];
  };

  fetchByExternalId = async (externalId: NoticeEntity["ExternalId"]) => {
    const res = await this.get(`odata/Notification?$filter=ExternalId eq ${externalId}`);

    return res.value[0];
  };

  publish = async (partner: NoticeEntity) => await this.post("Notification/AddPush", JSON.stringify(partner));

  deleteById = async (id: NoticeEntity["Id"]) => await this.delete(`Notification/DeleteNotification?id=${id}`);

  update = async (body: NoticeEntity) => await this.put(`Notification/UpdatePush?id=${body.Id}`, JSON.stringify(body));

  getDeepLink = async () => await this.get("DeepLink/Get");

  getSeasonForMvp = async () => await this.get("MvpVoting/getSeasonForMvp");

  addFile = async (file: File, fileContentType: string) => {
    const formData = new FormData();
    formData.append("formFile", file);

    return await this.post(`Notification/AddUserPhoneFile`, formData, {
      headers: {},
    }).catch(() => "");
  };

  deleteFile = async (filePaths: string) => {
    await this.delete("Notification/DeleteUserPhoneFile", JSON.stringify(filePaths));
  };

  uploadImg = async (file: File) => {
    const formData = new FormData();
    formData.append("formFile", file);

    return await this.post("Notification/AddImage", formData, {
      headers: {},
    }).catch(() => file.name);
  };

  removeImg = async (filePaths: string[]) => {
    const path = filePaths.filter((p) => !!p);

    path.length && (await this.delete("Notification/DeleteImage", JSON.stringify(path)));
  };
}

export const notificationsRepository = new NotificationsRepository();

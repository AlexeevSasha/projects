import { BaseResponce } from "common/interfaces/common";
import { LoyaltyEntity, LoyaltyFilterEntity } from "common/interfaces/loyalty";
import { BaseApiService } from "./BaseApiService";

class LoyaltyRepository extends BaseApiService {
  constructor() {
    super("advertisement");
  }

  fetchByFilter = async (filter: LoyaltyFilterEntity = {}) => {
    const res = await this.get<BaseResponce<LoyaltyEntity[]>>(
      `odata/Loyalty?$expand=Condition,AcceptUser&${this.getODataQuery(filter)}`
    );

    return { items: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: LoyaltyEntity["Id"]) => {
    const { value } = await this.get<BaseResponce<LoyaltyEntity[]>>(
      `odata/Loyalty?$expand=Condition&$filter=Id eq ${id}`
    );

    return value[0];
  };

  save = async (body: LoyaltyEntity) => await this.post(`Loyalty/AddLoyalty`, JSON.stringify(body));

  update = async (body: LoyaltyEntity) => await this.put(`Loyalty/UpdateLoyalty`, JSON.stringify(body));

  remove = async (Id: LoyaltyEntity["Id"]) => await this.delete(`Loyalty/DeleteLoyalty?Id=${Id}`);

  setOutOfStock = (Id: LoyaltyEntity["Id"]) => this.put(`Loyalty/SetOutOfStockLoyalty`, `"${Id}"`);

  addImage = async (file: File) => {
    const formData = new FormData();
    formData.append("formFile", file);

    return await this.post("Loyalty/AddImage", formData, {
      headers: {},
    }).catch(() => file.name);
  };

  deleteImage = async (filePaths: string[]) => {
    const path = filePaths.filter((p) => !!p);
    path.length && (await this.delete("Loyalty/DeleteImage", JSON.stringify(path)));

    return true;
  };

  addFile = async (file: File, fileContentType: string) => {
    const formData = new FormData();
    formData.append("formFile", file);

    return await this.post(`Loyalty/AddFile?fileContentType=${fileContentType}`, formData, {
      headers: {},
    }).catch(() => ({ FilePath: "", ItemsCount: 0 }));
  };

  deleteFile = async (filePaths: string) => {
    await this.delete("Loyalty/DeleteFile", JSON.stringify([filePaths]));
  };

  fetchExportReport = (loyaltyId: LoyaltyEntity["Id"]) =>
    this.post(`Loyalty/ExportReport?loyaltyId=${loyaltyId}&api-version=Loyalty`, undefined, {
      headers: { "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
    });
}

export const loyaltyRepository = new LoyaltyRepository();

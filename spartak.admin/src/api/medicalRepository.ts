import { BaseResponce } from "common/interfaces/common";
import { BaseApiService } from "./BaseApiService";
import { Staff, StaffFilters } from "../common/interfaces/staff";

class MedicalRepository extends BaseApiService {
  constructor() {
    super("match");
  }
  fetchByFilter = async (filter: StaffFilters) => {
    const res = await this.get(
      `odata/Staff?$expand=Teams&${this.getODataQuery({
        ...filter,
        Type: "Medical",
      })}`
    );

    return { staff: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: Staff["Id"]) => {
    const { value } = await this.get<BaseResponce<Staff[]>>(`odata/Staff?$expand=Teams&$filter=Id eq ${id}`);

    return {
      ...value[0],
      CitizenshipId: value[0].Citizenship.CitizenshipId,
      TeamIds: value[0].Teams?.map(({ Id }) => Id),
    };
  };

  publish = async (partner: Staff) => await this.post("Staff/Publish", JSON.stringify({ ...partner, Type: "Medical" }));

  draft = async (partner: Staff) => await this.post("Staff/Draft", JSON.stringify({ ...partner, Type: "Medical" }));

  deleteById = async (id: Staff["Id"]) => await this.delete(`Staff/Delete?id=${id}`);
}

export const medicalRepository = new MedicalRepository();

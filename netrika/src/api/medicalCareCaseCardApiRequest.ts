import { BaseRequest } from "./baseRequest";
import { IMedicalCareCaseCardGetSteps } from "../common/interfaces/medical/IMedicalCareCaseCardGetSteps";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IDiseaseCardCustomBlock } from "../common/interfaces/IDiseaseCardCustomBlock";

export class MedicalCareCaseCardApiRequest extends BaseRequest {
  getSteps(caseBizKey: number): Promise<IControllerResponse<IMedicalCareCaseCardGetSteps[]>> {
    return this.fetch(`/api/MedicalCareCaseCard/getSteps/${caseBizKey}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getCustomBlocks(
    registerId: number,
    patientId: string,
    caseBizKey: number
  ): Promise<IControllerResponse<IDiseaseCardCustomBlock[]>> {
    return this.fetch(`/api/MedicalCareCaseCard/getCustomBlocks/${registerId}/${patientId}/${caseBizKey}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}

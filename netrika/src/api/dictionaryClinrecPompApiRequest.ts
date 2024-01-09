import { BaseRequest } from "./baseRequest";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IPaginateItems } from "../common/interfaces/dictionary/IDictionaryDisplayField";
import {
  ICreateClinrecActivity,
  ICreateClinrec,
  ICreateClinrecStage,
  ICreateClinrecThesis,
  IDictionaryClinrecActivity,
  IDictionaryClinrec,
  IDictionaryClinrecStage,
  IDictionaryClinrecThesis,
  IUpdateClinrecActivity,
  IUpdateClinrecStage,
  IUpdateClinrecThesis,
} from "../common/interfaces/dictionary/IDictionaryClinrec";
import {
  ICreateGraph,
  ICreatePompActivity,
  ICreatePomp,
  ICreatePompStage,
  ICreatePompState,
  IDictionaryGraph,
  IDictionaryPompActivity,
  IDictionaryPomp,
  IDictionaryStage,
  IDictionaryState,
  IUpdatePompActivity,
  IUpdatePompStage,
  IUpdatePompState,
} from "../common/interfaces/dictionary/IDictionaryPomp";
import { IConfiguratorValue } from "../common/interfaces/IConfiguratorValue";

export class DictionaryClinrecPompApiRequest extends BaseRequest {
  getDictionaryPomp(
    pageIndex: number,
    pageSize: number,
    searchName: string
  ): Promise<IControllerResponse<IPaginateItems<IDictionaryPomp[]>>> {
    return this.fetch(
      `/api/DictionaryClinrecPomp/ShortInfo/Pomp/?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${searchName}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryPompsGraph(pompId: number): Promise<IControllerResponse<IDictionaryGraph[]>> {
    return this.fetch(`/api/DictionaryClinrecPomp/Pomp/Graph/${pompId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryPompsStage(graphId: number): Promise<IControllerResponse<IDictionaryStage[]>> {
    return this.fetch(`/api/DictionaryClinrecPomp/Pomp/Stage/${graphId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryPompsState(graphId: number, stageCode: string): Promise<IControllerResponse<IDictionaryState[]>> {
    return this.fetch(`/api/DictionaryClinrecPomp/Pomp/State/${graphId}/${stageCode}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryPompsActivity(stateId: number): Promise<IControllerResponse<IDictionaryPompActivity[]>> {
    return this.fetch(`/api/DictionaryClinrecPomp/Pomp/Activity/${stateId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryClinrec(
    pageIndex: number,
    pageSize: number,
    searchName: string
  ): Promise<IControllerResponse<IPaginateItems<IDictionaryClinrec[]>>> {
    return this.fetch(
      `/api/DictionaryClinrecPomp/ShortInfo/Clinrec/?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${searchName}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryPaginateState(data: {
    graphId: number;
    pageIndex: number;
    pageSize: number;
    search: string;
  }): Promise<IControllerResponse<IPaginateItems<IConfiguratorValue[]>>> {
    return this.fetch(
      `/api/DictionaryClinrecPomp/Dictionary/State/${data.graphId}/?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}&search=${data.search}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryClinrecsStage(clinrecId: number): Promise<IControllerResponse<IDictionaryClinrecStage[]>> {
    return this.fetch(`/api/DictionaryClinrecPomp/Clinrec/Stage/${clinrecId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryClinrecsThesis(
    stageCode: string,
    clinrecId: number
  ): Promise<IControllerResponse<IDictionaryClinrecThesis[]>> {
    return this.fetch(`/api/DictionaryClinrecPomp/Clinrec/Thesis/${stageCode}/?clinrecId=${clinrecId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryClinrecsActivity(thesisCode: string): Promise<IControllerResponse<IDictionaryClinrecActivity[]>> {
    return this.fetch(`/api/DictionaryClinrecPomp/Clinrec/Activity/${thesisCode}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryClinrecPompAgeCategory(): Promise<IControllerResponse<IConfiguratorValue[]>> {
    return this.fetch("/api/DictionaryClinrecPomp/Dictionary/AgeCategory", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryClinrecPompDiagnosis(data: {
    pageIndex: number;
    pageSize: number;
    search: string;
  }): Promise<IControllerResponse<IPaginateItems<IConfiguratorValue[]>>> {
    return this.fetch(
      `/api/DictionaryClinrecPomp/Dictionary/Diagnosis/?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}&search=${data.search}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryClinrecPompClinrecUsageStatus(): Promise<IControllerResponse<IConfiguratorValue[]>> {
    return this.fetch("/api/DictionaryClinrecPomp/ClinrecUsageStatus", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getDictionaryClinrecPompClinrecStatus(): Promise<IControllerResponse<IConfiguratorValue[]>> {
    return this.fetch("/api/DictionaryClinrecPomp/ClinrecStatus", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getClinrecList(): Promise<IControllerResponse<{ id: number; label: string; clinrecName: string }[]>> {
    return this.fetch("/api/DictionaryClinrecPomp/List/Clinrec", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createClinrecBasedOn(reqest: { name: string; idClinrec: number }): Promise<IControllerResponse<string>> {
    return this.fetch("/api/DictionaryClinrecPomp/Clinrec/CreateBasedOn", {
      method: "POST",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createClinrec(reqest: ICreateClinrec): Promise<IControllerResponse<any>> {
    return this.fetch("/api/DictionaryClinrecPomp/Clinrec", {
      method: "POST",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  editClinrec(reqest: ICreateClinrec): Promise<IControllerResponse<any>> {
    return this.fetch("/api/DictionaryClinrecPomp/Clinrec", {
      method: "PUT",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteClinrec(id: number): Promise<IControllerResponse<any>> {
    return this.fetch(`/api/DictionaryClinrecPomp/Clinrec/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getClinrecStsgeList(data: {
    pageIndex: number;
    pageSize: number;
    search: string;
  }): Promise<IControllerResponse<IPaginateItems<IConfiguratorValue[]>>> {
    return this.fetch(
      `/api/DictionaryClinrecPomp/Dictionary/Stage/?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}&search=${data.search}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getClinrecTriggerPoint(data: {
    pageIndex: number;
    pageSize: number;
    search: string;
  }): Promise<IControllerResponse<IPaginateItems<IConfiguratorValue[]>>> {
    return this.fetch(
      `/api/DictionaryClinrecPomp/Dictionary/TriggerPoint/?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}&search=${data.search}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getTimeoutUnit(): Promise<IControllerResponse<IConfiguratorValue[]>> {
    return this.fetch("/api/DictionaryClinrecPomp/Dictionary/TimeoutUnit", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createClinrecStage(reqest: ICreateClinrecStage): Promise<IControllerResponse<IDictionaryClinrecStage>> {
    return this.fetch("/api/DictionaryClinrecPomp/Clinrec/Stage", {
      method: "POST",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateClinrecStage(reqest: IUpdateClinrecStage): Promise<IControllerResponse<IDictionaryClinrecStage>> {
    return this.fetch("/api/DictionaryClinrecPomp/Clinrec/Stage", {
      method: "PUT",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteClinrecStage(clinrecId: number, stageCode: string): Promise<IControllerResponse<any>> {
    return this.fetch(`/api/DictionaryClinrecPomp/Clinrec/Stage/${clinrecId}/${stageCode}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createClinrecThesis(reqest: ICreateClinrecThesis): Promise<IControllerResponse<IDictionaryClinrecThesis>> {
    return this.fetch("/api/DictionaryClinrecPomp/Clinrec/Thesis", {
      method: "POST",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateClinrecThesis(reqest: IUpdateClinrecThesis): Promise<IControllerResponse<IDictionaryClinrecThesis>> {
    return this.fetch("/api/DictionaryClinrecPomp/Clinrec/Thesis", {
      method: "PUT",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteClinrecThesis(clinrecId: number, thesisCode: string): Promise<IControllerResponse<any>> {
    return this.fetch(`/api/DictionaryClinrecPomp/Clinrec/Thesis/${clinrecId}/${thesisCode}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createClinrecActivity(reqest: ICreateClinrecActivity): Promise<IControllerResponse<IDictionaryClinrecActivity>> {
    return this.fetch("/api/DictionaryClinrecPomp/Clinrec/Activity", {
      method: "POST",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateClinrecActivity(reqest: IUpdateClinrecActivity): Promise<IControllerResponse<IDictionaryClinrecActivity>> {
    return this.fetch("/api/DictionaryClinrecPomp/Clinrec/Activity", {
      method: "PUT",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteClinrecActivity(clinrecId: number, activityId: number): Promise<IControllerResponse<any>> {
    return this.fetch(`/api/DictionaryClinrecPomp/Clinrec/Activity/${clinrecId}/${activityId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getProfiles(): Promise<IControllerResponse<IConfiguratorValue[]>> {
    return this.fetch("/api/DictionaryClinrecPomp/Profiles", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getPompList(): Promise<IControllerResponse<{ id: number; label: string; name: string }[]>> {
    return this.fetch("/api/DictionaryClinrecPomp/List/Pomp", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createPompBasedOn(reqest: { name: string; idPomp: number }): Promise<IControllerResponse<string>> {
    return this.fetch("/api/DictionaryClinrecPomp/Pomp/CreateBasedOn", {
      method: "POST",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  generatePompDiagram(idGraph: number): Promise<IControllerResponse<any>> {
    return this.fetch(`/api/DictionaryClinrecPomp/pomp/diagram/generate/${idGraph}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updatePompDiagram(request: string): Promise<IControllerResponse<string>> {
    return this.fetch("/api/DictionaryClinrecPomp/Pomp/FromDiagram/Update", {
      method: "POST",
      body: request,
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createPomp(reqest: ICreatePomp): Promise<IControllerResponse<any>> {
    return this.fetch("/api/DictionaryClinrecPomp/Pomp", {
      method: "POST",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  editPomp(reqest: ICreatePomp): Promise<IControllerResponse<any>> {
    return this.fetch("/api/DictionaryClinrecPomp/Pomp", {
      method: "PUT",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deletePomp(id: number): Promise<IControllerResponse<any>> {
    return this.fetch(`/api/DictionaryClinrecPomp/Pomp/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createGraph(request: ICreateGraph): Promise<IControllerResponse<IDictionaryGraph>> {
    return this.fetch("/api/DictionaryClinrecPomp/Pomp/Graph", {
      method: "POST",
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateGraph(request: ICreateGraph): Promise<IControllerResponse<IDictionaryGraph>> {
    return this.fetch("/api/DictionaryClinrecPomp/Pomp/Graph", {
      method: "PUT",
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deleteGraph(pompId: number, id: number): Promise<IControllerResponse<IDictionaryGraph>> {
    return this.fetch(`/api/DictionaryClinrecPomp/Pomp/Graph/${pompId}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createPompStage(reqest: ICreatePompStage): Promise<IControllerResponse<IDictionaryClinrecStage>> {
    return this.fetch("/api/DictionaryClinrecPomp/Pomp/Stage", {
      method: "POST",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updatePompStage(reqest: IUpdatePompStage): Promise<IControllerResponse<IDictionaryClinrecStage>> {
    return this.fetch("/api/DictionaryClinrecPomp/Pomp/Stage", {
      method: "PUT",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deletePompStage(pompId: number, idGraph: number, stageCode: string): Promise<IControllerResponse<any>> {
    return this.fetch(`/api/DictionaryClinrecPomp/Pomp/Stage/${pompId}/${stageCode}/${idGraph}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createPompState(reqest: ICreatePompState): Promise<IControllerResponse<IDictionaryState>> {
    return this.fetch("/api/DictionaryClinrecPomp/Pomp/State", {
      method: "POST",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updatePompState(reqest: IUpdatePompState): Promise<IControllerResponse<IDictionaryState>> {
    return this.fetch("/api/DictionaryClinrecPomp/Pomp/State", {
      method: "PUT",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  sortPompStage(
    sortArray: { idParent: number; stageId: string; orderSort: number }[]
  ): Promise<IControllerResponse<string>> {
    return this.fetch("/api/DictionaryClinrecPomp/Pomp/Stage/sort", {
      method: "PUT",
      body: JSON.stringify(sortArray),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  sortClinrecStage(
    sortArray: { idParent: number; stageId: string; orderSort: number }[]
  ): Promise<IControllerResponse<string>> {
    return this.fetch("/api/DictionaryClinrecPomp/Clinrec/Stage/sort", {
      method: "PUT",
      body: JSON.stringify(sortArray),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deletePompState(pompId: number, stateId: number): Promise<IControllerResponse<any>> {
    return this.fetch(`/api/DictionaryClinrecPomp/Pomp/State/${pompId}/${stateId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createPompActivity(reqest: ICreatePompActivity): Promise<IControllerResponse<IDictionaryPompActivity>> {
    return this.fetch("/api/DictionaryClinrecPomp/Pomp/Activity", {
      method: "POST",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updatePompActivity(reqest: IUpdatePompActivity): Promise<IControllerResponse<IDictionaryPompActivity>> {
    return this.fetch("/api/DictionaryClinrecPomp/Pomp/Activity", {
      method: "PUT",
      body: JSON.stringify(reqest),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  deletePompActivity(pompId: number, activityId: number): Promise<IControllerResponse<any>> {
    return this.fetch(`/api/DictionaryClinrecPomp/Pomp/Activity/${pompId}/${activityId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}

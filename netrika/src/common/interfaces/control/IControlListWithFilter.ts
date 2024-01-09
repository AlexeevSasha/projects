import { IFilter } from "../IFilter";
import { IControlList } from "./IControlList";
import { IRegisterQualityCriterion } from "../register/IRegisterQualityCriterion";

export interface IControlListWithFilter extends IControlList {
  filters: IFilter[];
  qualityCriterion: IRegisterQualityCriterion[];
}

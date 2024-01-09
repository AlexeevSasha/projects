import { actionCreator } from "../../store/action/actionCreator";
import {
  IOrderQualityCriterionCurrentItem,
  IOrderQualityCriterionLIstItem,
} from "../../common/interfaces/order/IOrderQualityCriterionLIstItem";
import { IQualityCriterionListItem } from "../../common/interfaces/quality/IQualityCriterionListItem";
import { IClinrec } from "../../common/interfaces/clinrec/IClinrec";
import { ICustomSelect } from "../../common/interfaces/ISelect";
import { IPompResponse } from "../../common/interfaces/IPompResponse";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";

export class ProposalQualityRequirementsAction {
  static list = actionCreator.async<null, IPaginateItems<IOrderQualityCriterionLIstItem[]>, Error>(
    " Proposal/ProposalQualityRequirements_INFO"
  );
  static queryList = actionCreator.async<null, IQualityCriterionListItem[], Error>(
    " Proposal/ProposalQualityRequirements_queryList"
  );
  static fullItem = actionCreator.async<null, IOrderQualityCriterionCurrentItem, Error>(
    " Proposal/ProposalQualityRequirements_FULL_INFO"
  );
  static parentCriterion = actionCreator.async<null, ICustomSelect[], Error>(
    " Proposal/ProposalQualityRequirements_ParentCriterion"
  );
  static clearFullItem = actionCreator(" Proposal/clearFullItem");
  static clinrec = actionCreator.async<null, IClinrec[], Error>(" Proposal/clinrec");
  static pomp = actionCreator.async<null, IPompResponse[], Error>(" Proposal/pomp");
  static generateClinrec = actionCreator.async<null, IClinrec[], Error>(" Proposal/generateClinrec");
  static generatePomp = actionCreator.async<null, IPompResponse[], Error>(" Proposal/generatePomp");
  static sortingPompStage = actionCreator.async<null, IPompResponse[], Error>(" Proposal/sortingPompStage");
  static sortingClinrecStage = actionCreator.async<null, IClinrec[], Error>(" Proposal/sortingClinrecStage");
}

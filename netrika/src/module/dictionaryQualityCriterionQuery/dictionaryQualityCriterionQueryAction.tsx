import { actionCreator } from "../../store/action/actionCreator";
import { IQualityCriterionQueryDictionary } from "common/interfaces/quality/IQualityCriterionQueryDictionary";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";

export class DictionaryCriterionAction {
  static getCriterions = actionCreator.async<any, IPaginateItems<IQualityCriterionQueryDictionary[]>, Error>(
    "DictionaryCriterion/GET_CRITERIONS"
  );
  static deleteCriterion = actionCreator.async<number[], void, Error>("DictionaryCriterion/DELETE_CRITERION");
  static createCriterion = actionCreator.async<IQualityCriterionQueryDictionary, void, Error>(
    "DictionaryCriterion/CREATE_CRITERION"
  );
  static updateCriterion = actionCreator.async<IQualityCriterionQueryDictionary, void, Error>(
    "DictionaryCriterion/UPDATE_CRITERION"
  );
}

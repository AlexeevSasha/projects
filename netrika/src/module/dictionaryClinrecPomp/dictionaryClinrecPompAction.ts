import { actionCreator } from "../../store/action/actionCreator";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IDictionaryClinrecActivity, IDictionaryClinrec } from "../../common/interfaces/dictionary/IDictionaryClinrec";
import { IDictionaryPompActivity, IDictionaryPomp } from "../../common/interfaces/dictionary/IDictionaryPomp";
import { IInfoForCreateClinrec } from "../../common/interfaces/IInfoForCreateClinrec";
import { ICustomBaseSelect } from "../../common/interfaces/ISelect";

export class DictionaryClinrecPompAction {
  static clinrec = actionCreator.async<null, IPaginateItems<IDictionaryClinrec[]>, Error>(
    " Dictionary/ClinrecPomp/clinrec"
  );

  static updateClinrec = actionCreator.async<null, IDictionaryClinrec[], Error>(
    " Dictionary/ClinrecPomp/updateClinrec"
  );
  static infoForCreateClinrec = actionCreator.async<null, IInfoForCreateClinrec, Error>(
    " Dictionary/ClinrecPomp/infoForCreateClinrec"
  );
  static clinrecListForCreate = actionCreator.async<null, ICustomBaseSelect[], Error>(
    " Dictionary/ClinrecPomp/clinrecListForCreate"
  );
  static createClinrecBasedOn = actionCreator.async<null, any, Error>(" Dictionary/ClinrecPomp/createClinrecBasedOn");
  static deleteClinrec = actionCreator.async<null, any, Error>(" Dictionary/ClinrecPomp/deleteClinrec");
  static deletePomp = actionCreator.async<null, any, Error>(" Dictionary/ClinrecPomp/deletePomp");

  static pompList = actionCreator.async<null, ICustomBaseSelect[], Error>(" Dictionary/ClinrecPomp/pompList");
  static pompsProfiles = actionCreator.async<null, ICustomBaseSelect[], Error>(" Dictionary/ClinrecPomp/pompsProfiles");
  static createPomp = actionCreator.async<null, any, Error>(" Dictionary/ClinrecPomp/createPomp");
  static generatePomp = actionCreator.async<null, IDictionaryPomp[], Error>(" Dictionary/ClinrecPomp/generatePomp");

  static createGraph = actionCreator.async<null, any, Error>(" Dictionary/ClinrecPomp/createGraph");

  static createClinrecStage = actionCreator.async<null, any, Error>(" Dictionary/ClinrecPomp/createClinrecStage");
  static createClinrecThesis = actionCreator.async<null, any, Error>(" Dictionary/ClinrecPomp/createClinrecThesis");
  static createClinrecActivity = actionCreator.async<null, any, Error>(" Dictionary/ClinrecPomp/createClinrecActivity");

  static createPompStage = actionCreator.async<null, any, Error>(" Dictionary/ClinrecPomp/createPompStage");
  static createPompState = actionCreator.async<null, any, Error>(" Dictionary/ClinrecPomp/createPompState");
  static createPompActivity = actionCreator.async<null, any, Error>(" Dictionary/ClinrecPomp/createPompActivity");

  static pomp = actionCreator.async<null, IPaginateItems<IDictionaryPomp[]>, Error>(" Dictionary/ClinrecPomp/pomp");
  static updatePomp = actionCreator.async<null, IDictionaryPomp[], Error>(" Dictionary/ClinrecPomp/updatePomp");

  static sortingPompStage = actionCreator.async<null, IDictionaryPomp[], Error>(
    " Dictionary/ClinrecPomp/sortingPompStage"
  );
  static sortingClinrecStage = actionCreator.async<null, IDictionaryClinrec[], Error>(
    " Dictionary/ClinrecPomp/sortingClinrecStage"
  );
  static activityForModal = actionCreator<null | IDictionaryPompActivity[] | IDictionaryClinrecActivity[]>(
    " Dictionary/ClinrecPomp/activityForModal"
  );
  static listTimeoutUnit = actionCreator.async<null, ICustomBaseSelect[], Error>(
    " Dictionary/ClinrecPomp/listTimeoutUnit"
  );
}

import { RouterState } from "connected-react-router";
import { dictionaryNSIReducer } from "module/dictionaryNSI/dictionaryNSIReducer";
import { filterDiseaseCardEpicrisisReducer } from "module/diseaseCardEpicrisis/filterDiseaseCardEpicrisisReducer";
import { registerCheckListSessionReducer } from "module/registerCheckListSession/registerCheckListSessionReducer";
import { Action, combineReducers } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { authorizationReducer } from "../module/authorization/authorizationReducer";
import { dictionaryBizObjectReducer } from "../module/dictionaryBizObject/dictionaryBizObjectReducer";
import { dictionaryConfGroupReducer } from "../module/dictionaryConfGroup/dictionaryConfGroupReducer";
import { dictionaryConfBlockReducer } from "../module/dictionaryConfiguratorBlock/dictionaryConfBlockReducer";
import { dictionaryFieldDefaultReducer } from "../module/dictionaryFieldDefault/dictionaryFieldDefaultReducer";
import { dictionaryGroupsUserReducer } from "../module/dictionaryGroupsUser/dictionaryGroupsUserReducer";
import { dictionaryQualityCriterionQueryReducer } from "../module/dictionaryQualityCriterionQuery/dictionaryQualityCriterionQueryReducer";
import { dictionaryRegisterGroupReducer } from "../module/dictionaryRegisterGroup/dictionaryRegisterGroupReducer";
import { dictionaryRolesUserReducer } from "../module/dictionaryRolesUser/dictionaryRolesUserReducer";
import { dictionaryLogReducer } from "../module/dictionaryLog/dictionaryLogReducer";
import { diseaseCardEpicrisisReducer } from "../module/diseaseCardEpicrisis/diseaseCardEpicrisisReducer";
import { diseaseCardPatientManagementReducer } from "../module/diseaseCardPatientManagement/diseaseCardPatientManagementReducer";
import { diseaseMedicalCareCaseCardReducer } from "../module/diseaseMedicalCareCaseCard/diseaseMedicalCareCaseCardReducer";
import { filterConstructorReducer } from "../module/filter/filterConstructorReducer";
import { orderStatusReducer } from "../module/orderStatus/orderStatusReducer";
import { proposalCheckListReducer } from "../module/proposalCheckList/proposalCheckListReducer";
import { proposalContingentReducer } from "../module/proposalContingent/proposalContingentReducer";
import { proposalControlEventsReducer } from "../module/proposalControlEvents/proposalControlEventsReducer";
import { proposalCriterionReducer } from "../module/proposalCriterion/proposalCriterionReducer";
import { proposalDiseaseCardReducer } from "../module/proposalDiseaseCard/proposalDiseaseCardReducer";
import { proposalGeneralInfoReducer } from "../module/proposalGeneralInfo/proposalGeneralInfoReducer";
import { proposalListReducer } from "../module/proposalList/proposalListReducer";
import { proposalQualityRequirementsReducer } from "../module/proposalQualityRequirements/proposalQualityRequirementsReducer";
import { registerCheckListReducer } from "../module/registerCheckList/registerCheckListReducer";
import { registerContingentReducer } from "../module/registerContingent/registerContingentReducer";
import { registerCriterionReducer } from "../module/registerCriterion/registerCriterionReducer";
import { registerGeneralInfoReducer } from "../module/registerGeneralInfo/registerGeneralInfoReducer";
import { registerListReducer } from "../module/registerList/registerListReducer";
import { registerNameReducer } from "../module/registerName/registerNameReducer";
import { registerSettingsCheckListReducer } from "../module/registerSettingsCheckList/registerSettingsCheckListReducer";
import { usersListReducer } from "../module/usersList/usersListReducer";
import { dictionaryPatientReport } from "../module/dictionaryPatientReport/dictionaryPatientReportReducer";
import { configurationReducer } from "../module/configuration/configurationReducer";
import { dictionaryDisplayFieldReducer } from "../module/dictionaryDisplayField/dictionaryDisplayFieldReducer";
import { settingRouterReducer } from "../module/settingRouter/settingRouterReducer";
import { proposalGeneralInfoAttachmentsReducer } from "../module/proposalGeneralInfo/proposalGeneralInfoAttachmentsReducer";
import { registerCheckListFilterFieldsReducer } from "../module/registerCheckListFilterFields/registerCheckListFilterFieldsReducer";
import { dictionaryClinrecPompReducer } from "../module/dictionaryClinrecPomp/dictionaryClinrecPompReducer";
import { dictionaryIamScriptReducer } from "../module/dictionaryIamScript/dictionaryIamScriptReducer";
import { registerPlatformReducer } from "../module/registerPlatform/registerPlatformReducer";

export const mainReducer = combineReducers({
  authorization: authorizationReducer,
  configuration: configurationReducer,

  usersList: usersListReducer,

  dictionaryRegisterGroup: dictionaryRegisterGroupReducer,
  dictionaryQualityCriterionQuery: dictionaryQualityCriterionQueryReducer,
  dictionaryConfGroup: dictionaryConfGroupReducer,
  dictionaryBizObject: dictionaryBizObjectReducer,
  dictionaryFieldDefault: dictionaryFieldDefaultReducer,
  dictionaryConfBlock: dictionaryConfBlockReducer,
  dictionaryRolesUser: dictionaryRolesUserReducer,
  dictionaryGroupsUser: dictionaryGroupsUserReducer,
  dictionaryNSI: dictionaryNSIReducer,
  dictionaryLog: dictionaryLogReducer,
  dictionaryPatientReport: dictionaryPatientReport,
  dictionaryDisplayField: dictionaryDisplayFieldReducer,
  dictionaryClinrecPomp: dictionaryClinrecPompReducer,
  dictionaryIamScript: dictionaryIamScriptReducer,

  diseaseMedicalCareCaseCard: diseaseMedicalCareCaseCardReducer,
  diseaseCardPatientManagement: diseaseCardPatientManagementReducer,
  diseaseCardEpicrisis: diseaseCardEpicrisisReducer,
  filterDiseaseCardEpicrisis: filterDiseaseCardEpicrisisReducer,

  orderStatus: orderStatusReducer,
  proposalGeneralInfoAttachments: proposalGeneralInfoAttachmentsReducer,
  proposalGeneralInfo: proposalGeneralInfoReducer,
  proposalList: proposalListReducer,
  proposalContingent: proposalContingentReducer,
  proposalQualityRequirements: proposalQualityRequirementsReducer,
  proposalControlEvents: proposalControlEventsReducer,
  proposalCheckList: proposalCheckListReducer,
  proposalDiseaseCard: proposalDiseaseCardReducer,
  proposalCriterion: proposalCriterionReducer,

  registerName: registerNameReducer,
  registerCheckList: registerCheckListReducer,
  registerCheckListSession: registerCheckListSessionReducer,
  registerSettingsCheckList: registerSettingsCheckListReducer,
  registerList: registerListReducer,
  registerGeneralInfo: registerGeneralInfoReducer,
  registerCriterion: registerCriterionReducer,
  registerContingent: registerContingentReducer,
  registerPlatform: registerPlatformReducer,

  filterReducer: filterConstructorReducer,
  settingRouter: settingRouterReducer,

  registerCheckListFilterFields: registerCheckListFilterFieldsReducer,
});

export interface IAppState extends ReturnType<typeof mainReducer> {
  router: RouterState;
}

export interface IAppDispatch extends ThunkDispatch<IAppState, Error, Action> {}

export interface IThunkAction extends ThunkAction<Promise<void>, IAppState, Error, Action> {}

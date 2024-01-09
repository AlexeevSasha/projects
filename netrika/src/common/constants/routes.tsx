import { PageDictionaryGroupsUser } from "pages/Dictionary/PageDictionaryGroupsUser";
import { PageDictionaryRolesUser } from "pages/Dictionary/PageDictionaryRolesUser";
import { PageMedicalCareCaseCard } from "pages/DiseaseCard/PageMedicalCareCaseCard";
import { PagePatientDashboard } from "pages/DiseaseCard/PagePatientDashboard";
import { PageNSIList } from "pages/Nsi/PageNSIList";
import { PageProfile } from "pages/Profile/PageProfile";
import { PageCreateUser } from "pages/Users/PageCreateUser";
import { PageUsersList } from "pages/Users/PageUsersList";
import { PageDictionaryBizObject } from "../../pages/Dictionary/PageDictionaryBizObject";
import { PageDictionaryConfBlock } from "../../pages/Dictionary/PageDictionaryConfBlock";
import { PageDictionaryConfGroup } from "../../pages/Dictionary/PageDictionaryConfGroup";
import { PageDictionaryFieldDefault } from "../../pages/Dictionary/PageDictionaryFieldDefault";
import { PageDictionaryList } from "../../pages/Dictionary/PageDictionaryList";
import { PageDictionaryQualityCriterionQuery } from "../../pages/Dictionary/PageDictionaryQualityCriterionQuery";
import { PageDictionaryRegisterGroup } from "../../pages/Dictionary/PageDictionaryRegisterGroup";
import { PageIntegralDiseaseEpicrisis } from "../../pages/DiseaseCard/PageIntegralDiseaseEpicrisis";
import { PagePatientManagement } from "../../pages/DiseaseCard/PagePatientManagement";
import { PageProposalCheckList } from "../../pages/Proposal/PageProposalCheckList";
import { PageProposalContingent } from "../../pages/Proposal/PageProposalContingent";
import { PageProposalControlEvents } from "../../pages/Proposal/PageProposalControlEvents";
import { PageProposalCriterion } from "../../pages/Proposal/PageProposalCriterion";
import { PageProposalDiseaseInfo } from "../../pages/Proposal/PageProposalDiseaseInfo";
import { PageProposalGeneralInfo } from "../../pages/Proposal/PageProposalGeneralInfo";
import { PageProposalList } from "../../pages/Proposal/PageProposalList";
import { PageProposalQualityRequirements } from "../../pages/Proposal/PageProposalQualityRequirements";
import { PageRegisterCheckList } from "../../pages/Register/PageRegisterCheckList";
import { PageRegisterContingent } from "../../pages/Register/PageRegisterContingent";
import { PageRegisterGeneralInfo } from "../../pages/Register/PageRegisterGeneralInfo";
import { PageRegisterList } from "../../pages/Register/PageRegisterList";
import { PageDictionaryLog } from "../../pages/Dictionary/PageDictionaryLog";
import { PageDictionaryPatientReport } from "../../pages/Dictionary/PageDictionaryPatientReport";
import { PageDictionaryDisplayField } from "../../pages/Dictionary/PageDictionaryDisplayField";
import { PageSettingRouter } from "../../pages/SettingRouter/PageSettingRouter";
import { PageDictionaryClinrecPomp } from "../../pages/Dictionary/PageDictionaryClinrecPomp";
import { PageDictionaryIamScripts } from "../../pages/PageDictionaryIamScripts";
import { AppSettings } from "./appSettings";

export const routesRegister = [
  {
    path: "/register/:registerId/info",
    name: "RegisterInfo",
    component: PageRegisterGeneralInfo,
  },
  {
    path: "/register/:id/contingents",
    name: "Contingent",
    component: PageRegisterContingent,
  },
  {
    path: "/register/:id/checklist",
    name: "RegisterCheckList",
    component: PageRegisterCheckList,
  },
  {
    path: "/register",
    name: "Register",
    component: PageRegisterList,
  },
];

export const routerProposal = [
  {
    path: "/proposal/:id/info",
    name: "ProposalGeneralInformation",
    component: PageProposalGeneralInfo,
  },
  {
    path: "/proposal/:id/criterion",
    name: "ProposalCriterion",
    component: PageProposalCriterion,
  },
  {
    path: "/proposal/:id/contingent",
    name: "ProposalContingent",
    component: PageProposalContingent,
  },
  {
    path: "/proposal/:id/checklist",
    name: "ProposalCheckList",
    component: PageProposalCheckList,
  },
  {
    path: "/proposal/:id/diseaseCard",
    name: "ProposalDiseaseCard",
    component: PageProposalDiseaseInfo,
  },
  {
    path: "/proposal/:id/qualityRequirements",
    name: "ProposalRequirements",
    component: PageProposalQualityRequirements,
  },
  {
    path: "/proposal/:id/controlEvents",
    name: "ProposalControlEvents",
    component: PageProposalControlEvents,
  },
  {
    path: "/proposal",
    name: "ProposalGeneralInformation",
    component: PageProposalList,
  },
];

export const proposalInfo = {
  name: "PatientCard",
  path: (id: number) => `${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal/${id}/info`,
};

export const routesDiseaseCard = [
  {
    path: "/diseaseCard/:registerId/:patientId/patientManagement",
    name: "patientManagement",
    component: PagePatientManagement,
  },
  {
    path: "/diseaseCard/:registerId/:patientId/integralDiseaseEpicrisis",
    name: "integralDiseaseEpicrisis",
    component: PageIntegralDiseaseEpicrisis,
  },
  {
    path: "/diseaseCard/:registerId/:patientId/patientDashboard",
    name: "patientDashboard",
    component: PagePatientDashboard,
  },
  {
    path: "/diseaseCard/:registerId/:patientId/:caseBizKey/medicalCareCaseCard",
    name: "careCaseCard",
    component: PageMedicalCareCaseCard,
  },
];

export const diseaseCardInfo = {
  name: "PatientCard",
  path: (registerId: number, patientId: string) =>
    `${AppSettings.get("REACT_APP_ROOT_FOLDER")}/diseaseCard/${registerId}/${patientId}/integralDiseaseEpicrisis`,
};

export const routesDirectory = [
  {
    path: "/dictionary/Conf_group",
    name: "DictionaryConfGroup",
    component: PageDictionaryConfGroup,
  },
  {
    path: "/dictionary/Biz_object",
    name: "DictionaryBizObject",
    component: PageDictionaryBizObject,
  },
  {
    path: "/dictionary/Field_default",
    name: "DictionaryFieldDefault",
    component: PageDictionaryFieldDefault,
  },
  {
    path: "/dictionary/Conf_block",
    name: "DictionaryConfBlock",
    component: PageDictionaryConfBlock,
  },
  {
    path: "/dictionary/Quality_criterion_query",
    name: "DictionaryQualityCriterionQuery",
    component: PageDictionaryQualityCriterionQuery,
  },
  {
    path: "/dictionary/Register_group",
    name: "DictionaryRegisterGroup",
    component: PageDictionaryRegisterGroup,
  },
  {
    path: "/dictionary/Roles_user",
    name: "RolesUser",
    component: PageDictionaryRolesUser,
  },
  {
    path: "/dictionary/Group_user",
    name: "GroupUser",
    component: PageDictionaryGroupsUser,
  },
  {
    path: "/dictionary/Log",
    name: "Log",
    component: PageDictionaryLog,
  },
  {
    path: "/dictionary/PatientReport",
    name: "PatientReport",
    component: PageDictionaryPatientReport,
  },
  {
    path: "/dictionary/Dictionary_Display_Field",
    name: "Dictionary_Display_Field",
    component: PageDictionaryDisplayField,
  },
  {
    path: "/dictionary/Clinrec_Pomp",
    name: "Clinrec_Pomp",
    component: PageDictionaryClinrecPomp,
  },
  {
    path: "/dictionary/Scripts",
    name: "IamScripts",
    component: PageDictionaryIamScripts,
  },
  {
    path: "/dictionary",
    name: "DictionaryList",
    component: PageDictionaryList,
  },
];

export const routesUsers = [
  {
    path: "/users/create",
    name: "UserCreate",
    component: PageCreateUser,
  },
  {
    path: "/users/edit/:id",
    name: "UserEdit",
    component: PageCreateUser,
  },
  {
    path: "/users",
    name: "UserList",
    component: PageUsersList,
  },
];

export const routerProfile = [
  {
    path: "/profile/:id",
    name: "Profile",
    component: PageProfile,
  },
];

export const routerNSI = [
  {
    path: "/nsi",
    name: "NSI",
    component: PageNSIList,
  },
];

export const routesRegisterRouter = [
  {
    path: "/routerRegistry",
    name: "RouterRegistry",
    component: PageSettingRouter,
  },
];

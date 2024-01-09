import { IDownloadXls } from "module/registerCheckList/registerCheckListReducer";
import { ICustomSelect } from "common/interfaces/ISelect";
import { IOrderAttachment } from "../../common/interfaces/order/IOrderAttachment";
import { IOrder } from "../../common/interfaces/order/IOrder";
import { IRegisterGroup } from "../../common/interfaces/register/IRegisterGroup";
import { actionCreator } from "../../store/action/actionCreator";
import { IVimisSystem } from "../../common/interfaces/IVimisSystem";
import { IConfiguratorValue } from "../../common/interfaces/IConfiguratorValue";
import { OrderStatusEnum } from "../../common/interfaces/order/OrderStatusEnum";

export class ProposalGeneralInfoAction {
  static info = actionCreator.async<null, IOrder, Error>("Register/ProposalGeneralInfo_INFO");
  static medProfile = actionCreator.async<null, IConfiguratorValue[], Error>("Register/ProposalGeneralInfo_medProfile");

  static registerGroup = actionCreator.async<null, IRegisterGroup[], Error>(
    "Register/ProposalGeneralInfo_REGISTER_GROUP"
  );
  static vimisSystem = actionCreator.async<null, IVimisSystem[], Error>("Proposal/VimisSyst");

  static infoAttachments = actionCreator.async<null, IOrderAttachment[], Error>(
    "Register/ProposalGeneralInfoAttachments_INFO"
  );

  static avalableRegisterNetwork = actionCreator<ICustomSelect[]>("Register/AvalableRegisterNetwork");
  static getFile = actionCreator.async<null, IDownloadXls, Error>("Proposal/GET_FILE_TO_LOAD");
  static updateStatus = actionCreator.async<null, OrderStatusEnum, Error>("Proposal/UPDATE_STATUS");
}

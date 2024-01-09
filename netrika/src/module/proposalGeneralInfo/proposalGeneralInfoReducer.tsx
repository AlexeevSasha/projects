import { IDownloadXls } from "module/registerCheckList/registerCheckListReducer";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { IOrderAttachment } from "../../common/interfaces/order/IOrderAttachment";
import { IOrder } from "../../common/interfaces/order/IOrder";
import { ICustomSelect } from "../../common/interfaces/ISelect";
import { ProposalGeneralInfoAction } from "./proposalGeneralInfoAction";

export interface IState {
  order: IOrder;
  attachments: IOrderAttachment[];
  registerGroup: ICustomSelect[];
  loading: boolean;
  loadingOrderStatus: boolean;
  updateStatus: number;
  avalableRegisterNetworkList: ICustomSelect[];
  downloadFile: IDownloadXls;

  loadingFile: boolean;
  vimisSystemOption: ICustomSelect[];

  medProfileOptions: ICustomSelect[];
  loadingMedProfileOptions: boolean;
}

export const InitialState: IState = {
  order: {} as IOrder,
  attachments: [],
  registerGroup: [] as ICustomSelect[],
  vimisSystemOption: [] as ICustomSelect[],
  loading: false,
  loadingOrderStatus: false,

  updateStatus: 0,
  avalableRegisterNetworkList: [] as ICustomSelect[],
  downloadFile: { isFile: false, file: undefined },
  loadingFile: false,
  medProfileOptions: [] as ICustomSelect[],
  loadingMedProfileOptions: false,
};

export const proposalGeneralInfoReducer = reducerWithInitialState(InitialState)
  .case(ProposalGeneralInfoAction.info.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(ProposalGeneralInfoAction.info.done, (state, payload) => ({
    ...state,
    order: payload.result,
    loading: false,
  }))
  .case(ProposalGeneralInfoAction.info.failed, (state) => ({
    ...state,
    loading: false,
  }))
  .case(ProposalGeneralInfoAction.registerGroup.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(ProposalGeneralInfoAction.registerGroup.done, (state, payload) => ({
    ...state,
    loading: false,
    registerGroup: payload.result.map((item) => {
      return { value: item.id.toString(), label: item.name };
    }),
  }))
  .case(ProposalGeneralInfoAction.registerGroup.failed, (state) => ({
    ...state,
    loading: false,
  }))

  .case(ProposalGeneralInfoAction.avalableRegisterNetwork, (state, payload) => ({
    ...state,
    avalableRegisterNetworkList: payload,
  }))

  .case(ProposalGeneralInfoAction.getFile.started, (state) => ({
    ...state,
    loadingFile: true,
  }))
  .case(ProposalGeneralInfoAction.getFile.done, (state, payload) => ({
    ...state,
    downloadFile: payload.result,
    loadingFile: false,
  }))
  .case(ProposalGeneralInfoAction.getFile.failed, (state) => ({
    ...state,
    loadingFile: false,
  }))
  .case(ProposalGeneralInfoAction.vimisSystem.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(ProposalGeneralInfoAction.vimisSystem.done, (state, payload) => ({
    ...state,
    loading: false,
    vimisSystemOption: payload.result.map((item) => {
      return { label: item.name, value: item.code };
    }),
  }))
  .case(ProposalGeneralInfoAction.vimisSystem.failed, (state) => ({
    ...state,
    loading: false,
  }))
  .case(ProposalGeneralInfoAction.medProfile.started, (state) => ({
    ...state,
    loadingMedProfileOptions: true,
  }))
  .case(ProposalGeneralInfoAction.medProfile.done, (state, payload) => ({
    ...state,
    medProfileOptions: payload.result.map((item) => {
      return { label: item.description, value: item.code };
    }),
    loadingMedProfileOptions: false,
  }))
  .case(ProposalGeneralInfoAction.medProfile.failed, (state) => ({
    ...state,
    loadingMedProfileOptions: false,
  }))
  .case(ProposalGeneralInfoAction.updateStatus.started, (state) => ({
    ...state,
    loadingOrderStatus: true,
  }))
  .case(ProposalGeneralInfoAction.updateStatus.done, (state, payload) => ({
    ...state,
    order: {
      ...state.order,
      status: payload.result,
    },
    loadingOrderStatus: false,
  }))
  .case(ProposalGeneralInfoAction.updateStatus.failed, (state) => ({
    ...state,
    loadingOrderStatus: false,
  }))
  .build();

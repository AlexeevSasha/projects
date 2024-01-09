import { reducerWithInitialState } from "typescript-fsa-reducers";
import { IOrderAttachment } from "../../common/interfaces/order/IOrderAttachment";
import { ProposalGeneralInfoAction } from "./proposalGeneralInfoAction";

export interface IState {
  attachments: IOrderAttachment[];
  loadingAttachments: boolean;
}

export const InitialState: IState = {
  attachments: [],
  loadingAttachments: true,
};

export const proposalGeneralInfoAttachmentsReducer = reducerWithInitialState(InitialState)
  .case(ProposalGeneralInfoAction.infoAttachments.started, (state) => ({
    ...state,
    loadingAttachments: true,
  }))
  .case(ProposalGeneralInfoAction.infoAttachments.done, (state, payload) => ({
    ...state,
    loadingAttachments: false,
    attachments: payload.result,
  }))
  .case(ProposalGeneralInfoAction.infoAttachments.failed, (state) => ({
    ...state,
    loadingAttachments: false,
  }))

  .build();

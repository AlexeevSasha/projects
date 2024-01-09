import { CommonToolsApiRequest } from "api/сommonToolsApiRequest";
import { OrderApiRequest } from "api/orderApiRequest";
import { OrderAttachmentApiRequest } from "api/orderAttachmentApiRequest";
import { IOrderAttachment } from "../../common/interfaces/order/IOrderAttachment";
import { IOrder } from "../../common/interfaces/order/IOrder";
import { IOrderStatusTrigger } from "../../common/interfaces/order/IOrderStatusTrigger";
import { IAppDispatch, IAppState, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { OrderStatusAction } from "../orderStatus/orderStatusAction";
import { ProposalGeneralInfoAction } from "./proposalGeneralInfoAction";
import { ProposalQualityRequirementsAction } from "../proposalQualityRequirements/proposalQualityRequirementsAction";
import { DictionaryClinrecPompApiRequest } from "../../api/dictionaryClinrecPompApiRequest";
import { DictionaryClinrecPompThunk } from "../dictionaryClinrecPomp/dictionaryClinrecPompThunk";

export const ProposalGeneralInfoThunk = {
  getInfo(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalGeneralInfoAction.info.started(null));
      try {
        const result = await new OrderApiRequest().getOrder(id);
        if (result.isError) {
          throw result;
        }
        dispatch(ProposalGeneralInfoAction.info.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalGeneralInfoAction.info.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  getRegisterGroup(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalGeneralInfoAction.registerGroup.started(null));
      try {
        const result = await new OrderApiRequest().getRegisterGroups();
        if (result.isError) {
          throw result;
        }
        dispatch(ProposalGeneralInfoAction.registerGroup.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalGeneralInfoAction.registerGroup.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  getInfoAttachment(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalGeneralInfoAction.infoAttachments.started(null));
      try {
        const result = await new OrderAttachmentApiRequest().getOrderAttachments(id);
        if (result.isError) {
          throw result;
        }
        dispatch(ProposalGeneralInfoAction.infoAttachments.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalGeneralInfoAction.infoAttachments.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  save(data: IOrder, callback?: () => void): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderApiRequest().updateOrder(data.id, data);
        if (result?.isError) {
          throw result;
        }
        successPopup("Заявка успешно обновлена.");
        if (callback) callback();
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  updateStatus(id: number, status: IOrderStatusTrigger): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderApiRequest().updateStatus(id, status);
        if (result?.isError) {
          throw result;
        }
        successPopup("Статус успешно обновлён.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  updateStatusGeneralInfo(id: number, status: IOrderStatusTrigger): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(ProposalGeneralInfoAction.updateStatus.started(null));

      try {
        const result = await new OrderApiRequest().updateStatus(id, status);
        if (result?.isError) {
          throw result;
        }
        dispatch(ProposalGeneralInfoAction.updateStatus.done({ params: null, result: result.result }));
        const orderName = getState().orderStatus.status.orderName;

        dispatch(
          OrderStatusAction.status.done({ params: null, result: { orderName: orderName, orderStatus: result.result } })
        );

        successPopup("Статус успешно обновлён.");
      } catch (error) {
        dispatch(ProposalGeneralInfoAction.updateStatus.failed(error));

        errorPopup(error.message);
      }
    };
  },

  addAttachment(data: IOrderAttachment, file: File): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderAttachmentApiRequest().addOrderAttachment(data, file);
        if (result?.isError) {
          throw result;
        }
        successPopup("Файл успешно добавлен.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  deleteAttachment(id: number): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderAttachmentApiRequest().deleteOrderAttachment(id);
        if (result?.isError) {
          throw result;
        }
        successPopup("Файл успешно удалён.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  getOrderStatus(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(OrderStatusAction.status.started(null));
      try {
        const result = await new OrderApiRequest().getOrderStatus(id);
        if (result?.isError) {
          throw result;
        }
        dispatch(OrderStatusAction.status.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(OrderStatusAction.status.failed(error));
        errorPopup(error.message);
      }
    };
  },
  getVimisSystem(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalGeneralInfoAction.vimisSystem.started(null));
      try {
        const result = await new OrderApiRequest().getVimisSyst();
        if (result?.isError) {
          throw result;
        }
        dispatch(ProposalGeneralInfoAction.vimisSystem.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalGeneralInfoAction.vimisSystem.failed(error));
        errorPopup(error.message);
      }
    };
  },

  getEnableNsiOption(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        const result = await new OrderApiRequest().getEnableNsiOption();
        if (result.isError) {
          throw result;
        }
        dispatch(OrderStatusAction.enableNsiOption(result.result));
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  getAvalableRegisterNetwork(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        const request = await new CommonToolsApiRequest().getAvalableRegisterNetwork();
        if (request.isError) {
          throw request;
        }
        const result = [
          { value: -1, label: "..." },
          ...request.result.map((item) => ({ value: item.id, label: item.name })),
        ];

        dispatch(ProposalGeneralInfoAction.avalableRegisterNetwork(result));
      } catch (error) {
        errorPopup(error.message || "Ошибка при получении данных заявки.");
      }
    };
  },

  downloadFile(params: number, name?: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        dispatch(ProposalGeneralInfoAction.getFile.started(null));
        const result = await new OrderAttachmentApiRequest().downloadOrderAttachment(params);
        if (result?.isError) {
          throw result;
        }
        dispatch(
          ProposalGeneralInfoAction.getFile.done({
            params: null,
            result: { isFile: true, file: result, name },
          })
        );
      } catch (error) {
        errorPopup(error.message);
        dispatch(ProposalGeneralInfoAction.getFile.failed(error));
      }
    };
  },
  updatePompDiagram(data: {
    pompGraphIndex: number;
    pompGraphId: number;
    request: string;
    pompId: number;
  }): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      const statePomp = getState().proposalQualityRequirements.orderPomp;

      try {
        await new OrderApiRequest("", "text/plain").updatePompDiagram(data.pompGraphId, data.request);
        const changedPomp = {
          ...statePomp[data.pompId],
          graphs: statePomp[data.pompId]?.graphs.map((item, index) =>
            index === data.pompGraphIndex
              ? { ...statePomp[data.pompId].graphs[data.pompGraphIndex], xmlDiagramContent: data.request }
              : item
          ),
        };
        dispatch(
          ProposalQualityRequirementsAction.generatePomp.done({
            params: null,
            result: statePomp.map((item, index) => (index === data.pompId ? changedPomp : item)),
          })
        );
        successPopup("Диаграмма успешно сохранена");

        await dispatch(DictionaryClinrecPompThunk.getDictionaryPompsStage(data.pompId, data.pompGraphId));
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  deleteOrderClinrec(orderId: number, clinrecId: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        const stateClinrec = getState().proposalQualityRequirements.orderClinrec;
        const result = await new OrderApiRequest().deleteOrderClinrec(orderId, clinrecId);
        if (result.isError) {
          throw result;
        }
        dispatch(
          ProposalQualityRequirementsAction.clinrec.done({
            params: null,
            result: stateClinrec.filter((item) => item.idClinrec !== clinrecId),
          })
        );
        successPopup(result.message);
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
  deleteOrderPomp(orderId: number, pompId: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      const statePomp = getState().proposalQualityRequirements.orderPomp;

      try {
        const result = await new OrderApiRequest().deleteOrderPomp(orderId, pompId);
        if (result.isError) {
          throw result;
        }

        dispatch(
          ProposalQualityRequirementsAction.pomp.done({
            params: null,
            result: statePomp.filter((item) => item.idPomp !== pompId),
          })
        );
        successPopup(result.message);
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
  getOrderMedProfiles(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalGeneralInfoAction.medProfile.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().getProfiles();
        if (result.isError) {
          throw result;
        }
        dispatch(ProposalGeneralInfoAction.medProfile.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalGeneralInfoAction.medProfile.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
};

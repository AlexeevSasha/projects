import { IAppDispatch, IAppState, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { DictionaryClinrecPompApiRequest } from "../../api/dictionaryClinrecPompApiRequest";
import { DictionaryClinrecPompAction } from "./dictionaryClinrecPompAction";
import { successPopup } from "../../common/helpers/toast/success";
import {
  ICreateClinrecActivity,
  ICreateClinrec,
  ICreateClinrecStage,
  ICreateClinrecThesis,
  IDictionaryClinrecStage,
  IUpdateClinrecActivity,
  IUpdateClinrecStage,
  IUpdateClinrecThesis,
} from "../../common/interfaces/dictionary/IDictionaryClinrec";
import {
  ICreateGraph,
  ICreatePompActivity,
  ICreatePomp,
  ICreatePompStage,
  ICreatePompState,
  IDictionaryGraph,
  IDictionaryPomp,
  IDictionaryStage,
  IUpdatePompActivity,
  IUpdatePompStage,
  IUpdatePompState,
} from "../../common/interfaces/dictionary/IDictionaryPomp";

export const DictionaryClinrecPompThunk = {
  getTimeoutUnit(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.listTimeoutUnit.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().getTimeoutUnit();
        if (result.isError) {
          throw result;
        }
        dispatch(
          DictionaryClinrecPompAction.listTimeoutUnit.done({
            params: null,
            result: result.result.map((i) => ({ value: i.code, label: i.description })),
          })
        );
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.listTimeoutUnit.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  getDictionaryClinrec(pageIndex: number, pageSize: number, searchName: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.clinrec.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().getDictionaryClinrec(
          pageIndex,
          pageSize,
          searchName
        );
        if (result?.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.clinrec.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.clinrec.failed(error));
        errorPopup(error.message);
      }
    };
  },

  getDictionaryClinrecsStage(clinrecId: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        const result = await new DictionaryClinrecPompApiRequest().getDictionaryClinrecsStage(clinrecId);
        if (result?.isError) {
          throw result;
        }
        const clinrec = getState().dictionaryClinrecPomp.clinrec;
        const newPomps = clinrec.map((p) => (p.idClinrec === clinrecId ? { ...p, stages: result.result } : p));

        dispatch(
          DictionaryClinrecPompAction.updateClinrec.done({
            params: null,
            result: newPomps,
          })
        );
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.updateClinrec.failed(error));
        errorPopup(error.message);
      }
    };
  },

  getDictionaryClinrecsThesis(clinrecId: number, stageCode: string): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        const result = await new DictionaryClinrecPompApiRequest().getDictionaryClinrecsThesis(stageCode, clinrecId);
        if (result?.isError) {
          throw result;
        }
        const clinrec = getState().dictionaryClinrecPomp.clinrec;
        const newPomps = clinrec.map((p) =>
          p.idClinrec === clinrecId
            ? {
                ...p,
                stages:
                  p.stages?.map((st) =>
                    st.stageCode === stageCode
                      ? {
                          ...st,
                          theses: result.result,
                        }
                      : st
                  ) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updateClinrec.done({
            params: null,
            result: newPomps,
          })
        );
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.updateClinrec.failed(error));
        errorPopup(error.message);
      }
    };
  },
  getDictionaryClinrecsActivity(clinrecId: number, stageCode: string, thesisCode: string): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        const result = await new DictionaryClinrecPompApiRequest().getDictionaryClinrecsActivity(thesisCode);
        if (result?.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.activityForModal(result.result));

        const clinrec = getState().dictionaryClinrecPomp.clinrec;

        const newPomps = clinrec.map((p) =>
          p.idClinrec === clinrecId
            ? {
                ...p,
                stages:
                  p.stages?.map((st) =>
                    st.stageCode === stageCode
                      ? {
                          ...st,
                          theses:
                            st.theses?.map((t) =>
                              t.thesisCode === thesisCode ? { ...t, activities: result.result } : t
                            ) || null,
                        }
                      : st
                  ) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updateClinrec.done({
            params: null,
            result: newPomps,
          })
        );
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.updateClinrec.failed(error));
        errorPopup(error.message);
      }
    };
  },

  getDictionaryPomp(pageIndex: number, pageSize: number, searchName: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.pomp.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().getDictionaryPomp(pageIndex, pageSize, searchName);
        if (result?.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.pomp.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.pomp.failed(error));
        errorPopup(error.message);
      }
    };
  },
  getDictionaryPompsGraph(pompId: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        const result = await new DictionaryClinrecPompApiRequest().getDictionaryPompsGraph(pompId);
        if (result?.isError) {
          throw result;
        }
        const pomps = getState().dictionaryClinrecPomp.pomp;
        const newPomps = pomps.map((p) => (p.idPomp === pompId ? { ...p, graphs: result.result } : p));

        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: newPomps,
          })
        );
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.updatePomp.failed(error));
        errorPopup(error.message);
      }
    };
  },
  getDictionaryPompsStage(pompId: number, graphId: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        const result = await new DictionaryClinrecPompApiRequest().getDictionaryPompsStage(graphId);
        if (result?.isError) {
          throw result;
        }
        const pomps = getState().dictionaryClinrecPomp.pomp;
        const newPomps = pomps.map((p) =>
          p.idPomp === pompId
            ? {
                ...p,
                graphs:
                  p.graphs?.map((g) =>
                    g.idGraph === graphId
                      ? {
                          ...g,
                          pompStages: result.result,
                        }
                      : g
                  ) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: newPomps,
          })
        );
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.updatePomp.failed(error));
        errorPopup(error.message);
      }
    };
  },
  getDictionaryPompsState(pompId: number, graphId: number, stageCode: string): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        const result = await new DictionaryClinrecPompApiRequest().getDictionaryPompsState(graphId, stageCode);
        if (result?.isError) {
          throw result;
        }
        const pomps = getState().dictionaryClinrecPomp.pomp;
        const newPomps = pomps.map((p) =>
          p.idPomp === pompId
            ? {
                ...p,
                graphs:
                  p.graphs?.map((g) =>
                    g.idGraph === graphId
                      ? {
                          ...g,
                          pompStages:
                            g.pompStages?.map((stg) =>
                              stg.stageCode === stageCode ? { ...stg, pompStates: result.result } : stg
                            ) || null,
                        }
                      : g
                  ) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: newPomps,
          })
        );
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.updatePomp.failed(error));
        errorPopup(error.message);
      }
    };
  },
  getDictionaryPompsActivity(pompId: number, graphId: number, stageCode: string, stateId: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        const result = await new DictionaryClinrecPompApiRequest().getDictionaryPompsActivity(stateId);
        if (result?.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.activityForModal(result.result));
        const pomps = getState().dictionaryClinrecPomp.pomp;
        const newPomps = pomps.map((p) =>
          p.idPomp === pompId
            ? {
                ...p,
                graphs:
                  p.graphs?.map((g) =>
                    g.idGraph === graphId
                      ? {
                          ...g,
                          pompStages:
                            g.pompStages?.map((stg) =>
                              stg.stageCode === stageCode
                                ? {
                                    ...stg,
                                    pompStates:
                                      stg.pompStates?.map((stt) =>
                                        stt.idState === stateId
                                          ? {
                                              ...stt,
                                              activities: result.result || [],
                                            }
                                          : stt
                                      ) || null,
                                  }
                                : stg
                            ) || null,
                        }
                      : g
                  ) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: newPomps,
          })
        );
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.updatePomp.failed(error));
        errorPopup(error.message);
      }
    };
  },

  getInfoForCreateClinrec(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.infoForCreateClinrec.started(null));
      try {
        const result = await Promise.all([
          new DictionaryClinrecPompApiRequest().getDictionaryClinrecPompAgeCategory(),
          new DictionaryClinrecPompApiRequest().getDictionaryClinrecPompClinrecStatus(),
          new DictionaryClinrecPompApiRequest().getDictionaryClinrecPompClinrecUsageStatus(),
        ]);

        if (result[0].isError) {
          throw result[0];
        }
        if (result[1].isError) {
          throw result[1];
        }
        if (result[2].isError) {
          throw result[2];
        }

        dispatch(
          DictionaryClinrecPompAction.infoForCreateClinrec.done({
            params: null,
            result: {
              ageCategory: result[0].result.map((item) => ({ value: item.code, label: item.description })),
              clinrecStatus: [
                { value: "null", label: "Не выбрано" },
                ...result[1].result.map((item) => ({ value: item.code, label: item.description })),
              ],
              clinrecUsageStatus: [
                { value: "null", label: "Не выбрано" },
                ...result[2].result.map((item) => ({ value: item.code, label: item.description })),
              ],
            },
          })
        );
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.infoForCreateClinrec.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  getClinrecListForCreate(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.clinrecListForCreate.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().getClinrecList();
        if (result.isError) {
          throw result;
        }
        dispatch(
          DictionaryClinrecPompAction.clinrecListForCreate.done({
            params: null,
            result: result.result.map((item) => ({ ...item, value: item.id, clinrecName: item.clinrecName })),
          })
        );
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.infoForCreateClinrec.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
  createClinrecBasedOn(idClinrec: number, name: string, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createClinrecBasedOn.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().createClinrecBasedOn({
          idClinrec,
          name,
        });

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createClinrecBasedOn.done({ params: null }));
        successPopup(result.message);
        onClose();
        await dispatch(DictionaryClinrecPompThunk.getDictionaryClinrec(1, 25, ""));
        await dispatch(DictionaryClinrecPompThunk.getClinrecListForCreate());
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createClinrecBasedOn.done(error));

        errorPopup(error.message);
      }
    };
  },
  createClinrec(data: ICreateClinrec, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createClinrecBasedOn.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().createClinrec(data);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createClinrecBasedOn.done({ params: null }));
        successPopup(result.message);
        onClose();
        await dispatch(DictionaryClinrecPompThunk.getDictionaryClinrec(1, 25, ""));
        await dispatch(DictionaryClinrecPompThunk.getClinrecListForCreate());
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createClinrecBasedOn.done(error));

        errorPopup(error.message);
      }
    };
  },
  editClinrec(data: ICreateClinrec, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createClinrecBasedOn.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().editClinrec(data);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createClinrecBasedOn.done({ params: null }));
        successPopup(result.message);
        onClose();
        await dispatch(DictionaryClinrecPompThunk.getDictionaryClinrec(1, 25, ""));
        await dispatch(DictionaryClinrecPompThunk.getClinrecListForCreate());
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createClinrecBasedOn.done(error));

        errorPopup(error.message);
      }
    };
  },
  deleteClinrec(id: number, pageCount: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.deleteClinrec.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().deleteClinrec(id);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.deleteClinrec.done({ params: null }));
        successPopup(result.message);
        await dispatch(DictionaryClinrecPompThunk.getDictionaryClinrec(1, pageCount, ""));
        await dispatch(DictionaryClinrecPompThunk.getClinrecListForCreate());
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.deleteClinrec.failed(error));
        errorPopup(error.message);
      }
    };
  },

  createClinrecStage(data: ICreateClinrecStage, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createClinrecStage.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().createClinrecStage(data);

        if (result.isError) {
          throw result;
        }
        const clinrec = getState().dictionaryClinrecPomp.clinrec;
        const newClinrec = clinrec.map((p) =>
          p.idClinrec === data.idClinrec
            ? {
                ...p,
                stages: null,
              }
            : p
        );
        dispatch(
          DictionaryClinrecPompAction.updateClinrec.done({
            params: null,
            result: newClinrec,
          })
        );
        dispatch(DictionaryClinrecPompAction.createClinrecStage.done({ params: null }));
        successPopup(result.message);
        onClose();
        await dispatch(DictionaryClinrecPompThunk.getDictionaryClinrecsStage(data.idClinrec));
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createClinrecStage.failed(error));

        errorPopup(error.message);
      }
    };
  },
  updateClinrecStage(data: IUpdateClinrecStage, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createClinrecStage.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().updateClinrecStage(data);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createClinrecStage.done({ params: null }));
        const clinrec = getState().dictionaryClinrecPomp.clinrec;
        const newClinrec = clinrec.map((p) =>
          p.idClinrec === data.idClinrec
            ? {
                ...p,
                stages:
                  p.stages?.map((g) =>
                    g.stageCode === data.currentStageCode
                      ? { ...g, stageName: result.result.stageName, stageCode: result.result.stageCode }
                      : { ...g }
                  ) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updateClinrec.done({
            params: null,
            result: newClinrec,
          })
        );
        successPopup(result.message);
        onClose();
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createClinrecStage.failed(error));

        errorPopup(error.message);
      }
    };
  },
  deleteClinrecStage(idClinrec: number, stageCode: string): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createClinrecStage.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().deleteClinrecStage(idClinrec, stageCode);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createClinrecStage.done({ params: null }));
        const clinrec = getState().dictionaryClinrecPomp.clinrec;
        const newClinrec = clinrec.map((p) =>
          p.idClinrec === idClinrec
            ? {
                ...p,
                stages: p.stages?.filter((g) => g.stageCode !== stageCode) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updateClinrec.done({
            params: null,
            result: newClinrec,
          })
        );
        successPopup(result.message);
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createClinrecStage.failed(error));

        errorPopup(error.message);
      }
    };
  },

  createClinrecThesis(data: ICreateClinrecThesis, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createClinrecThesis.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().createClinrecThesis(data);

        if (result.isError) {
          throw result;
        }
        const clinrec = getState().dictionaryClinrecPomp.clinrec;
        const newClinrec = clinrec.map((p) =>
          p.idClinrec === data.idClinrec
            ? {
                ...p,
                stages:
                  p.stages?.map((s) =>
                    s.stageCode === data.stageCode
                      ? {
                          ...s,
                          theses: null,
                        }
                      : s
                  ) || null,
              }
            : p
        );
        dispatch(
          DictionaryClinrecPompAction.updateClinrec.done({
            params: null,
            result: newClinrec,
          })
        );
        dispatch(DictionaryClinrecPompAction.createClinrecThesis.done({ params: null }));
        successPopup(result.message);
        onClose();
        await dispatch(DictionaryClinrecPompThunk.getDictionaryClinrecsThesis(data.idClinrec, data.stageCode));
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createClinrecThesis.failed(error));

        errorPopup(error.message);
      }
    };
  },
  updateClinrecThesis(data: IUpdateClinrecThesis, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createClinrecThesis.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().updateClinrecThesis(data);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createClinrecThesis.done({ params: null }));
        const clinrec = getState().dictionaryClinrecPomp.clinrec;
        const newClinrec = clinrec.map((p) =>
          p.idClinrec === data.idClinrec
            ? {
                ...p,
                stages:
                  p.stages?.map((s) =>
                    s.stageCode === data.stageCode
                      ? {
                          ...s,
                          theses:
                            s.theses?.map((t) =>
                              t.thesisCode === data.thesisCode
                                ? {
                                    ...result.result,
                                    activities: t.activities,
                                  }
                                : t
                            ) || null,
                        }
                      : { ...s }
                  ) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updateClinrec.done({
            params: null,
            result: newClinrec,
          })
        );
        successPopup(result.message);
        onClose();
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createClinrecThesis.failed(error));

        errorPopup(error.message);
      }
    };
  },
  deleteClinrecThesis(idClinrec: number, stageCode: string, thesisCode: string): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createClinrecThesis.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().deleteClinrecThesis(idClinrec, thesisCode);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createClinrecThesis.done({ params: null }));
        const clinrec = getState().dictionaryClinrecPomp.clinrec;
        const newClinrec = clinrec.map((p) =>
          p.idClinrec === idClinrec
            ? {
                ...p,
                stages:
                  p.stages?.map((g) =>
                    g.stageCode === stageCode
                      ? { ...g, theses: g.theses?.filter((t) => t.thesisCode !== thesisCode) || null }
                      : g
                  ) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updateClinrec.done({
            params: null,
            result: newClinrec,
          })
        );
        successPopup(result.message);
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createClinrecThesis.failed(error));

        errorPopup(error.message);
      }
    };
  },
  createClinrecActivity(stageCode: string, data: ICreateClinrecActivity, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createClinrecActivity.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().createClinrecActivity(data);

        if (result.isError) {
          throw result;
        }
        const clinrec = getState().dictionaryClinrecPomp.clinrec;
        const newClinrec = clinrec.map((p) =>
          p.idClinrec === data.clinrecId
            ? {
                ...p,
                stages:
                  p.stages?.map((s) =>
                    s.stageCode === stageCode
                      ? {
                          ...s,
                          theses:
                            s.theses?.map((th) =>
                              th.thesisCode === data.thesisClinrecCode ? { ...th, activities: null } : th
                            ) || null,
                        }
                      : s
                  ) || null,
              }
            : p
        );
        dispatch(
          DictionaryClinrecPompAction.updateClinrec.done({
            params: null,
            result: newClinrec,
          })
        );
        dispatch(DictionaryClinrecPompAction.createClinrecActivity.done({ params: null }));
        successPopup(result.message);
        onClose();
        await dispatch(
          DictionaryClinrecPompThunk.getDictionaryClinrecsActivity(data.clinrecId, stageCode, data.thesisClinrecCode)
        );
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createClinrecActivity.failed(error));

        errorPopup(error.message);
      }
    };
  },
  updateClinrecActivity(stageCode: string, data: IUpdateClinrecActivity, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createClinrecActivity.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().updateClinrecActivity(data);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createClinrecActivity.done({ params: null }));
        const clinrec = getState().dictionaryClinrecPomp.clinrec;
        const newClinrec = clinrec.map((p) =>
          p.idClinrec === data.clinrecId
            ? {
                ...p,
                stages:
                  p.stages?.map((s) =>
                    s.stageCode === stageCode
                      ? {
                          ...s,
                          theses:
                            s.theses?.map((t) =>
                              t.thesisCode === data.thesisClinrecCode
                                ? {
                                    ...t,
                                    activities:
                                      t.activities?.map((act) =>
                                        act.id === data.idClinrecActivity ? result.result : act
                                      ) || null,
                                  }
                                : t
                            ) || null,
                        }
                      : { ...s }
                  ) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updateClinrec.done({
            params: null,
            result: newClinrec,
          })
        );
        successPopup(result.message);
        onClose();
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createClinrecActivity.failed(error));

        errorPopup(error.message);
      }
    };
  },
  deleteClinrecActivity(idClinrec: number, stageCode: string, thesisCode: string, activityId: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createClinrecActivity.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().deleteClinrecActivity(idClinrec, activityId);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createClinrecActivity.done({ params: null }));
        const clinrec = getState().dictionaryClinrecPomp.clinrec;
        const newClinrec = clinrec.map((p) =>
          p.idClinrec === idClinrec
            ? {
                ...p,
                stages:
                  p.stages?.map((g) =>
                    g.stageCode === stageCode
                      ? {
                          ...g,
                          theses:
                            g.theses?.map((t) =>
                              t.thesisCode === thesisCode
                                ? {
                                    ...t,
                                    activities: t.activities?.filter((act) => act.id !== activityId) || null,
                                  }
                                : t
                            ) || null,
                        }
                      : g
                  ) || null,
              }
            : p
        );
        dispatch(
          DictionaryClinrecPompAction.updateClinrec.done({
            params: null,
            result: newClinrec,
          })
        );
        successPopup(result.message);
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createClinrecActivity.failed(error));
        errorPopup(error.message);
      }
    };
  },

  getPompList(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.pompList.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().getPompList();

        if (result.isError) {
          throw result;
        }

        dispatch(
          DictionaryClinrecPompAction.pompList.done({
            params: null,
            result: result.result.map((r) => ({ value: r.id, label: r.label, name: r.name })),
          })
        );
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.pompList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
  getPompProfiles(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.pompsProfiles.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().getProfiles();

        if (result.isError) {
          throw result;
        }

        dispatch(
          DictionaryClinrecPompAction.pompsProfiles.done({
            params: null,
            result: result.result.map((r) => ({ value: r.code, label: r.description, name: r.description })),
          })
        );
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.pompsProfiles.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
  createPompBasedOn(idPomp: number, name: string, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createPomp.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().createPompBasedOn({
          name,
          idPomp,
        });

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createPomp.done({ params: null }));
        successPopup(result.message);
        onClose();
        await dispatch(DictionaryClinrecPompThunk.getDictionaryPomp(1, 25, ""));
        await dispatch(DictionaryClinrecPompThunk.getPompList());
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createPomp.failed(error));

        errorPopup(error.message);
      }
    };
  },
  createPomp(data: ICreatePomp, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createPomp.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().createPomp(data);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createPomp.done({ params: null }));
        successPopup(result.message);
        onClose();
        await dispatch(DictionaryClinrecPompThunk.getDictionaryPomp(1, 25, ""));
        await dispatch(DictionaryClinrecPompThunk.getPompList());
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createPomp.failed(error));

        errorPopup(error.message);
      }
    };
  },
  editPomp(data: ICreatePomp, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createPomp.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().editPomp(data);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createPomp.done({ params: null }));
        successPopup(result.message);
        onClose();
        await dispatch(DictionaryClinrecPompThunk.getDictionaryPomp(1, 25, ""));
        await dispatch(DictionaryClinrecPompThunk.getPompList());
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createPomp.failed(error));

        errorPopup(error.message);
      }
    };
  },

  deletePomp(id: number, pageCount: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.deletePomp.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().deletePomp(id);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.deletePomp.done({ params: null }));
        successPopup(result.message);
        await dispatch(DictionaryClinrecPompThunk.getDictionaryPomp(1, pageCount, ""));
        await dispatch(DictionaryClinrecPompThunk.getPompList());
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.deletePomp.failed(error));
        errorPopup(error.message);
      }
    };
  },
  createGraph(data: ICreateGraph, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createGraph.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().createGraph(data);

        if (result.isError) {
          throw result;
        }
        const pomps = getState().dictionaryClinrecPomp.pomp;
        const newPomps = pomps.map((p) =>
          p.idPomp === data.idPomp
            ? {
                ...p,
                graphs: null,
              }
            : p
        );
        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: newPomps,
          })
        );
        dispatch(DictionaryClinrecPompAction.createGraph.done({ params: null }));
        successPopup(result.message);
        onClose();
        await dispatch(DictionaryClinrecPompThunk.getDictionaryPompsGraph(data.idPomp));
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createGraph.failed(error));

        errorPopup(error.message);
      }
    };
  },
  updateGraph(data: ICreateGraph, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createGraph.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().updateGraph(data);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createGraph.done({ params: null }));
        const pomps = getState().dictionaryClinrecPomp.pomp;
        const newPomps = pomps.map((p) =>
          p.idPomp === data.idPomp
            ? {
                ...p,
                graphs:
                  p.graphs?.map((g) =>
                    g.idGraph === data.idPompGraph
                      ? { ...g, graphName: data.graphName, mkb10: result.result.mkb10 }
                      : { ...g }
                  ) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: newPomps,
          })
        );
        successPopup(result.message);
        onClose();
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createGraph.failed(error));

        errorPopup(error.message);
      }
    };
  },
  deleteGraph(idPomp: number, idGraph: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createGraph.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().deleteGraph(idPomp, idGraph);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createGraph.done({ params: null }));
        const pomps = getState().dictionaryClinrecPomp.pomp;
        const newPomps = pomps.map((p) =>
          p.idPomp === idPomp
            ? {
                ...p,
                graphs: p.graphs?.filter((g) => g.idGraph !== idGraph) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: newPomps,
          })
        );
        successPopup(result.message);
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createGraph.failed(error));

        errorPopup(error.message);
      }
    };
  },
  createPompStage(data: ICreatePompStage, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createPompStage.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().createPompStage(data);

        if (result.isError) {
          throw result;
        }

        const pomp = getState().dictionaryClinrecPomp.pomp;
        const newCpomp = pomp.map((p) =>
          p.idPomp === data.idPomp
            ? {
                ...p,
                graphs:
                  p.graphs?.map((g) =>
                    g.idGraph === data.idGraph
                      ? {
                          ...g,
                          pompStages: null,
                        }
                      : { ...g }
                  ) || null,
              }
            : p
        );
        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: newCpomp,
          })
        );
        dispatch(DictionaryClinrecPompAction.createPompStage.done({ params: null }));
        successPopup(result.message);
        onClose();
        await dispatch(DictionaryClinrecPompThunk.getDictionaryPompsStage(data.idPomp, data.idGraph));
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createPompStage.failed(error));

        errorPopup(error.message);
      }
    };
  },
  updatePompStage(data: IUpdatePompStage, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createPompStage.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().updatePompStage(data);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createPompStage.done({ params: null }));
        const pomp = getState().dictionaryClinrecPomp.pomp;
        const newCpomp = pomp.map((p) =>
          p.idPomp === data.idPomp
            ? {
                ...p,
                graphs:
                  p.graphs?.map((g) =>
                    g.idGraph === data.idGraph
                      ? {
                          ...g,
                          pompStages:
                            g.pompStages?.map((s) =>
                              s.stageCode === data.currentStageCode
                                ? {
                                    ...s,
                                    stageName: result.result.stageName,
                                    stageCode: result.result.stageCode,
                                  }
                                : { ...s }
                            ) || null,
                        }
                      : { ...g }
                  ) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: newCpomp,
          })
        );
        successPopup(result.message);
        onClose();
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createPompStage.failed(error));
        errorPopup(error.message);
      }
    };
  },
  deletePompStage(idPomp: number, idGraph: number, stageCode: string): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createPompStage.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().deletePompStage(idPomp, idGraph, stageCode);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createPompStage.done({ params: null }));
        const pomp = getState().dictionaryClinrecPomp.pomp;
        const newCpomp = pomp.map((p) =>
          p.idPomp === idPomp
            ? {
                ...p,
                graphs:
                  p.graphs?.map((g) =>
                    g.idGraph === idGraph
                      ? { ...g, pompStages: g.pompStages?.filter((s) => s.stageCode !== stageCode) || null }
                      : g
                  ) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: newCpomp,
          })
        );
        successPopup(result.message);
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createPompStage.failed(error));

        errorPopup(error.message);
      }
    };
  },
  createPompState(data: ICreatePompState, idPomp: number, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createPompState.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().createPompState(data);

        if (result.isError) {
          throw result;
        }

        const pomp = getState().dictionaryClinrecPomp.pomp;
        const newCpomp = pomp.map((p) =>
          p.idPomp === idPomp
            ? {
                ...p,
                graphs:
                  p.graphs?.map((g) =>
                    g.idGraph === data.idPompGraph
                      ? {
                          ...g,
                          pompStages:
                            g.pompStages?.map((st) =>
                              st.stageCode === data.stageCode ? { ...st, pompStates: null } : { ...st }
                            ) || null,
                        }
                      : { ...g }
                  ) || null,
              }
            : p
        );
        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: newCpomp,
          })
        );
        dispatch(DictionaryClinrecPompAction.createPompState.done({ params: null }));
        successPopup(result.message);
        onClose();
        await dispatch(DictionaryClinrecPompThunk.getDictionaryPompsState(idPomp, data.idPompGraph, data.stageCode));
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createPompState.failed(error));

        errorPopup(error.message);
      }
    };
  },
  updatePompState(data: IUpdatePompState, idPomp: number, onClose: () => void): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createPompState.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().updatePompState(data);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createPompState.done({ params: null }));
        const pomp = getState().dictionaryClinrecPomp.pomp;
        const newCpomp = pomp.map((p) =>
          p.idPomp === idPomp
            ? {
                ...p,
                graphs:
                  p.graphs?.map((g) =>
                    g.idGraph === data.idPompGraph
                      ? {
                          ...g,
                          pompStages:
                            g.pompStages?.map((s) =>
                              s.stageCode === data.stageCode
                                ? {
                                    ...s,
                                    pompStates:
                                      s.pompStates?.map((st) =>
                                        st.idState === data.idPompState
                                          ? { ...result.result, activities: st.activities }
                                          : { ...st }
                                      ) || null,
                                  }
                                : { ...s }
                            ) || null,
                        }
                      : { ...g }
                  ) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: newCpomp,
          })
        );
        successPopup(result.message);
        onClose();
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createPompState.failed(error));

        errorPopup(error.message);
      }
    };
  },
  deletePompState(idPomp: number, idGraph: number, stageCode: string, stateId: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createPompState.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().deletePompState(idPomp, stateId);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createPompState.done({ params: null }));
        const pomp = getState().dictionaryClinrecPomp.pomp;
        const newCpomp = pomp.map((p) =>
          p.idPomp === idPomp
            ? {
                ...p,
                graphs:
                  p.graphs?.map((g) =>
                    g.idGraph === idGraph
                      ? {
                          ...g,
                          pompStages:
                            g.pompStages?.map((s) =>
                              s.stageCode === stageCode
                                ? {
                                    ...s,
                                    pompStates: s.pompStates?.filter((st) => st.idState !== stateId) || null,
                                  }
                                : s
                            ) || null,
                        }
                      : g
                  ) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: newCpomp,
          })
        );
        successPopup(result.message);
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createPompState.failed(error));

        errorPopup(error.message);
      }
    };
  },
  generatePompDiagram(data: { pompGraphIndex: number; graph: IDictionaryGraph; pompId: number }): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      const statePomp = getState().dictionaryClinrecPomp.pomp;

      try {
        const result = await new DictionaryClinrecPompApiRequest().generatePompDiagram(data.graph.idGraph);

        if (result.isError) {
          throw result;
        }

        const currentPomp = statePomp.find((pomp) => pomp.idPomp === data.pompId) as IDictionaryPomp;

        const changedPomp = {
          ...currentPomp,
          graphs:
            currentPomp?.graphs?.map((item) =>
              item.idGraph === data.graph.idGraph
                ? ({
                    ...currentPomp?.graphs?.find((graph) => graph.idGraph === data.graph.idGraph),
                    xmlDiagramContent: result.result,
                    pompStages: null,
                  } as IDictionaryGraph)
                : item
            ) || null,
        };
        dispatch(
          DictionaryClinrecPompAction.generatePomp.done({
            params: null,
            result: statePomp.map((item, index) => (index === data.pompId ? changedPomp : item)),
          })
        );
        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: statePomp.map((item) => (item.idPomp === data.pompId ? changedPomp : item)),
          })
        );
        successPopup("Диаграмма успешно перегенерирована ");
        await dispatch(DictionaryClinrecPompThunk.getDictionaryPompsStage(data.pompId, data.graph.idGraph));
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
  updatePompDiagram(data: {
    pompGraphIndex: number;
    pompGraphId: number;
    xml: string;
    pompId: number;
    onClose?: () => void;
  }): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      const statePomp = getState().dictionaryClinrecPomp.pomp;
      try {
        const result = await new DictionaryClinrecPompApiRequest("", "text/plain").updatePompDiagram(data.xml);

        if (result.isError) {
          throw result;
        }

        const currentPomp = statePomp.find((pomp) => pomp.idPomp === data.pompId) as IDictionaryPomp;

        const changedPomp = {
          ...currentPomp,
          graphs:
            currentPomp?.graphs?.map((item) =>
              item.idGraph === data.pompGraphId
                ? ({
                    ...currentPomp?.graphs?.find((graph) => graph.idGraph === data.pompGraphId),
                    xmlDiagramContent: data.xml,
                    pompStages: null,
                  } as IDictionaryGraph)
                : item
            ) || null,
        };
        dispatch(
          DictionaryClinrecPompAction.generatePomp.done({
            params: null,
            result: statePomp.map((item) => (item.idPomp === data.pompId ? changedPomp : item)),
          })
        );
        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: statePomp.map((item) => (item.idPomp === data.pompId ? changedPomp : item)),
          })
        );
        successPopup("Диаграмма успешно сохранена");
        await dispatch(DictionaryClinrecPompThunk.getDictionaryPompsStage(data.pompId, data.pompGraphId));
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  sortingPompStage(PompId: number, graphId: number, parentId: number, sortArr: IDictionaryStage[]): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      const oldPomp = getState().dictionaryClinrecPomp.pomp;

      dispatch(DictionaryClinrecPompAction.sortingPompStage.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().sortPompStage(
          sortArr.map((item, index) => ({ idParent: parentId, stageId: item.stageCode, orderSort: index }))
        );
        if (result?.isError) {
          throw result;
        }
        const newOrderPomp = oldPomp?.map((pomp) =>
          pomp.idPomp !== PompId
            ? { ...pomp }
            : {
                ...pomp,
                graphs:
                  pomp?.graphs?.map((graph) =>
                    graph.idGraph !== graphId ? { ...graph } : { ...graph, pompStages: sortArr }
                  ) || null,
              }
        );
        dispatch(DictionaryClinrecPompAction.sortingPompStage.done({ params: null, result: newOrderPomp }));
        successPopup(result.message);
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.sortingPompStage.done({ params: null, result: oldPomp }));

        errorPopup(error.message);
      }
    };
  },
  sortinClinrecStage(clinrecId: number, parentId: number, sortArr: IDictionaryClinrecStage[]): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      const oldClinrec = getState().dictionaryClinrecPomp.clinrec;
      dispatch(DictionaryClinrecPompAction.sortingClinrecStage.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().sortClinrecStage(
          sortArr.map((item, index) => ({ idParent: parentId, stageId: item.stageCode, orderSort: index }))
        );
        if (result?.isError) {
          throw result;
        }
        const newOrderClinrec = oldClinrec?.map((clinrec) =>
          clinrec.idClinrec !== clinrecId
            ? { ...clinrec }
            : {
                ...clinrec,
                stages: sortArr,
              }
        );
        dispatch(DictionaryClinrecPompAction.sortingClinrecStage.done({ params: null, result: newOrderClinrec }));
        successPopup(result.message);
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.sortingClinrecStage.done({ params: null, result: oldClinrec }));

        errorPopup(error.message);
      }
    };
  },

  createPompActivity(
    data: ICreatePompActivity,
    idPomp: number,
    idPompGraph: number,
    stageCode: string,
    onClose: () => void
  ): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createPompActivity.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().createPompActivity(data);

        if (result.isError) {
          throw result;
        }

        const pomp = getState().dictionaryClinrecPomp.pomp;
        const newCpomp = pomp.map((p) =>
          p.idPomp === idPomp
            ? {
                ...p,
                graphs:
                  p.graphs?.map((g) =>
                    g.idGraph === idPompGraph
                      ? {
                          ...g,
                          pompStages:
                            g.pompStages?.map((st) =>
                              st.stageCode === stageCode
                                ? {
                                    ...st,
                                    pompStates:
                                      st.pompStates?.map((state) =>
                                        state.idState === data.idPompState
                                          ? {
                                              ...state,
                                              activities: null,
                                            }
                                          : state
                                      ) || null,
                                  }
                                : { ...st }
                            ) || null,
                        }
                      : { ...g }
                  ) || null,
              }
            : p
        );
        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: newCpomp,
          })
        );
        dispatch(DictionaryClinrecPompAction.createPompActivity.done({ params: null }));
        successPopup(result.message);
        onClose();
        await dispatch(
          DictionaryClinrecPompThunk.getDictionaryPompsActivity(idPomp, idPompGraph, stageCode, data.idPompState)
        );
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createPompActivity.failed(error));
        errorPopup(error.message);
      }
    };
  },
  updatePompActivity(
    data: IUpdatePompActivity,
    idPomp: number,
    idPompGraph: number,
    stageCode: string,
    onClose: () => void
  ): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createPompActivity.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().updatePompActivity(data);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createPompActivity.done({ params: null }));
        const pomp = getState().dictionaryClinrecPomp.pomp;
        const newCpomp = pomp.map((p) =>
          p.idPomp === idPomp
            ? {
                ...p,
                graphs:
                  p.graphs?.map((g) =>
                    g.idGraph === idPompGraph
                      ? {
                          ...g,
                          pompStages:
                            g.pompStages?.map((s) =>
                              s.stageCode === stageCode
                                ? {
                                    ...s,
                                    pompStates:
                                      s.pompStates?.map((st) =>
                                        st.idState === data.idPompState
                                          ? {
                                              ...st,
                                              activities:
                                                st.activities?.map((act) =>
                                                  act.id === data.idPompActivity ? { ...result.result } : act
                                                ) || null,
                                            }
                                          : { ...st }
                                      ) || null,
                                  }
                                : { ...s }
                            ) || null,
                        }
                      : { ...g }
                  ) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: newCpomp,
          })
        );
        successPopup(result.message);
        onClose();
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createPompActivity.failed(error));

        errorPopup(error.message);
      }
    };
  },
  deletePompActivity(
    idPomp: number,
    idGraph: number,
    stageCode: string,
    stateId: number,
    activityId: number
  ): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      dispatch(DictionaryClinrecPompAction.createPompActivity.started(null));
      try {
        const result = await new DictionaryClinrecPompApiRequest().deletePompActivity(idPomp, activityId);

        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryClinrecPompAction.createPompActivity.done({ params: null }));
        const pomp = getState().dictionaryClinrecPomp.pomp;
        const newCpomp = pomp.map((p) =>
          p.idPomp === idPomp
            ? {
                ...p,
                graphs:
                  p.graphs?.map((g) =>
                    g.idGraph === idGraph
                      ? {
                          ...g,
                          pompStages:
                            g.pompStages?.map((s) =>
                              s.stageCode === stageCode
                                ? {
                                    ...s,
                                    pompStates:
                                      s.pompStates?.map((st) =>
                                        st.idState === stateId
                                          ? {
                                              ...st,
                                              activities: st.activities?.filter((act) => act.id !== activityId) || null,
                                            }
                                          : st
                                      ) || null,
                                  }
                                : s
                            ) || null,
                        }
                      : g
                  ) || null,
              }
            : p
        );

        dispatch(
          DictionaryClinrecPompAction.updatePomp.done({
            params: null,
            result: newCpomp,
          })
        );
        successPopup(result.message);
      } catch (error) {
        dispatch(DictionaryClinrecPompAction.createPompActivity.failed(error));
        errorPopup(error.message);
      }
    };
  },
};

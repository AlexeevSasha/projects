import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { DiseaseMedicalCareCaseCardAction } from "./diseaseMedicalCareCaseCardAction";
import { MedicalCareCaseCardApiRequest } from "../../api/medicalCareCaseCardApiRequest";
import { DiseaseCardEpicrisisAction } from "../diseaseCardEpicrisis/diseaseCardEpicrisisAction";
import { errorPopup } from "../../common/helpers/toast/error";

export const DiseaseMedicalCareCaseCardThunk = {
  getSteps(caseBizKey: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseMedicalCareCaseCardAction.Steps.started(null));
      try {
        const result = await new MedicalCareCaseCardApiRequest().getSteps(caseBizKey);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseMedicalCareCaseCardAction.Steps.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(DiseaseMedicalCareCaseCardAction.Steps.failed({ params: null, error }));
      }
    };
  },
  getCustomBlocks(registerId: number, id: string, caseBizKey: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardEpicrisisAction.customBlocks.started(null));
      try {
        const result = await new MedicalCareCaseCardApiRequest().getCustomBlocks(registerId, id, caseBizKey);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardEpicrisisAction.customBlocks.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(DiseaseCardEpicrisisAction.customBlocks.failed({ params: null, error }));
      }
    };
  },
};

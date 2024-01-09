import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { DictionaryPatientReportAction } from "./dictionaryPatientReportAction";
import { DictionaryPatientReportApiRequest } from "../../api/dictionaryPatientReportApiRequest";

export const DictionaryPatientReportThunk = {
  getDictionaryPatientReport(pageIndex: number, pageSize: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryPatientReportAction.patientReportList.started(null));
      try {
        const result = await new DictionaryPatientReportApiRequest().getDictionaryPatientReport(pageIndex, pageSize);
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryPatientReportAction.patientReportList.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DictionaryPatientReportAction.patientReportList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
  getDictionaryPatientReportFunction(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DictionaryPatientReportAction.patientReportFunction.started(null));
      try {
        const result = await new DictionaryPatientReportApiRequest().getDictionaryPatientReportFunction();
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryPatientReportAction.patientReportFunction.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(DictionaryPatientReportAction.patientReportFunction.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
};

import { AnalysisOfPatientManagementApiRequest } from "api/analysisOfPatientManagementApiRequest";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { DiseaseCardPatientManagementAction } from "./diseaseCardPatientManagementAction";

export const diseaseCardPatientManagementThunk = {
  getInfo(registerId: number, id: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardPatientManagementAction.infoViolation.started(null));
      try {
        const result = await new AnalysisOfPatientManagementApiRequest().getViolations(registerId, id);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardPatientManagementAction.infoViolation.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(DiseaseCardPatientManagementAction.infoViolation.failed({ params: null, error }));
      }
    };
  },

  getCalendar(registerId: number, id: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardPatientManagementAction.calendar.started(null));
      try {
        const result = await new AnalysisOfPatientManagementApiRequest().Calendar(registerId, id);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardPatientManagementAction.calendar.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup("Ошибка при получении данных.");
        dispatch(DiseaseCardPatientManagementAction.calendar.failed({ params: null, error }));
      }
    };
  },
  getCalendarMonth(registerId: number, id: string, month: number, year: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardPatientManagementAction.calendarMonth.started(null));
      try {
        const result = await new AnalysisOfPatientManagementApiRequest().CalendarMonth(registerId, id, month, year);
        dispatch(DiseaseCardPatientManagementAction.calendarMonth.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup("Ошибка при получении данных.");
        dispatch(DiseaseCardPatientManagementAction.calendarMonth.failed({ params: null, error }));
      }
    };
  },
  getCalendarDay(registerId: number, id: string, month: number, year: number, day: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardPatientManagementAction.calendarDay.started(null));
      try {
        const result = await new AnalysisOfPatientManagementApiRequest().CalendarDay(registerId, id, month, year, day);
        dispatch(DiseaseCardPatientManagementAction.calendarDay.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup("Ошибка при получении данных.");
        dispatch(DiseaseCardPatientManagementAction.calendarDay.failed({ params: null, error }));
      }
    };
  },
  getInfoClinrec(registerId: number, id: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardPatientManagementAction.infoClinrec.started(null));
      try {
        const result = await new AnalysisOfPatientManagementApiRequest().getClinrec(registerId, id);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardPatientManagementAction.infoClinrec.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(DiseaseCardPatientManagementAction.infoClinrec.failed({ params: null, error }));
      }
    };
  },
  getInfoPomp(registerId: number, id: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(DiseaseCardPatientManagementAction.infoPomp.started(null));
      try {
        const result = await new AnalysisOfPatientManagementApiRequest().getPomp(registerId, id);
        if (result.isError) {
          throw result;
        }
        dispatch(DiseaseCardPatientManagementAction.infoPomp.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(DiseaseCardPatientManagementAction.infoPomp.failed({ params: null, error }));
      }
    };
  },
};

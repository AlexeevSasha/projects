import { IAppState } from "../../store/mainReducer";

export const registerGeneralInfoSelector = (state: IAppState) => state.registerGeneralInfo;

export const registerDownloadFileSelector = ({ registerGeneralInfo }: IAppState) => ({
    downloadFile: registerGeneralInfo.downloadFile,
    loadingFile: registerGeneralInfo.loadingFile,
  });
  
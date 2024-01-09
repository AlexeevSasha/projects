import { IAppState } from "../../store/mainReducer";

export const proposalGeneralInfoSelector = ({ proposalGeneralInfo }: IAppState) => proposalGeneralInfo;
export const proposalGeneralInfoAttachmentsSelector = ({ proposalGeneralInfoAttachments }: IAppState) =>
  proposalGeneralInfoAttachments;

export const proposalDownloadFileSelector = ({ proposalGeneralInfo }: IAppState) => ({
  downloadFile: proposalGeneralInfo.downloadFile,
  loadingFile: proposalGeneralInfo.loadingFile,
});

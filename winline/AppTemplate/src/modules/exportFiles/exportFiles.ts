import { createAsyncThunk } from "@reduxjs/toolkit";
import { getExportFile } from "../../api/requests/exportFiles";
import { message } from "antd";
import i18next from "i18next";

export let loadFileVariable = false;

const fileExtensionsResponse: Record<string, string> = {
  pdf: "pdf",
  csv: "csv",
  "vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx"
};

export const exportFile = createAsyncThunk(`exportFiles/`, async (dataExportFile: { path: string; fileName: string }) => {
  try {
    loadFileVariable = true;
    const responseExportFile = await getExportFile(`${dataExportFile.path}`);
    const [, responseFileExtension] = responseExportFile.type.split("/");
    const link = document.querySelector("#export-file") as HTMLAnchorElement;
    link.href = URL.createObjectURL(responseExportFile);
    link.download = `export_${dataExportFile.fileName}.${fileExtensionsResponse[responseFileExtension]}`;
    link.click();
    URL.revokeObjectURL(link.href);
    message.success(i18next.t("successExport"));
  } catch (error) {
    // console.log(error);
    message.error(i18next.t("errorExport"));
  } finally {
    loadFileVariable = false;
  }
});

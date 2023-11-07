import { LanguageT } from "../../../common/interfaces/LanguageT";

export enum StatusPaymentOrder {
  Created = "Created",
  ApprovedAdmin = "ApprovedAdmin",
  ApprovedPartner = "ApprovedPartner",
  Cancel = "Cancel",
}

export const StatusPaymentOrderLang = (lang: LanguageT) => {
  return {
    Created: lang.table.created,
    ApprovedAdmin: lang.table.processed,
    ApprovedPartner: lang.table.confirmed,
    Cancel: lang.table.canceled,
  };
};

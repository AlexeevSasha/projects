import { FilterPayment } from "./filterPayment";
import { PartnerLink } from "./partnerLink";
import { PartnerOrdersTable } from "./partnerOrdersTable";
import { PartnerPaymentTable } from "./partnerPaymentTable";
import { PartnerAllPayments } from "./partnerAllPayments";
import { PartnerAllList } from "./partnerAllList";
import { PartnerInfo } from "./partnerInfo";
import { SubPartnerInfo } from "./subPartnerInfo";

const Partner = () => {
  return <></>;
};

Partner.PartnerLink = PartnerLink;
Partner.OrdersTable = PartnerOrdersTable;
Partner.PaymentTable = PartnerPaymentTable;
Partner.FilterPayment = FilterPayment;
Partner.PartnerAllPayments = PartnerAllPayments;
Partner.PartnerAllList = PartnerAllList;
Partner.PartnerInfo = PartnerInfo;
Partner.SubPartnerInfo = SubPartnerInfo;

export { Partner };

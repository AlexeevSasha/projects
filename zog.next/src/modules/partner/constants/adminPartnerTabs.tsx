import { TabSwitchT } from "../../../common/interfaces/TabSwitchT";
import { Partner } from "../components/partner";
import { PaymentOrderT } from "../interfaces/PaymentOrderT";
import { InvoiceInfoT } from "../interfaces/InvoiceInfoT";
import { LanguageT } from "../../../common/interfaces/LanguageT";

export const adminPartnerTabs = (
  lang: LanguageT,
  partnerList: InvoiceInfoT[],
  partnerOrderList: PaymentOrderT[]
): TabSwitchT[] => {
  return [
    {
      title: lang.partner.all_partners,
      component: <Partner.PartnerAllList partnerList={partnerList} />,
    },
    {
      title: lang.partner.payments,
      component: <Partner.PartnerAllPayments partnerList={partnerOrderList} />,
    },
  ];
};

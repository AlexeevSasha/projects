import { TabSwitchT } from "../../../common/interfaces/TabSwitchT";
import { Partner } from "../components/partner";
import { UserPartnerInfoT } from "../../user/interfaces/UserT";
import { PaysSubPartnerT } from "../../user/interfaces/PaysSubPartnerT";
import { LanguageT } from "../../../common/interfaces/LanguageT";

export const partnerTabs = (
  lang: LanguageT,
  user: UserPartnerInfoT,
  paysSubPartner: PaysSubPartnerT[]
): TabSwitchT[] => {
  return [
    {
      title: lang.partner.payments,
      component: <Partner.PaymentTable />,
    },
    {
      title: lang.partner.applications,
      component: <Partner.OrdersTable />,
    },
    {
      title: user.mainPartner ? "" : lang.partner.info,
      component: <Partner.PartnerInfo user={user} />,
    },
    {
      title: user.mainPartner ? "" : lang.partner.history_payment,
      component: <Partner.SubPartnerInfo paysSubPartner={paysSubPartner} />,
    },
  ].filter((el) => el.title);
};

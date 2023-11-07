import { TabSwitchT } from "../../../common/interfaces/TabSwitchT";
import { Banner } from "../../banner/components/banner";
import { IBanner } from "../../banner/interfaces/banner";
import { LanguageT } from "../../../common/interfaces/LanguageT";
import { Payment } from "../../payment/component/payment";
import { IPaymentBanner } from "../../payment/interfaces/Payment";

export const settingsTabs = (
  lang: LanguageT,
  banners: IBanner[],
  paymentBanners: IPaymentBanner[]
): TabSwitchT[] => {
  return [
    {
      title: lang.setting.banners.title,
      component: <Banner.BannersSettings banners={banners} />,
    },
    {
      title: lang.setting.pay.title,
      component: <Payment.PaymentSetting paymentBanners={paymentBanners} />,
    },
  ];
};

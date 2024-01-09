import { useRouter } from "next/router";
import { lang } from "../../../../public/locales/lang";
import { LoyaltyConditionCheck, PromoDto } from "../../../api/dto/loyalty";
import { Alert } from "../../../components/alert";

interface IProps {
  promo: PromoDto;
  accepted?: LoyaltyConditionCheck;
}

export const PromoAlert = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <Alert
      type={
        props.promo.IsWinner || props.accepted?.IsWinner ? "success" : props.promo?.OutOfStock ? "warning" : "error"
      }
      message={
        // У акции ExternalReference нет успешного сообщения и она не может завершиться досрочно
        // Если пользователь победил
        (props.promo.IsWinner || props.accepted?.IsWinner) && props.promo.LoyaltyAwardType !== "ExternalReference"
          ? lang[locale].profileLoyalty.alerts.success[props.promo.LoyaltyAwardType]
          : // Если акция завершилась досрочно (акция с сылкой не может завершится досрочно)
          props.promo?.OutOfStock && props.promo.LoyaltyAwardType !== "ExternalReference"
          ? lang[locale].profileLoyalty.alerts.warning(
              lang[locale].profileLoyalty.textWarningAlerts[props.promo.LoyaltyAwardType],
              props.promo.QuantityAwards
            )
          : // Если акция завершилась
          new Date(props.promo.EndDate) < new Date()
          ? lang[locale].profileLoyalty.alerts.error
          : props.accepted?.BoughtTicket?.IsCheck === false || props.accepted?.NewUserCheck === false
          ? lang[locale].profileLoyalty.alerts.errorConfirm
          : ""
      }
    />
  );
};

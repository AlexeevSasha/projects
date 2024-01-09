import { PromoDtoShort } from "../../../api/dto/loyalty";
import { PromoCard } from "./promoCard";
import { PromoCardMvp } from "./promoCardMvp";

type Props = {
  promo: PromoDtoShort[];
};

export const PromoList = ({ promo }: Props) => {
  return (
    <>
      {promo.map((item, i) => {
        switch (item.PromotionType) {
          case "Loyalty": {
            return <PromoCard key={i} promo={item} />;
          }
          case "Mvp": {
            return <PromoCardMvp key={i} promo={item} />;
          }
          default:
            return null;
        }
      })}
    </>
  );
};

import { MarketingBigSlide } from "modules/marketing/interfaces/marketingBigSlide";
import { MarketingSmallSlide } from "modules/marketing/interfaces/marketingSmallSlide";

export type MarketingMockType = {
  bigBanner: MarketingBigSlide[];
  smallBanner: MarketingSmallSlide[];
};

export const marketingMock: MarketingMockType = {
  bigBanner: [
    { img: "/mockImages/big.png", alt: "большой баннер" },
    { img: "/mockImages/big.png", alt: "большой баннер" },
    { img: "/mockImages/big.png", alt: "большой баннер" },
  ],
  smallBanner: [
    { img: "/mockImages/small.png", alt: "маленький баннер" },
    { img: "/mockImages/small.png", alt: "маленький баннер" },
    { img: "/mockImages/small.png", alt: "маленький баннер" },
  ],
};

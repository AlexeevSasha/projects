import { identityRepository } from "../api/identityRepository";
import { shopRepository } from "../api/shopRepository";
import { getCookie } from "../assets/constants/getCookie";
import { setFavouritsCookie } from "../assets/helpers/setFavouritsCookie";
import { setUserCookie } from "../assets/helpers/setUserCookie";
import { ISignInPasswordForm } from "../componentPages/signin/interfaces/ISignInPasswordForm";
import { ISignInSmsForm } from "../componentPages/signin/interfaces/ISignInSmsForm";

export const authorize = async (data: ISignInSmsForm | ISignInPasswordForm) => {
  const authInfo =
    data.type === "password"
      ? await identityRepository.authorization(data)
      : data.type === "phone"
      ? await identityRepository.verificationSMS(data)
      : undefined;

  // Если запрос выше упадёт с ошибкой, то код ниже не исполнится, так как exception выкинет на уровень выше

  if (authInfo) {
    setUserCookie(authInfo);

    const favourits = JSON.parse(getCookie("favourites") || "[]");
    const basketId = getCookie("basketId") || "";
    await shopRepository.dataBindingDuringAuth(basketId, favourits);

    document.cookie = `basketId=${basketId};max-age=-1;domain=${process.env.NEXT_PUBLIC_DOMAIN};path=/`;
    setFavouritsCookie();
  }
};

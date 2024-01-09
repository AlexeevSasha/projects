import { getCookie } from "../assets/constants/getCookie";
import { clearUserCookie, setUserCookie } from "../assets/helpers/setUserCookie";

let status = "success";

export const refreshToken = async () => {
  if (status === "pending") return status;

  try {
    const refreshToken = getCookie("refresh_token");
    if (!refreshToken) return "error";

    const body =
      `client_id=${encodeURIComponent("web.client")}` +
      `&client_secret=${encodeURIComponent("2C78048F-ED10-4DAD-AA1E-54C1C66AA897")}` +
      `&grant_type=refresh_token&refresh_token=${encodeURIComponent(refreshToken)}`;

    const headers = { "content-type": "application/x-www-form-urlencoded" };
    status = "pending";

    await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/identity/connect/token`, { method: "POST", body, headers })
      .then((res) => {
        if (!res.ok) {
          throw new Error("");
        }
        return res.json();
      })
      .then((res) => {
        setUserCookie(res);
        location.reload();
      })
      .catch(() => {
        clearUserCookie();
      });

    status = "success";
    return status;
  } catch (e) {
    return "error";
  }
};

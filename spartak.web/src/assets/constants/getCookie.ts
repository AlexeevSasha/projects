export const getCookie = (cookieName: string, cookieString?: string) => {
  const cookie: Record<string, string> = {};
  if (typeof window !== "undefined") {
    document.cookie.split(";").forEach(function (el) {
      const [key, value] = el.split("=");
      cookie[key.trim()] = value;
    });
    return cookie[cookieName];
  } else if (cookieString) {
    const cookie: Record<string, string> = {};
    cookieString.split(";").forEach(function (el) {
      const [key, value] = el.split("=");
      cookie[key.trim()] = value;
    });
    return cookie[cookieName];
  } else {
    return undefined;
  }
};

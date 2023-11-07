export const getCookie = (cookieName: string) => {
  const cookie: Record<string, string> = {};
  if (typeof window !== "undefined") {
    document.cookie.split(";").forEach(function (el) {
      const [key, value] = el.split("=");
      cookie[key.trim()] = value;
    });
    return cookie[cookieName];
  }
};

const escape = (v: string) => {
  return v.replace(/([.*+?\^$(){}|\[\]\/\\])/g, "\\$1");
};

export const getCookie = (cookies: string, name: string) => {
  const match = cookies.match(RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)"));
  return match ? match[1] : "";
};

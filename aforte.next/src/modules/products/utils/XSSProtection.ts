export const XSSProtection = (htmlContent: string) => {
  const regExp = new RegExp(/<script[^>]*?>.*?<\/script>/gims);

  return htmlContent.replace(regExp, "");
};

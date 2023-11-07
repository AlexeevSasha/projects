export const checkOnlyImg = (url: string) =>
  ["jpg", "jpeg", "png", "JPEG", "JPG", "PNG", "webp", "WEBP"].includes(
    url.split(".").slice(-1)[0] ?? ""
  );

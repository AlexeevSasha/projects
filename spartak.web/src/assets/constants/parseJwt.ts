export const parseJwt = (token?: string) => {
  const base64Payload = token?.split(".")[1];
  if (base64Payload) {
    const payload = Buffer.from(base64Payload, "base64");
    return JSON.parse(payload.toString());
  }
  return {};
};

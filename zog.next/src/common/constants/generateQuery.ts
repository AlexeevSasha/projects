export const generateQuery = (query: { [key: string]: any }) => {
  const queryArray = Object.entries(query)
    .map(([key, value]) => (value ? `${encodeURI(key)}=${encodeURI(value)}` : ""))
    .filter((el) => el);

  return queryArray.length ? `?${queryArray.join("&")}` : "";
};

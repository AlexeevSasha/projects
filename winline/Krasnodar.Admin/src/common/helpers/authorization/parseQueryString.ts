export const parseQueryString = (queryString: string) => {
  const queryObj: Record<string, string> = {};
  const elementsQueryString = queryString.replace('?', '').split('&');
  elementsQueryString.map((element) => {
     const [key, value] = element.split('=');
     queryObj[key] = value;
  });

  return queryObj;
};

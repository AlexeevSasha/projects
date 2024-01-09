export const deepCopyFunction = (inObject: any) => {
  let outObject, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject;
  }
  // eslint-disable-next-line prefer-const
  outObject = Array.isArray(inObject) ? [] : {};
  for (key in inObject) {
    value = inObject[key];
    outObject[key] = deepCopyFunction(value);
  }
  return outObject;
};

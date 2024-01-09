export const calculateAdditionalTime = (addedTime: number, time: number) => {
  return time === 1 && addedTime > 45
    ? `45 + ${addedTime - 45}`
    : time === 2 && addedTime > 90
    ? `90 + ${addedTime - 90}`
    : time === 3 && addedTime > 105
    ? `105 + ${addedTime - 105}`
    : time === 4 && addedTime > 120
    ? `120 + ${addedTime - 120}`
    : addedTime;
};

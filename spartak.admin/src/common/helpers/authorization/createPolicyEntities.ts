export const createPolicyEntities = (policyItem: string) => {
  return policyItem
    .replace(/\s/g, "")
    .split(",")
    .filter((policy) => policy)
    .map((policy) => policy.split(".")[0]);
};

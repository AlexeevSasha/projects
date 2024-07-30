export const getAccessNameInObject = (access: any) => {
  const value = access.value;
  const [name , ] = value.split('.');

  return name;
};

export const getAccessPolicyNameInObject = (access: any) => {
  const value = access.value;
  const [, policy] = value.split('.');

  return policy;
};

export const getAccessNameInString = (access: string) => {
  if (access === 'fullAccess') {

    return access;
  }
  const [name , ] = access.split('.');

  return name;
};

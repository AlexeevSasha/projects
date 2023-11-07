export type AuthQueryParam = {
  partner?: string;
  orderName?: string;
  auto_login?: string;
};

export const getAuthParams = (query: AuthQueryParam) => {
  let details: AuthQueryParam = {};

  if (query?.partner) {
    details = { partner: query?.partner };
  } else if (query?.orderName) {
    details = { orderName: query?.orderName };
  } else if (query?.auto_login) {
    details = { auto_login: query?.auto_login };
  }

  return details;
};

export const linkPartnerRegister = (id: string) =>
  `${process.env.NEXT_PUBLIC_DEFAULT_URL}/auth/signin?partner=${id}`;

export const linkPartnerUtm = (utm: string) =>
  `${process.env.NEXT_PUBLIC_DEFAULT_URL_PARTNER}?utm=${utm}`;

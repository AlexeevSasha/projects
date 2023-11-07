import { UserRoleT } from "./UserRoleT";

export type UserT = {
  id: string;
  name?: string;
  birthday?: string;
  email: string;
  emailVerified: string;
  utm_partner?: string;
  image?: string;
  userRole: UserRoleT;
  isPartner: boolean;
  partnerId?: string;
  download_manual: boolean;
  email_date: string[];
};

export type UserPartnerInfoT = UserT & {
  mainPartner?: UserT;
  subjectPartners?: UserT[];
};

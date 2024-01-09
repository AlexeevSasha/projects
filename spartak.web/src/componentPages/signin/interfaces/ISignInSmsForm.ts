export type ISignInSmsForm = {
  phone: string;
  code?: string;
  BruteforceCooldown?: string;
  type: "phone";
};

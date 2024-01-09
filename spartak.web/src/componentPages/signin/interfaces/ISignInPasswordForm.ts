export type ISignInPasswordForm = {
  login: string;
  password: string;
  BruteforceCooldown?: string;
  type: "password";
};

export type UserDistributionsT = {
  emailDistribution: string;
  confirmEmail: boolean;
  discounts: DistributionsChildren;
  favorites: DistributionsChildren;
  notifications: DistributionsChildren;
};

type DistributionsChildren = {
  email: boolean;
  sms: boolean;
  push: boolean;
};

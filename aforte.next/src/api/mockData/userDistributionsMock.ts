import { UserDistributionsT } from "modules/profile/interfaces/userDistributions";

export const userDistributionsMock: UserDistributionsT = {
  emailDistribution: "test@gmail.com",
  confirmEmail: false,
  discounts: {
    email: true,
    sms: true,
    push: false,
  },
  favorites: {
    email: true,
    sms: true,
    push: false,
  },
  notifications: {
    email: true,
    sms: true,
    push: false,
  },
};

export type UserT = {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  gender: "male" | "female";
  birthday: string;
  email: string;
  confirmEmail: boolean;
  mailing: boolean;
  phone: string;
  points: number;
};

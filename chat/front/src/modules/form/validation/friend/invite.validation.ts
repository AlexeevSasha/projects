import { emailRegex } from "../regex.validation";

interface IValues {
  email: string;
}

export const InviteValidation = (values: IValues) => {
  const errors = {} as IValues;

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

import { signInValidation } from "./signIn.validation";

interface IValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export const signUpValidation = (values: IValues) => {
  const errors = {} as IValues;

  if (!values.firstname) {
    errors.firstname = "First name is required";
  }

  return { ...errors, ...signInValidation({ email: values.email, password: values.password }) };
};

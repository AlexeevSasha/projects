import { UseFormGetValues } from "react-hook-form";
import { lang } from "../../../public/locales/lang";
import { emailRegexp } from "../../assets/constants/regexp";
import { SignUpFormValues } from "./signup";

export class Rules {
  constructor(readonly locale: string, readonly getValues: UseFormGetValues<SignUpFormValues>) {}

  commonRule = { required: lang[this.locale].form.validation.required };

  phoneRule = { validate: (value = "") => (!value || value.length < 12 ? lang[this.locale].auth.wrongPhone : true) };

  emailRule = {
    validate: (value = "") => (!value || !emailRegexp.test(value) ? lang[this.locale].auth.wrongEmail : true),
  };

  nameRule = {
    validate: (value = "") => (!value || !/^.{3,50}$/gi.test(value) ? lang[this.locale].auth.stringLength : true),
  };

  middleNameRule = {
    validate: (value = "") => (value && !/^.{3,50}$/gi.test(value) ? lang[this.locale].auth.stringLength : true),
  };

  passwordRule = {
    validate: (value = "") =>
      !value || value.length < 8 || value.length > 20 || !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(value)
        ? lang[this.locale].auth.passError
        : true,
  };

  confirmRule = {
    validate: (value?: string) => (value !== this.getValues("password") ? lang[this.locale].auth.confirmError : true),
  };

  birthDayRule = {
    validate: (value = "") => {
      const yaer = new Date(value).getFullYear();
      return !value || (yaer > new Date().getFullYear() || yaer < 1900) || value.length < 10
        ? lang[this.locale].form.validation.invalidDate
        : true;
    },
  };
}

import { lang } from "../../../public/locales/lang";
import { emailRegexp } from "../../assets/constants/regexp";

export class Rules {
  constructor(readonly locale: string) {}

  commonRule = { required: lang[this.locale].form.validation.required };

  phoneRule = { validate: (value = "") => (!value || value.length < 12 ? lang[this.locale].auth.wrongPhone : true) };

  emailRule = {
    validate: (value = "") => (!value || !emailRegexp.test(value) ? lang[this.locale].auth.wrongEmail : true),
  };

  nameRule = {
    validate: (value = "") => (!value || !/^.{1,100}$/gi.test(value) ? lang[this.locale].academy.nameLength : true),
  };

  storyRule = {
    validate: (value = "") => (!value || !/^.{2,200}$/gi.test(value) ? lang[this.locale].academy.commentLength : true),
  };

  cardRule = {
    validate: (value?: number) => (!value || !/^\d{6}$/gi.test(String(value)) ? lang[this.locale].kids.cardRule : true),
  };

  heightRule = {
    validate: (value?: number) => (!value || value < 90 || value > 145 ? lang[this.locale].kids.heightRule : true),
  };

  agreeRule = {
    validate: (value?: boolean) => (!value ? lang[this.locale].kids.heightRule : true),
  };
}

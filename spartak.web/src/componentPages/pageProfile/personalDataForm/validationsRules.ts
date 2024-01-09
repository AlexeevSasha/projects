import { lang } from "../../../../public/locales/lang";

export class Rules {
  constructor(readonly locale: string) {}

  commonRule = { required: lang[this.locale].form.validation.required };

  seriesRule = {
    validate: (value = "") =>
      !value || !/^\d\d\d\d$/.test(value) ? lang[this.locale].pagePersonalData.validation.series : true,
  };

  numberRule = {
    validate: (value = "") =>
      !value || !/^\d\d\d\d\d\d$/.test(value) ? lang[this.locale].pagePersonalData.validation.number : true,
  };

  codeRule = {
    validate: (value = "") => {
      return !value || !/^\d\d\d-\d\d\d$/.test(value) ? lang[this.locale].pagePersonalData.validation.number : true;
    },
  };

  nameplateRule = {
    validate: (value = "") => {
      return !value
        ? lang[this.locale].bannerInfo.nameplate.modal.prompt
        : !/^([a-zA-Za-яА-Я0-9\\s!?().,"";: ё-]+|([а-яА-ЯA-za-z0-9\\s!?().,"";: ё-])+)$/.test(value)
        ? lang[this.locale].bannerInfo.nameplate.modal.validation
        : true;
    },
  };

  dateRule = {
    validate: (value = "") => {
      const year = new Date(value).getFullYear();
      return value && (year > new Date().getFullYear() || year < 1900)
        ? lang[this.locale].form.validation.invalidDate
        : true;
    },
  };
}

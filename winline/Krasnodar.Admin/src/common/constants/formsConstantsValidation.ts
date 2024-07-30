export const formsConstantsValidation = {
  default: {
    min: 3,
    max: 254
  },
  password: {
    min: 8,
    max: 20
  },
  textarea: {
    max: {
      default: 150,
      sms: 70,
      email: 2000
    }
  },
  link: {
    max: 2048
  },
  entity: {
    default: {
      min: 3,
      wmax: 3,
      max: 50
    },
    adv: {
      max: 64,
      image: {
        width: 1125,
        height: 120,
        size: 2
      }
    }
  },
  dateFormat: "DD/MM/YYYY",
  dateTimeFormat: "DD/MM/YYYY HH:mm",
  dateSearchFormat: "YYYY-MM-DD"
};

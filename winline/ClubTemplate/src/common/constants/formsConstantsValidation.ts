export const formsConstantsValidation = {
  default: {
    min: 3,
    max: 254,
    minCount: 1,
    maxCount: 10000
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
    },
    product: {
      max: 100,
      image: {
        width: 444,
        height: 420,
        size: 2
      }
    },
    poll: {
      max: 1000,
      image: {
        width: 1125,
        height: 630,
        size: 2
      }
    },
    story: {
      image: {
        width: 1080,
        height: 1920,
        size: 15
      },
      imageMin: {
        width: 400
      },
      video: {
        width: 1080,
        height: 1920,
        size: 20
      }
    }
  },
  dateFormat: "DD/MM/YYYY",
  dateTimeFormat: "DD/MM/YYYY HH:mm",
  dateSearchFormat: "YYYY-MM-DD",
  timeFormat: "HH:mm"
};

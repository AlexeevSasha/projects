export const criterionOptions = [
  { label: "", value: "" },
  { label: "Оплатил методичку, но не оплатил диагностику", value: "paid_only_manual" },
  { label: "Оставил заявку на обзвон, но не оплатили", value: "left_request_not_paid" },
  { label: "Оплатил - тип заявки БЕСПЛАТНЫЙ", value: "paid_free" },
  { label: "Оплатил - тип заявки КОНСУЛЬТАНТ", value: "paid_consult" },
  { label: "Оплатил - тип заявки ПАРТНЁР", value: "paid_partner" },
  { label: "Оплатил - тип заявки ВИП", value: "paid_vip" },
  { label: "По всей базе", value: "all_base" },
  { label: "Введу почту на который нужно отправить рассылку", value: "target_email" },
];

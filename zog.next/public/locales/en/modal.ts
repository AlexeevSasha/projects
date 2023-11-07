import { modalRu } from "../ru/modal";

export const modalEn: typeof modalRu = {
  exit: {
    title: "Are you sure you want to go out?",
  },
  payment_creation: {
    title: "Form of payment creation",
    names_bank: "Name of bank",
    card_number: "Card number",
    name_as_bank: "Name as in the bank",
    total_pay: "Payment amount",
    error_exceed_balance: "The amount of payment must not exceed the balance of the account",
  },
  user: {
    you_sure_delete_user: "Are you sure you want to delete this user?",
    delete_user: "Delete user",
    change_email: "Change email",
    enter_new_email: "Enter new Email",
    required: "required",
  },
  application: {
    you_sure_delete_application: "Are you sure you want to delete the application?",
    delete_application: "Delete application",
    start_support_date: "Start of support date",
    change_application: "Change application",
    add_new_photo: "Add a new photo",
    you_sure_delete_photo: "Are you sure you want to delete the photo?",
    delete_photo: "Delete photo",
    recording_audio: "Recording audio commentary",
    audio_starting: "audio recording",
    new_audio: "Record new audio",
    add_new_audio: "Add a new audio comment",
    delete_old: "old get away",
    comment_change: "Edit comment",
    comment_add: "Add a comment",
    comment_enter: "Enter a comment",
  },
  generate_pay: {
    title: "Generating a payment link",
    link_rf: "Reference to РФ payment successfully copied to the clipboard",
    link_foreign: "Link to WIDE COUNTRY PAYMENT (stripe)",
    link_after_pay: "Link after payment",
  },
  pay_banner: {
    input_section: "Select which section the payment is for",
    input_sum: "Enter the amount",
    success_url: "Сылка переадресации при успешной оплате",
    input_currency: "Select currency",
    input_pay_system: "Which payment system",
  },
};

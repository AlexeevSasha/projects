import axios from "axios";
import { toast } from "react-toastify";
import { existsUserByEmail } from "./user";
import { signIn } from "next-auth/react";
import { generateId } from "../common/constants/generateId";
import { SendEmailEnum } from "../common/interfaces/SendEmail";
import { IMailingFilter } from "../modules/mailing/interfaces/MailingFilter";

export const sentEmailSignIn = async (email: string, name: string) => {
  try {
    const check = await existsUserByEmail(email);
    const redirect = !check ? { callbackUrl: "/lk/profile" } : {};
    await signIn("email", { email, redirect: false, ...redirect }, { orderName: name });
    toast.success("Письмо успешно отправлено");
  } catch (e) {
    toast.error("Не удалось отправить письмо");
  }
};

export const createUniqLink = async (body: { [key: string]: string }) => {
  try {
    const { data } = await axios.post("/api/email/getUniqToken", {
      ...body,
      id: generateId(),
    });
    return data.url;
  } catch (e) {
    return false;
  }
};

export const sendEmail = async (
  email: string,
  type: SendEmailEnum,
  details?: { [key: string]: string }
) => {
  try {
    await axios.post("/api/email/sendEmail", { email, type, details });
    toast.success("Письмо успешно отправлено");
  } catch (e) {
    toast.error("Не удалось отправить письмо");
  }
};

export const mailingEmail = async (body: IMailingFilter) => {
  try {
    const response = await axios.post("/api/email/mailing", body);
    toast.success(response.data.message);
  } catch (e) {
    toast.error("Не удалось отправить письмо");
  }
};

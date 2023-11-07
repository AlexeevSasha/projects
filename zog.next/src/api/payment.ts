import axios from "axios";
import { toast } from "react-toastify";
import { IPaymentForm } from "../modules/payment/interfaces/Payment";
import { getCustomNamePhoto } from "../modules/order/constants/getCustomNamePhoto";

export const getLinkRbManual = async (price: string, email: string) => {
  try {
    const { data } = await axios.get(`/api/payment/manual?price=${price}&email=${email}`);

    return data.data.url;
  } catch (e) {
    return undefined;
  }
};

export const addPaymentBanner = async (file: File, body: IPaymentForm) => {
  const formData = new FormData();
  formData.append("file", file, getCustomNamePhoto(file.name));
  Object.entries(body).forEach(([key, value]) => formData.append(key, value));

  try {
    const response = await axios.post("/api/upload/payment/add", formData);
    toast.success(response.data.message);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const changePaymentBanner = async (body: IPaymentForm, id: string, file?: File) => {
  const formData = new FormData();
  if (file) {
    formData.append("file", file, getCustomNamePhoto(file.name));
  }
  Object.entries(body).forEach(([key, value]) => formData.append(key, value));
  formData.append("id", id);

  try {
    const response = await axios.post("/api/upload/payment/update", formData);
    toast.success(response.data.message);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const deletePaymentBanner = async (id: string, callback: (id: string) => void) => {
  try {
    const response = await axios.delete(`/api/upload/payment/delete?id=${id}`);
    callback(id);
    toast.success(response.data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

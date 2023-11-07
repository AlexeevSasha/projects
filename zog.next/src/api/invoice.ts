import axios from "axios";
import { toast } from "react-toastify";

export const deleteInvoiceById = async (id: string, callback?: (id: string) => void) => {
  try {
    const response = await axios.delete(`/api/payment/deletePartnerInvoice?id=${id}`);
    callback?.(id);
    toast.success(response.data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

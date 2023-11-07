import axios from "axios";
import { toast } from "react-toastify";
import { FilterPrimaryOrderT } from "../modules/primary-order/constants/context";
import { IPrimaryOrder } from "../modules/primary-order/interfaces/PrimaryOrder";

export const deletePrimaryOrderById = async (id: string, callback: (id: string) => void) => {
  try {
    const response = await axios.delete(`/api/primary-order/delete?id=${id}`);
    callback(id);
    toast.success(response.data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const searchPrimaryOrder = async (params: FilterPrimaryOrderT) => {
  try {
    const response = await axios.post(`/api/primary-order/post?page=${params.page}`, params);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { orders: [], totalPage: 0 };
  }
};

export const changePrimaryOrder = async (params: Partial<IPrimaryOrder>) => {
  try {
    const response = await axios.put("/api/primary-order/put", params);
    toast.success(response.data.message);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

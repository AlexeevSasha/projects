import axios from "axios";
import { toast } from "react-toastify";
import { OrderT } from "../modules/order/interfaces/OrderT";
import { FilterOrderT } from "../modules/order/constants/context";
import { IParamChangeImageOrder } from "../modules/order/interfaces/ImageOrder";
import { getCustomNamePhoto } from "../modules/order/constants/getCustomNamePhoto";
import { generateId } from "../common/constants/generateId";

export const updateOrder = async (id: string, data: Partial<OrderT>, callback?: () => void) => {
  try {
    const response = await axios.post("/api/clients/update", { id, data });
    toast.success(response.data.message);
    callback?.();
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const deleteOrderById = async (id: string, callback: (id: string) => void) => {
  try {
    const response = await axios.delete(`/api/clients/delete?id=${id}`);
    callback(id);
    toast.success(response.data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const searchOrder = async (params: FilterOrderT) => {
  try {
    const response = await axios.post(`/api/clients?page=${params.page}`, params);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { orders: [], totalPage: 0 };
  }
};

export const changeImage = async (params: IParamChangeImageOrder) => {
  const file = new FormData();
  Object.entries(params).forEach(([key, value]) => {
    if (key === "file") {
      file.append(key, value, getCustomNamePhoto(value.name));
    } else {
      file.append(key, value);
    }
  });

  try {
    const response = await axios.post("/api/clients/changeImage", file);
    toast.success(response.data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const addImage = async (files: File[], id: string) => {
  const file = new FormData();
  Object.entries(files).forEach(([key, value]) =>
    file.append(key, value, getCustomNamePhoto(value.name))
  );
  file.append("id", id);

  try {
    const response = await axios.post("/api/clients/addImage", file);
    toast.success(response.data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const deleteImage = async (id: string, photoId: string, photoName: string) => {
  try {
    const response = await axios.delete(
      `/api/clients/deleteImage?id=${id}&photoId=${photoId}&photoName=${photoName}`
    );
    toast.success(response.data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const addAudio = async (blob: Blob, id: string, currentAudio: string) => {
  const file = new FormData();
  file.append("audio", blob, `voice-comment_${generateId()}`);
  file.append("id", id);
  file.append("currentAudio", currentAudio);

  try {
    const response = await axios.post("/api/clients/addAudio", file);
    toast.success(response.data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

import axios from "axios";
import { toast } from "react-toastify";
import { IBanner } from "../modules/banner/interfaces/banner";

export const addBanner = async (files: File[], roles: string[], link: string) => {
  const data = new FormData();
  files.forEach((file, i) => {
    data.append(`file-${i}`, file);
  });
  roles.forEach((role, i) => data.append(`role-${i}`, role));
  data.append("link", link);

  try {
    const response = await axios.post("/api/upload/banner/addBanner", data);
    toast.success(response.data.message);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const removeBanner = async (id: string) => {
  try {
    const response = await axios.delete(`/api/upload/banner/deleteBanner?id=${id}`);
    toast.success(response.data.message);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const changeOrderBanner = async (banners: IBanner[]) => {
  try {
    const response = await axios.post("/api/upload/banner/changeOrderBanner", { banners });
    return { banners: response.data.data };
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { error: true };
  }
};

export const changeBanner = async (id: string, link: string, access: string[]) => {
  try {
    await axios.put("/api/upload/banner/changeBanner", { id, link, access });
    toast.success("Ссылка успешно обновлена");
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

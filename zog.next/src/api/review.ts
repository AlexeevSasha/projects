import axios from "axios";
import { toast } from "react-toastify";
import { ReviewFormT } from "../modules/review/interfaces/Review";

export const addReview = async (body: ReviewFormT, callback: () => void) => {
  try {
    await axios.post("/api/review/add", body);
    callback();
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const deleteReviewById = async (id: string, callback: (id: string) => void) => {
  try {
    const response = await axios.delete(`/api/review/delete?id=${id}`);
    callback(id);
    toast.success(response.data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

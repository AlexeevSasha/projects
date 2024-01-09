import { toast } from "react-toastify";

export const successPopup = (description: string) => {
  return toast.success(description);
};

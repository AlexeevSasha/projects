import { toast } from "react-toastify";

export const errorPopup = (description: string) => {
  return toast.error(description);
};

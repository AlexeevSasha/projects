import { get, post } from "../baseRequest";

export const getMobileConfig = async () => get("/mobile/admin/MobileConfig");

export const updateMobileConfig = async (body: { [key: string]: string | object }) =>
  post("/mobile/admin/MobileConfig", JSON.stringify(body), "application/json");

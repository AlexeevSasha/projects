import { get, put, post, remove } from "../baseRequest";

export const getContent = async (filterString: string) => get(`/content/odata/Content?${filterString}`);

export const addContent = async (body: string) => post<string>(`/content/v1/Content/Create`, body, "application/json");

export const addContentImage = async (body: FormData): Promise<string> => post<FormData>(`/content/v1/Content/AddImage`, body);

export const updateContent = async (id: string, body: string) => put<string>(`/content/v1/Content/Update/${id}`, body, "application/json");

export const updateStatusContent = async (id: string, status: string) =>
  put<string>(`/content/v1/Content/UpdateStatus/${id}?contentStatus=${status}`, undefined, "application/json");

export const updatePublishDateContent = async (id: string, publishBefore: string) =>
  put<string>(`/content/v1/Content/UpdatePublishDate/${id}?publishDate=${publishBefore}`, undefined, "application/json");

export const updateSortOrder = async (body: string) => put<string>(`/content/v1/Content/UpdateSortOrder`, body, "application/json");

export const deleteContent = async (id: string) => remove(`/content/v1/Content/Delete/${id}`);

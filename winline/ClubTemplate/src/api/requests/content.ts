import { get, post, put, remove } from "../baseRequest";

export const getContent = async (filterString: string) => get(`${process.env.REACT_APP_CONTENT}/odata/Content?${filterString}`);

export const addContent = async (body: string) =>
  post<string>(`${process.env.REACT_APP_CONTENT}/Content/AddContent`, body, "application/json");

export const addContentImage = async (body: FormData): Promise<string> =>
  post<FormData>(`${process.env.REACT_APP_CONTENT}/Content/AddImage`, body);

export const updateContent = async (id: string, body: string) =>
  put<string>(`${process.env.REACT_APP_CONTENT}/Content/UpdateContent/${id}`, body, "application/json");

export const updateStatusContent = async (id: string, status: string) =>
  put<string>(`${process.env.REACT_APP_CONTENT}/Content/UpdateStatus/${id}?contentStatus=${status}`, undefined, "application/json");

export const updateBeginningPublicationDate = async (id: string, beginningPublishDate: string) =>
  put<string>(
    `${process.env.REACT_APP_CONTENT}/Content/UpdateBeginningPublicationDate/${id}?beginningPublishDate=${beginningPublishDate}`,
    undefined,
    "application/json"
  );

export const updateEndPublicationDate = async (id: string, publishEndDate: string) =>
  put<string>(
    `${process.env.REACT_APP_CONTENT}/Content/UpdateEndPublicationDate/${id}?publishEndDate=${publishEndDate}`,
    undefined,
    "application/json"
  );

export const updateSortOrder = async (body: string) =>
  put<string>(`${process.env.REACT_APP_CONTENT}/Content/UpdateSortOrder`, body, "application/json");

export const deleteContent = async (id: string) => remove(`${process.env.REACT_APP_CONTENT}/Content/DeleteContent/${id}`);

interface IResponseHandler {
  message?: string;
  data?: any;
}

export class ResponseHandler {
  constructor() {}

  public static onError({ message = "Произошла ошибка", data }: IResponseHandler) {
    return {
      status: "error",
      message,
      data,
    };
  }

  public static onSuccess({ message = "Успешно выполнено", data }: IResponseHandler) {
    return {
      status: "success",
      message,
      data,
    };
  }
}

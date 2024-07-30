export const routePaths = {
  base: "/",
  sign: {
    auth: "auth",
    forgotPassword: "forgotPassword",
    //ТЕСТ ПОЛУЧЕНИЕ ТОКЕНА
    recoveryPasswordParams: "recoveryPassword?email=vasya@gmail.com&token=3fa85f64-5717-4562-b3fc-2c963f66afa6",
    recoveryPassword: "recoveryPassword",
    // ТЕСТ ПОЛУЧЕНИЕ ТОКЕНА
    invitationParams: "invitation?name=Василий&email=vasya@gmail.com&token=3fa85f64-5717-4562-b3fc-2c963f66afa6",
    invitation: "invitation",
    updatedMailConfirm: "updatedMailConfirm",
    recoveryPasswordSuccess: "recoveryPassword/success",
    invitationSuccess: "invitation/success",
    recoveryPasswordError: "recoveryPassword/error",
    invitationError: "invitation/error"
  },
  tableContent: {
    employee: "/employees",
    employeeRole: "/employees/role",
    adv: "/adv",
    mobileConfig: "/mobileConfig",
    systemLog: "/systemLog",
    settings: "/settings",
    users: "/users",
    usersNotification: "/users/notifications",
    matches: "/matches",
    story: "/story",
    points: {
      main: "/pointsSystem",
      loyalty: "loyalty",
      poll: "poll",
      products: "products",
      orders: "orders"
    }
  }
};

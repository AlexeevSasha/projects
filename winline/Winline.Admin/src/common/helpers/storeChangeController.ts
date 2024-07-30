export const beforeUnloadObj = {
    isRemember: true,
    userInfo: {},
    userAuthInfo: {},
    beforeUnload() {
      (this.isRemember ? localStorage : sessionStorage).setItem("user_info", JSON.stringify(this.userInfo));
      (this.isRemember ? localStorage : sessionStorage).setItem("auth_data", JSON.stringify(this.userAuthInfo));
    }
  };

  beforeUnloadObj.beforeUnload = beforeUnloadObj.beforeUnload.bind(beforeUnloadObj);
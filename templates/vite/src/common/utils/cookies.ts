type optionsType = { [key: string]: string | number | boolean };

export class Cookies {
  allCookie: string;
  constructor() {
    this.allCookie = document.cookie;
  }

  private static getOptions(options?: optionsType) {
    let option = "";
    for (const key in options) {
      option += "; " + key;
      if (options[key] !== true) {
        option += "=" + options[key];
      }
    }
    return option;
  }

  public setCookie(key: string, value: string, options?: optionsType) {
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}${Cookies.getOptions(options)}`;
  }

  public deleteCookie(key: string, path: string) {
    this.setCookie(key, "", {
      "max-age": -1,
      path,
    });
  }

  public getCookie(name: string) {
    let valueCookie = "";
    this.allCookie.split(";").forEach((el) => {
      const value = el.trim().replace(/.*=/gi, "");
      const key = el.trim().replace(/=.*/gi, "");
      if (key === name) {
        valueCookie = decodeURIComponent(value);
      }
    });
    return valueCookie || undefined;
  }
}

export const cookies = new Cookies();

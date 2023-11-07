class Cookies {
  allCookie;

  constructor() {
    this.allCookie = document.cookie;
  }

   getOptions(options) {
    let option = '';
    for (let key in options) {
      option += "; " + key;
      if (options[key] !== true) {
        option += "=" + options[key];
      }
    }
    return option
  }

    extendCookies(keys=[]) {
      const values = keys.map(key => ({key, value: this.getCookie(key)}))
      values.forEach(({key, value}) => {
          const options = {path: '/','max-age': '31536000'};
          value && this.setCookie(key, value, options)
      })
    }

   setCookie(key, value, options ) {
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}${this.getOptions(options)}`;
  }

  getCookie(name) {
    let valueCookie = '';
    this.allCookie.split(';').forEach((el) => {
      const value = el.trim().replace(/.*=/gi, '');
      const key = el.trim().replace(/=.*/gi, '');
      if (key === name) {
        valueCookie = decodeURIComponent(value);
      }
    });
    return valueCookie || undefined;
  }

   deleteCookie(key, path) {
    this.setCookie(key, '', {
      'max-age': -1,
      path
    })
  }


}

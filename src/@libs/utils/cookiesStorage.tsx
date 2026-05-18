const cookiesStorage = {
  set: (name: string, value: string, days: number = 7): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    document.cookie = cookieString;
  },

  get: (name: string): string | null => {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length);
      }
    }
    return null;
  },

  remove: (name: string): void => {
    cookiesStorage.set(name, "", -1);
  },

  getAll: (): Record<string, string> => {
    const result: Record<string, string> = {};
    document.cookie.split(";").forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");
      if (name) {
        result[name] = value || "";
      }
    });
    return result;
  },

  clear: (): void => {
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      if (name) cookiesStorage.remove(name);
    });
  },
};

export default cookiesStorage;

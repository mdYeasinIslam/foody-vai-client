import Cookies from "js-cookie";

const cookiesStorage = {
  set: (name: string, value: string, days: number): void => {
    Cookies.set(name, value, { expires: days });
  },

  get: (name: string): string | undefined => {
    return Cookies.get(name);
  },

  remove: (name: string): void => {
    Cookies.remove(name);
  },

  getAll: (): Record<string, string> => {
    return Cookies.get() as Record<string, string>;
  },

  clear: (): void => {
    Object.keys(Cookies.get()).forEach((name) => {
      Cookies.remove(name);
    });
  },
};

export default cookiesStorage;

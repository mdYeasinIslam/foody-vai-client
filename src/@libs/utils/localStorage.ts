export const LocalStorage = {
    get: <T>(key: string, defaultValue: T): T => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    },

    set: <T>(key: string, value: T): void => {
        localStorage.setItem(key, JSON.stringify(value));
    },

    remove: (key: string): void => {
        localStorage.removeItem(key);
    },

    clear: (): void => {
        localStorage.clear();
    },
};
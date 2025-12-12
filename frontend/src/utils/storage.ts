export const storage = {
  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      console.error(`Error getting key "${key}" from localStorage:`, error);
      return defaultValue;
    }
  },
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting key "${key}" to localStorage:`, error);
    }
  },
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
  clear: (): void => {
    localStorage.clear();
  },

  has: (key: string): boolean => {
    const item = localStorage.getItem(key);
    return item !== null && item !== "undefined" && item !== "";
  },
};

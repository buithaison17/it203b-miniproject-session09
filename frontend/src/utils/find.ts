export const find = {
  byId: <T extends { id: string }>(data: T[], id: string): T | undefined => {
    return data.find((item) => item.id === id);
  },
  byKey: <T, K extends keyof T>(
    data: T[],
    key: K,
    value: T[K]
  ): T | undefined => {
    return data.find((item) => item[key] === value);
  },
  filterBy: <T, K extends keyof T>(data: T[], key: K, value: T[K]): T[] => {
    return data.filter((item) => item[key] === value);
  },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const storeInSession = (key: string, value: any) => {
  sessionStorage.setItem(key, value);
};

export const lookInSession = (key: string) => {
  return sessionStorage.getItem(key);
};

export const removeFromSession = (key: string) => {
  return sessionStorage.removeItem(key);
};

export const logoutUser = () => {
  sessionStorage.clear();
};

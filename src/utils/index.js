import { LOCAL_STORAGE_AUTH_KEY, ROLE } from "./constant";
export const get_auth_key = () => {
  return window.btoa(LOCAL_STORAGE_AUTH_KEY);
};

export const storeData = (key, value) => {
  localStorage.setItem(key, window.btoa(value));
};

export const getStoredData = (key) => {
  if (localStorage.getItem(key)) {
    return window.atob(localStorage.getItem(key));
  } else {
    return null;
  }
};

export const deleteStoredData = (key) => {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
  return true;
};

export const validateEmail = (mail) => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    )
  ) {
    return true;
  }
  return false;
};

export const encrypt = (value) => {
  return window.btoa(value);
};

export const isAdmin = () => {
  let flag = false;
  try {
    let udata = JSON.parse(getStoredData(get_auth_key()));
    if (udata) {
      let role = (udata.role || "").toLowerCase();
      switch (role) {
        case ROLE.ADMIN: {
          flag = true;
          break;
        }
        default: {
          flag = false;
        }
      }
    } else {
      flag = false;
    }
  } catch (e) {
    flag = false;
  }
  return flag;
};

export const _deepClone = (data) => {
  if (Array.isArray(data)) {
    return data.map((dt) => {
      return _deepClone(dt);
    });
  } else if (data instanceof Function) {
    return data;
  } else if (data instanceof Date) {
    return data;
  } else if (data instanceof Object) {
    let temp = {};
    Object.keys(data).forEach((key) => {
      temp[key] = _deepClone(data[key]);
    });
    return temp;
  } else {
    return data;
  }
};

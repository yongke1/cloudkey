/**
 * 存储localStorage/sessionStorage
 */
const setStore = (name, content, deep) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  if (deep) {
    window.localStorage.setItem(name, content);
  } else {
    window.sessionStorage.setItem(name, content);
  }
};

/**
 * 获取localStorage/sessionStorage
 */
const getStore = (name, deep) => {
  if (!name) return;
  if (deep) {
    return window.localStorage.getItem(name);
  } else {
    return window.sessionStorage.getItem(name);
  }
};

export const deepCopy = (obj) => {
  if (obj === null) {
    return null
  } else if ({}.toString.call(obj) === "[object Array]") {
    return JSON.parse(JSON.stringify(obj));
  }
  var newObj = {};
  for (var key in obj) {
    //如果原对象中当前属性值是原始类型
    if (typeof obj[key] !== "object") {
      newObj[key] = obj[key];
    } else { //否则当前类型不是原始类型的值，再次调用clone函数，继续复制当前属性值
      newObj[key] = deepCopy(obj[key]);
    }
  }
  return newObj;
}

// 抛出
export default {
  setStore,
  getStore,
  deepCopy
}
import { CONSTANTS } from "../constants.js";
import lzString from "lz-string";

/**
 * 로컬 스토리지 저장
 * @param {string} key
 * @param {string | object} value
 */
const setLocalStorage = (key, value) => {
  if (typeof key === "string") {
    if (typeof value === "object") {
      value = makeJson(value);
    }
    const compData = lzString.compressToUTF16(value);
    window.localStorage.setItem(key, compData);
  } else {
    console.error(CONSTANTS.KEY_LIST.ALERT_LIST.INVALID_PARAM);
  }
};

/**
 * 로컬 스토리지에서 데이터 불러오기
 * @param {string} key
 * @returns {undefined|string}
 */
const getLocalStorage = key => {
  if (typeof key === "string") {
    const compData = window.localStorage.getItem(key);
    return lzString.decompressFromUTF16(compData);
  } else {
    console.error(CONSTANTS.KEY_LIST.ALERT_LIST.INVALID_PARAM);
    return undefined;
  }
};

/**
 * 로컬 스토리지 데이터 삭제
 * @param {string} key
 */
const removeLocalStorage = key => {
  if (typeof key === "string") {
    window.localStorage.removeItem(key);
  }
};

/**
 * json 형태 만들기
 * @param {any} value
 * @returns {string}
 */
const makeJson = value => {
  return JSON.stringify(value);
};

/**
 * 원래 형태로 복구
 * @param {string} value
 * @returns {any}
 */
const parseJson = value => {
  if (typeof value === "string") {
    return JSON.parse(value);
  } else {
    console.error(CONSTANTS.KEY_LIST.ALERT_LIST.INVALID_PARAM);
    return undefined;
  }
};

/**
 * 데이터 빈값 체크
 * @param {object} form
 * @returns {boolean}
 */
const checkForm = form => {
  if (form) {
    for (let item in form) {
      if (isCheckNull(form[item])) {
        return false;
      }
    }
  }
  return true;
};

//form{}, msg list
const checkFormToList = (form, msg) => {
  if (form) {
    for (let item in form) {
      if (isCheckNull(form[item])) {
        return false;
      }
    }
  }
};

/**
 * 타겟의 빈값 체크
 * @param {any} target
 * @returns {boolean}
 */
const isCheckNull = target => {
  return !(target === null || target === "" || target === undefined);
};

const logOutUser = () => {
  const u = getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO);
  const ut = getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO_TOKEN);
  if (u && ut) {
    //console.log("remove");
    removeLocalStorage(CONSTANTS.KEY_LIST.USER_INFO);
    removeLocalStorage(CONSTANTS.KEY_LIST.USER_INFO_TOKEN);
  }
};

const getImgUrl = fileName => {
  if (fileName && typeof fileName === "string") {
    return CONSTANTS.FILE_SERVER + fileName;
  }
};

export default {
  getLocalStorage,
  setLocalStorage,
  makeJson,
  parseJson,
  checkForm,
  isCheckNull,
  logOutUser,
  removeLocalStorage,
  getImgUrl,
};

import axios from "axios";
import { CONSTANTS } from "../constants.js";
import commonUtil from "./common-util.js";

// const store = useStore();

const axiosInstance = axios.create({
  baseURL: CONSTANTS.API_URL,
  timeout: 1000 * 60 * 3,
  headers: { "contents-type": "Json" },
});

axiosInstance.interceptors.request.use(
  config => {
    dispatchEvent(
      new CustomEvent(CONSTANTS.KEY_LIST.EVENT_LIST.LOADING, {
        detail: CONSTANTS.KEY_LIST.EVENT_MESSAGE.PROCESS,
      }),
    );
    //console.log("pending..");
    return config;
  },
  e => {
    if (CONSTANTS.DEVELOP) console.error(e);
    return Promise.reject(e);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    dispatchEvent(
      new CustomEvent(CONSTANTS.KEY_LIST.EVENT_LIST.LOADING, {
        detail: CONSTANTS.KEY_LIST.EVENT_MESSAGE.COMPLETE,
      }),
    );
    //console.log("complete");
    return config;
  },
  e => {
    if (CONSTANTS.DEVELOP) console.error(e);
    return Promise.reject(e);
  },
);

/**
 *
 * @param url
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const apiClient = async (url, data) => {
  const t = commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO_TOKEN);
  if (t) setHeader(t);
  return await axiosInstance
    .post(url, data)
    .then(res => {
      if (res.status === 200) {
        return res.data;
      } else {
        return undefined;
      }
    })
    .catch(e => {
      // throw e
      console.error(e);
    });
};

export const setHeader = v => {
  if (axiosInstance && typeof v === "string") {
    axiosInstance.defaults.headers.common["Authorization"] = v;
  }
};

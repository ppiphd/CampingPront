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
    console.log("API 요청:", config.method.toUpperCase(), config.url, config.data);
    dispatchEvent(
      new CustomEvent(CONSTANTS.KEY_LIST.EVENT_LIST.LOADING, {
        detail: CONSTANTS.KEY_LIST.EVENT_MESSAGE.PROCESS,
      }),
    );
    //console.log("pending..");
    return config;
  },
  e => {
    if (CONSTANTS.DEVELOP) console.error("API 요청 에러:", e);
    return Promise.reject(e);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    console.log("API 응답:", response.status, response.config.url, response.data);
    dispatchEvent(
      new CustomEvent(CONSTANTS.KEY_LIST.EVENT_LIST.LOADING, {
        detail: CONSTANTS.KEY_LIST.EVENT_MESSAGE.COMPLETE,
      }),
    );
    //console.log("complete");
    return response;
  },
  e => {
    console.error("API 응답 에러:", e.config?.url, e.message);
    if (e.response) {
      console.error("API 응답 상태:", e.response.status);
      console.error("API 응답 데이터:", e.response.data);
    }
    if (CONSTANTS.DEVELOP) console.error(e);
    return Promise.reject(e);
  },
);

/**
 *
 * @param url
 * @param data
 * @param method
 * @returns {Promise<AxiosResponse<any>>}
 */
export const apiClient = async (url, data, method) => {
  const t = commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO_TOKEN);
  if (t) setHeader(t);

  try {
    let response;
    // 명시적으로 메소드를 지정한 경우
    if (method === "get") {
      console.log("GET 요청으로 처리:", url);
      response = await axiosInstance.get(url, { params: data });
    }
    // gocamping 관련 요청은 항상 POST로 처리 (서버 측 구현과 일치)
    else if (url.includes("gocamping")) {
      console.log("gocamping POST 요청으로 처리:", url);
      response = await axiosInstance.post(url, data);
    }
    // 기본 POST 요청
    else {
      response = await axiosInstance.post(url, data);
    }

    if (response.status === 200) {
      return response.data;
    } else {
      console.warn("API 응답이 200이 아님:", response.status, url);
      return undefined;
    }
  } catch (e) {
    console.error("API 호출 실패:", url, e.message);
    throw e;
  }
};

export const setHeader = v => {
  if (axiosInstance && typeof v === "string") {
    axiosInstance.defaults.headers.common["Authorization"] = v;
  }
};

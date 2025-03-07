import { createStore, useStore } from "vuex";
import { apiClient } from "../utils/axios.js";

export const STORE_TYPE = {
  isLoading: "isLoading",
  popupType: "popupType",
  loginUserIdx: "loginUserIdx",
  contentData: "contentData",
  boardIdx: "boardIdx",
  commentIdx: "commentIdx",
  campingIdx: "campingIdx",
  sideBar: "sideBar",
  comparisonSideBar: "comparisonSideBar",
  detailData: "detailData",
  targetOne: "targetOne",
  targetTwo: "targetTwo",
};

export const POPUP_TYPE = {
  NONE: "NONE",
  WRITE_BOARD: "WRITE_BOARD",
  DETAIL_SCREEN: "DETAIL_SCREEN",
  REPORT: "REPORT",
  UPDATE: "UPDATE",
  PRODUCT_DETAIL: "PRODUCT_DETAIL",
  PRODUCT_WRITE: "PRODUCT_WRITE",
  DETAIL_CAMPING: "DETAIL_CAMPING",
  USER_RREF: "USER_PREFENCE",
};

const store = createStore({
  state: {
    isLoading: false,
    popupType: POPUP_TYPE.NONE,
    loginUserIdx: "",
    contentData: [],
    boardIdx: "",
    commentIdx: "",
    popupList: [],
    campingIdx: undefined,
    sideBar: false,
    comparisonSideBar: false,
    detailData: [],
    targetOne: "",
    targetTwo: "",
  },
  mutations: {
    /**
     * @param {store} state
     * @param {boolean} value
     */
    isLoading(state, value) {
      state.isLoading = value;
    },
    /**
     * @param {store} state
     * @param {POPUP_TYPE} value
     */
    popupType(state, value) {
      state.popupType = value;
    },
    /**
     * @param {store} state
     * @param {string} value
     */
    loginUserIdx(state, value) {
      state.loginUserIdx = value;
    },
    /**
     *
     * @param {store} state
     * @param {string} value
     */
    contentData(state, value) {
      state.contentData = value;
    },
    /**
     *
     * @param {store} state
     * @param {string} value
     */
    commentIdx(state, value) {
      state.commentIdx = value;
    },
    /**
     *
     * @param {store} state
     * @param {string} value
     */
    boardIdx(state, value) {
      state.boardIdx = value;
    },
    campingIdx(state, value) {
      state.campingIdx = value;
    },
    sideBar(state, value) {
      state.sideBar = value;
    },
    detailData(state, value) {
      state.detailData = value;
    },
    comparisonSideBar(state, value) {
      state.comparisonSideBar = value;
    },
    targetOne(state, value) {
      state.targetOne = value;
    },
    targetTwo(state, value) {
      state.targetTwo = value;
    },
  },
});

export default store;
//
// export default createStore({
// 	state: {
// 		isLoading: false,
// 	},
// 	mutations: {
// 		isLoading(value) {
// 			//value : boolean;
// 			state.boardDetail.scss = value;
// 		},
// 	},
// });
// const _store = useStore();

export const getStore = () => {
  return store;
};

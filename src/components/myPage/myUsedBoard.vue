<script>
import { onMounted, ref } from "vue";
import { apiClient } from "../../utils/axios.js";
import customPagination from "../layout/customPagination.vue";
import commonUtil from "../../utils/common-util.js";
import { CONSTANTS } from "../../constants.js";
import store, { POPUP_TYPE, STORE_TYPE } from "../../store/index.js";

export default {
  name: "myUsedBoard",
  components: { customPagination },
  setup() {
    const profileInfo = ref({});
    const contentData = ref({});
    const file = ref("");

    const getData = async () => {
      profileInfo.value = await commonUtil.parseJson(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO));
      const data = await apiClient("product/getProductList", { userIdx: profileInfo.value.userIdx });
      if (data) contentData.value = data.data;
    };

    const getImgUrl = file => {
      return commonUtil.getImgUrl(file.fileName);
    };

    const openDetail = productIdx => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.PRODUCT_DETAIL);
      store.commit(STORE_TYPE.boardIdx, productIdx);
    }; //게시물 상세 페이지 팝업 열기

    onMounted(() => {
      getData();
    });

    return {
      contentData,
      page: 1,
      file,
      getImgUrl,
      openDetail,
    };
  },
};
</script>

<template>
  <div class="contents-area-li">
    <div class="contents-box" v-for="item in contentData">
      <div class="contents-img-wrap" @click="openDetail(item.productIdx)">
        <img :src="getImgUrl(item.file[0])" alt="" />
      </div>
    </div>
    <div class="empty-box" />
    <div class="empty-box" />
  </div>
</template>

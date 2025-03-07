<script>
import {onMounted, onUnmounted, ref} from "vue";
import {apiClient} from "../../utils/axios.js";
import customPagination from "../layout/customPagination.vue";
import commonUtil from "../../utils/common-util.js";
import customModal from "../layout/customModal.vue";
import store, {POPUP_TYPE, STORE_TYPE} from "../../store/index.js";

export default {
  name: "buyComponent",
  components: {customModal, customPagination},
  setup() {
    const postData = ref({});

    const handleSearch = e => {
      if (e.detail) {
        keyword = e.detail;
      }
      getData();
    };
    const sortHandleSearch = e => {
      if (e.detail) {
        sorted.value = e.detail;
      }
      getData();
    };

    let keyword = "";
    const sorted = ref();
    const getData = async () => {
      let param = {keyword: keyword, productType: "BUY", sorted: "RECENT"};
      if (sorted.value !== null && sorted.value !== undefined) {
        param = Object.assign({}, param, {sorted: sorted.value}); //ob 내장함수 합침
        param.sorted = sorted.value;
      }
      //todo 상품데이터 담기
      const data = await apiClient("product/getProductList", param);
      if (data) postData.value = data.data;
    };

    const getImgUrl = file => {

      return commonUtil.getImgUrl(file.fileName);
    };
    const allScroll = document.querySelector("html");
    const openDetail = productIdx => {
      allScroll.style.overflow = "hidden";
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.PRODUCT_DETAIL);
      store.commit(STORE_TYPE.boardIdx, productIdx);
    }; //게시물 상세 페이지 팝업 열기

    onMounted(() => {
      getData();
      window.addEventListener("PRODUCTSEARCH", handleSearch);
      window.addEventListener("SORTDATA", sortHandleSearch);
    });
    onUnmounted(() => {
      window.removeEventListener("PRODUCTSEARCH", handleSearch);
      window.removeEventListener("SORTDATA", sortHandleSearch);
    });

    const isModal = ref(false);
    const modalControl = state => (isModal.value = state);

    return {
      openDetail,
      postData,
      getData,
      modalControl,
      isModal,
      getImgUrl,
    };
  },
};
</script>

<template>
  <div class="used-contents-area">
    <div class="used-contents-area-ul">
      <div class="used-post" v-for="item in postData" @click="openDetail(item.productIdx)">
        <div class="used-post-img-wrap">
          <img :src="getImgUrl(item.file[0])" alt="Posts"/>
        </div>
        <div class="used-post-info">
          <div class="used-post-info-title">{{ item.productName }}</div>
          <div class="used-post-info-seller-name">{{ item.userNickName }}</div>
          <div class="used-post-info-contents">{{ item.productDes }}</div>
          <div class="used-post-info-coast">{{ item.productPrice.toLocaleString() }}</div>
          <div class="used-post-info-footer">
            <div class="used-post-info-footer-date">
              <img src="/assets/image/icon/time.webp" alt=""/>
              <a>{{ item.dateReg.slice(5, 10) }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <custom-modal v-if="isModal" @close="modalControl(false)"/>
  </div>
</template>

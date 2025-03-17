<script>
import store, { getStore, STORE_TYPE, POPUP_TYPE } from "../../store/index.js";
import { onMounted, ref, watch } from "vue";
import writeBoardPopup from "./popups/writeBoardPopup.vue";
import ReportPopup from "./popups/reportPopup.vue";
import UpdateBoardPopup from "./popups/updateBoardPopup.vue";
import ProductDetailPopup from "./popups/productDetailPopup.vue";
import ProductWritePopup from "./popups/productWritePopup.vue";
import userPreferencePopup from "./popups/userPreferencePopup.vue";

export default {
  name: "popupManager",
  components: {
    ProductWritePopup,
    ProductDetailPopup,
    UpdateBoardPopup,
    ReportPopup,
    writeBoardPopup,
    userPreferencePopup,
  },
  setup() {
    const store = getStore();
    const isPopup = ref(store.state.popupType);
    // const PopupList = ref(store.state.popupList);
    const allScroll = document.querySelector("html");
    const clickClose = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.NONE);
      // window.location.reload();
      allScroll.style.overflow = "visible";
    };

    const goDetail = () => {
      //취소 누르면 디테일 창 뜨게

      store.commit(STORE_TYPE.popupType, POPUP_TYPE.DETAIL_SCREEN);
    };

    watch(
      () => store.state.popupType,
      () => {
        isPopup.value = store.state.popupType;
        // PopupList.value.push(store.state.popupList);
      },
    );

    return {
      // PopupList,
      store,
      isPopup,
      POPUP_TYPE,
      clickClose,
      goDetail,
    };
  },
};
</script>
<template>
  <div class="popup-manager">
    <div class="black" @click.prevent.stop="clickClose()"></div>
    <writeBoardPopup
      v-if="isPopup === POPUP_TYPE.WRITE_BOARD"
      :clickClose="clickClose"
      :go-detail="goDetail"
    ></writeBoardPopup>
    <!--    <report-popup v-if="isPopup === POPUP_TYPE.REPORT " :click-close="clickClose" :go-detail="goDetail"></report-popup>-->
    <!--    <UpdateBoardPopup v-if="isPopup === POPUP_TYPE.UPDATE " :click-close="clickClose"></UpdateBoardPopup>-->
    <ProductDetailPopup v-if="isPopup === POPUP_TYPE.PRODUCT_DETAIL" :clickClose="clickClose" />
    <ProductWritePopup v-if="isPopup === POPUP_TYPE.PRODUCT_WRITE" :clickClose="clickClose" />
    <userPreferencePopup v-if="isPopup === POPUP_TYPE.USER_RREF" :clickClose="clickClose"></userPreferencePopup>
  </div>
</template>

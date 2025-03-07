<script>
import CustomButton from "../components/layout/customButton.vue";
import {onMounted, ref} from "vue";
import sellComponent from "../components/usedMarket/sellComponent.vue";
import buyComponent from "../components/usedMarket/buyComponent.vue";
import chat from "../components/chat.vue";
import store, {POPUP_TYPE, STORE_TYPE} from "../store/index.js";
import commonUtil from "../utils/common-util.js";
import {CONSTANTS} from "../constants.js";
import {apiClient} from "../utils/axios.js";
import CustomSelect from "../components/layout/customSelect.vue";

export default {
  name: "usedMarket",
  components: {CustomSelect, sellComponent, buyComponent, CustomButton, chat},
  setup() {
    const loginUser = ref(undefined);
    const tabType = {
      SELL: "sell",
      BUY: "buy",
    }; // 컴포넌트 이름

    const tabIndex = ref(tabType.SELL);

    const componentChange = v => {
      tabIndex.value = v;
    };
    const allScroll = document.querySelector("html");
    const openWrite = () => {
      allScroll.style.overflow = "hidden";
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.PRODUCT_WRITE);

    }; //글쓰기 팝업열기
    const sortValue = ref();
    const SORT_TYPE = {
      RECENT: "RECENT",
      LONG: "LONG",
      EXPENSIVE: "EXPENSIVE",
      CHEAP: "CHEAP",
    };
    const selectSortData = [
      {key: SORT_TYPE.RECENT, value: "최근순"},
      {key: SORT_TYPE.LONG, value: "오래된순"},
      {key: SORT_TYPE.EXPENSIVE, value: "가격 높은순"},
      {key: SORT_TYPE.CHEAP, value: "가격 낮은순"},
    ];
    const sortUpdateValue = v => {
      sortValue.value = v;
      getData();
    };

    const inquiryProductData = ref({keyword: "", sorted: "RECENT"});
    const getData = async () => {
      inquiryProductData.value = Object.assign({}, inquiryProductData.value, {sorted: sortValue.value});
      dispatchEvent(new CustomEvent("SORTDATA", {detail: inquiryProductData.value.sorted}));

      const data = await apiClient("product/getProductList", inquiryProductData.value);
      dispatchEvent(new CustomEvent("PRODUCTSEARCH", {detail: inquiryProductData.value.keyword}));
    };
    const handleEnterEvent = (e) => {
      if (e.key === "Enter") {
        getData();
      }
    };
    const handleMouseEvent = (e) => {
      if (e.type === "mousedown") {
        inquiryProductData.value.keyword = "";
      }
    };


    onMounted(() => {
      const d = commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO);
      if (d)
        loginUser.value = JSON.parse(d);

    });

    return {
      loginUser,
      tabType,
      tabIndex,
      inquiryProductData,
      sortValue,
      selectSortData,
      sortUpdateValue,
      handleEnterEvent,
      handleMouseEvent,
      componentChange,
      openWrite,
      getData,
    };
  },
};
</script>

<template>
  <div class="used-market">
    <div class="used-title">
      <span>USED MARKET</span>
      <div class="used-component-change">
        <custom-button
            :placeholder="'팝니다'"
            :onClick="() => componentChange(tabType.SELL)"
            :custom-class="tabIndex === tabType.SELL ? 'active' : ''"
        />
        <custom-button
            :placeholder="'삽니다'"
            :onClick="() => componentChange(tabType.BUY)"
            :custom-class="tabIndex === tabType.BUY ? 'active' : ''"
        />
      </div>
      <div class="used-title-search">
        <input placeholder="상품 찾아보기" v-model="inquiryProductData.keyword" @keydown="handleEnterEvent"
               @mousedown="handleMouseEvent">
        <button @click="getData"><i class="fa-solid fa-magnifying-glass"/></button>
      </div>

    </div>
    <div class="used-banner">
      <div class="used-banner-popup">
        <customSelect @update:value="sortUpdateValue" :data="selectSortData"></customSelect>
      </div>
      <custom-button :placeholder="'글쓰기'" @click="openWrite()"/>
    </div>
    <div class="used-contents-area">
      <sell-component :sortValue="sortValue" v-if="tabIndex === tabType.SELL"/>
      <buy-component v-else-if="tabIndex === tabType.BUY"/>
    </div>
  </div>
  <chat v-if="loginUser"></chat>
</template>

<script>
import { onMounted, ref } from "vue";
import PopupManager from "../App.vue";
import store, { POPUP_TYPE, STORE_TYPE } from "../store/index.js";
import profile from "../components/snsBoard/profile.vue";
import snsContentPage from "../components/snsBoard/snsContentPage.vue";
import { apiClient } from "../utils/axios.js";
import customInput from "../components/layout/customInput.vue";

export default {
  name: "snsPage",
  components: {
    snsContentPage,
    PopupManager,
    profile,
    customInput,
  },
  setup() {
    const inquiryData = ref({ showType: "ALL", keyword: "", hashKeyWord: "" });
    const getContent = async () => {
      const data = await apiClient("/sns/getSnsList", inquiryData.value);
      if (dispatchEvent(new CustomEvent("SEARCH", { detail: inquiryData.value.keyword }))) {
        if (inquiryData.value.keyword[0] === "#") {
          inquiryData.value.hashKeyWord = inquiryData.value.keyword.replace("#", "");
        }
        inquiryData.value.hashKeyWord = "";
      }
    };
    const handleEnterEvent = (e) => {
      if (e.key === "Enter") {
        getContent();
      }
    };
    const handleMouseEvent = (e) => {
      if (e.type === "mousedown") {
        inquiryData.value.keyword = "";
      }
    };
    const reload = () => {
      window.location.reload();
    };


    return {
      inquiryData,
      reload,
      handleMouseEvent,
      handleEnterEvent,
      getContent,
    };
  },
};
</script>
<template>
  <div class="news">
    <div class="news-wrap">
      <div class="news-wrap-contents">
        <h1 class="news-wrap-contents-title" @click="reload">소식</h1>
        <h5 class="news-wrap-contents-ment">다른 캠퍼의 소식을 들어 보아요!</h5>
      </div>
      <!--      <hr class="line"/>-->
      <div class="news-wrap-search">
        <input placeholder="태그, 장소 찾아보기" v-model="inquiryData.keyword" @mousedown="handleMouseEvent"
               @keydown="handleEnterEvent">
        <button @click="getContent"><i class="fa-solid fa-magnifying-glass" /></button>
      </div>
    </div>
    <sns-content-page />
  </div>
</template>

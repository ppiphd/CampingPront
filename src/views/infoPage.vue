<script>
import router from "../router/index.js";
import customInput from "../components/layout/customInput.vue";
import customButton from "../components/layout/customButton.vue";
import snsPage from "./snsPage.vue";
import myPage from "./myPage.vue";
import { apiClient } from "../utils/axios.js";
import { onMounted, ref } from "vue";
import CustomLoading from "../components/layout/customLoading.vue";
// import {e} from "../../dist/assets/index.a54a7291.js";
import HeaderPage from "../components/headerPage.vue";
import customSelect from "../components/layout/customSelect.vue";
import CustomDatePicker from "../components/layout/customDatePicker.vue";
import customPagination from "../components/layout/customPagination.vue";
import campingInfo from "./campingInfo.vue";
import SideBar from "../components/sideBar.vue";

export default {
  name: "mainPage",
  components: {
    SideBar,
    CustomDatePicker,
    customSelect,
    CustomLoading,
    customInput,
    customButton,
    snsPage,
    myPage,
    HeaderPage,
    customPagination,
    campingInfo,
  },

  setup() {

    const isShow = ref(true);
    const back = () => {
      isShow.value = !isShow.value;
    };

    const goToX = v => {
      v ? router.push(v) : window.alert("준비중입니다.");
    };


    return {


      goToX,
      back,
      isShow,

    };
  },
};
</script>

<template>
  <!--  <script type="text/javascript"-->
  <!--          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=8cd7ea967a72d603b3fd12c735e76a49"></script>-->
  <!--  <div id="map" style="width:500px;height:400px;"></div>-->
  <div class="info-main">
    <header-page></header-page>
    <!--    <side-bar></side-bar>-->
    <h1 class="det-title">멋진 여행을 기대하고 계신가요?</h1>
    <!--    <div class="info-serch">-->
    <!--      <custom-input placeholder="캠핑장 검색"></custom-input>-->
    <!--      <span>-->
    <!--                <img src="/assets/image/icon/search.webp" alt=""/>-->
    <!--              </span>-->
    <!--    </div>-->

    <!--    <div class="info-box">-->
    <!--      <div class="info-shapbox">-->
    <!--        <a class="info-shap" @click="mok"> #목포 </a>-->
    <!--        <a class="info-shap" @click="su"> #서울 </a>-->
    <!--        <a class="info-shap" @click="dj"> #대전 </a>-->
    <!--        <a class="info-shap" @click="dgu"> #대구 </a>-->
    <!--        <a class="info-shap" @click="bu"> #부산 </a>-->
    <!--      </div>-->
    <!--      <div class="info-shapbox" v-for="item in tagList">-->
    <!--        <a class="info-shap" :href="item.link" @click="mok">-->
    <!--          {{ item.name }}-->
    <!--        </a>-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    <div class="date-box">-->
    <!--      <div class="date-pic">-->
    <!--        <custom-date-picker ref="입실일 선택"></custom-date-picker>-->
    <!--      </div>-->
    <!--      <div class="date-pick">-->
    <!--        <custom-date-picker/>-->
    <!--      </div>-->
    <!--    </div>-->

  </div>
  <div class="info-camp">
    <div class="info-content">
      <campingInfo></campingInfo>
    </div>
  </div>
  <!--  <div class="info-pagination">-->
  <!--    <custom-pagination></custom-pagination>-->
  <!--  </div>-->
</template>

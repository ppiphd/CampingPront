<script>
import {onMounted, ref} from "vue";
import axios from "axios";
import store, {POPUP_TYPE, STORE_TYPE} from "../store/index.js";
import {useStore} from "vuex";
import customInput from "../components/layout/customInput.vue";
import ComparisonSideBar from "../components/comparisonSideBar.vue";
import router from "../router/index.js";
import {apiClient} from "../utils/axios.js";

export default {
  name: "campingInfo",
  components: {ComparisonSideBar, customInput},

  setup() {
    const store = useStore();

    // const oneca = ref("일반야영장");

    const page = ref(1); //페이지 장

    //로딩바
    // api.interceptors.request.use(())

    const index = ref(0);

    const keyword = ref("");
    const value = ref("");
    const dataList = ref([]);
    // const dataLList = ref([]);
    //페이지네이션

    const isAnimal = ref(false);

    const setRowCount = value => {
      page.value = value;
      getCampInfo();
      window.scrollTo(0, 0);
      // console.log(dataList.value);
    };
    const getData = async () => {
      if (dataList.value && dataList.value.length > 0) dataList.value = []; //초기화
    };
    const getCampInfo = async () => {
      if (dataList.value && dataList.value.length > 0) dataList.value = []; //초기화

      // console.log(url);
      const d = await apiClient("/camping/getCampingList", {
        page: page.value,
        keyWord: keyword.value,
        isAnimal: isAnimal.value,
      });

      if (d.data && d.data.length > 0) {
        dataList.value = d.data;
        console.log(d.data);
      }
    };

    const showDetail = data => {
      const path = "/campingDetail/" + data.campingIdx;
      router.push(path);
      // store.commit(STORE_TYPE.popupType, POPUP_TYPE.DETAIL_CAMPING);
    };

    const comparisonAction = item => {
      store.commit(STORE_TYPE.comparisonSideBar, true);
      if (store.state.targetOne === "" && store.state.targetTwo === "") {
        store.commit(STORE_TYPE.targetOne, item);
      } else if (store.state.targetOne) {
        store.commit(STORE_TYPE.targetTwo, item);
      } else {
        store.commit(STORE_TYPE.comparisonSideBar, false);
      }
    };

    const reSet = () => {
      location.reload(true);
    };

    //테스트존
    function test() {
      document.getElementById("keyword").value = "";
    }

    /**
     *
     * @type {{value : Array}}
     */

    // const setDataList = (value = {});
    function myFunction() {
      let k = document.getElementById("input").value;
      // console.log(k.value);
      setKeyword(k);
    }

    const goToX = v => {
      v ? router.push(v) : window.alert("준비중입니다.");
    };
    const setKeyword = k => {
      keyword.value = k;
      // console.log(k)
      getCampInfo();
    };
    const reload = () => {
      window.location.reload();
    };

    onMounted(() => {
      getCampInfo();
      // getCampInfo();
    });
    return {
      dataList,
      showDetail,
      setRowCount,
      page,
      index,
      store,
      comparisonAction,
      // startTest,
      reload,
      myFunction,
      setKeyword,
      getCampInfo,
      reSet,
      test,
      goToX,
      // oneca,
      // getCampserch,
      // goLink,
    };
  },
};
</script>
<template>
  <section class="camp-info" :style="store.state.comparisonSideBar ? { width: '50%', margin: '0 0 0 auto' } : ''">
    <span class="te" @click="reload">캠핑테마</span>
    <div class="search">
      <span><i class="fa-solid fa-magnifying-glass"></i></span>
      <!--    <input type="text" @input="onchange($event)">-->
      <input id="input" type="text" @input="myFunction"/>
    </div>
    <!--    <span class="selec">테마를 선택해주세요!</span>-->
    <div class="main-icon">
      <a @click="setKeyword('카라반')">
        <img src="/assets/image/icon/categoryCaravane.webp" alt=""/>
        <span>카라반</span>
      </a>

      <a @click="setKeyword('글램핑')">
        <img src="/assets/image/icon/categoryGlamping.webp" alt=""/>
        <span>글램핑</span>
      </a>

      <a @click="setKeyword('오토캠핑')">
        <img src="/assets/image/icon/categoryAutoCamping.webp" alt=""/>
        <span>오토캠핑</span>
      </a>

      <a @click="setKeyword('키즈')">
        <img src="/assets/image/icon/categoryKids.webp" alt=""/>
        <span>키즈</span>
      </a>
    </div>
    <div class="info-body" v-if="dataList && dataList.length > 0">
      <!--      <div class="search-wrapper">-->
      <!--      </div>-->
      <div class="info-item" v-for="(item, index) in dataList">
        <a @click="showDetail(item)" class="item-front">
          <div class="camp-type">
            <span>
              {{ item.campingManageMode }}
            </span>
          </div>
          <img :src="item.thumbnailUrl ? item.thumbnailUrl : '/assets/image/infologo.png'" alt="main"
          /></a>

        <div class="camp-list">
          <div class="name">{{ item.campingName }}</div>
          <div class="des">
            <span>{{ item.campingIntro }}</span>
          </div>

          <div class="info-inner">
            <div class="info-add">
              <span class="info-type" v-if="item.campingType">캠핑 타입 :{{ item.campingType }}</span>
            </div>
            <div class="info-ad">
              <span>주소 : {{ item.address }}</span>
            </div>
            <div class="info-ph">
              <span>전화번호 : {{ item.tel }}</span>
            </div>
            <div class="info-btn">
              <button @click="comparisonAction(item)">비교하기</button>
            </div>

            <!--            <div class="info-ph">-->
            <!--              <span>{{ item.getInAnimal }} </span>-->
            <!--            </div>-->
            <!--            <div class="info-ph">-->
            <!--              <span>지역 : {{ item.doNm }} </span>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
      <div class="page-nation">
        <!--        <button @click="setRowCount(1)"><i class="fa-solid fa-angles-left"></i></button>-->
        <button v-if="index + page - 10 > 0" @click="setRowCount(index + page - 10)">
          <i class="fa-solid fa-angles-left"></i>
        </button>
        <button v-if="index + page - 1 > 0" @click="setRowCount(index + page - 1)">
          <i class="fa-solid fa-angle-left"></i>
        </button>
        <button v-if="0 < index - 2 + page" @click="setRowCount(index - 2 + page)">{{ index - 2 + page }}</button>
        <button v-if="0 < index - 1 + page" @click="setRowCount(index - 1 + page)">{{ index - 1 + page }}</button>
        <button v-if="index + page > 0" @click="setRowCount(index + page)">
          <span class="current-page">{{ index + page }}</span>
        </button>
        <button v-if="index + 1 + page < 332" @click="setRowCount(index + 1 + page)">{{ index + 1 + page }}</button>
        <button v-if="index + 2 + page < 332" @click="setRowCount(index + 2 + page)">{{ index + 2 + page }}</button>
        <button v-if="index + page + 1 < 332" @click="setRowCount(index + page + 1)">
          <i class="fa-solid fa-angle-right"></i>
        </button>
        <button v-if="index + page + 10 < 332" @click="setRowCount(index + page + 10)">
          <i class="fa-solid fa-angles-right"></i>
        </button>
        <!--        <button @click="setRowCount(331)"><i class="fa-solid fa-angles-right"></i></button>-->
      </div>
      <!--      <a href=""></a>-->
    </div>
    <!--    <div v-else>...데이터를 불러오는 중...</div>-->
  </section>
  <comparison-side-bar v-if="store.state.comparisonSideBar"/>
</template>

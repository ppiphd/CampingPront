<script>
import { onMounted, ref } from "vue";
import axios from "axios";
import store, { POPUP_TYPE, STORE_TYPE } from "../store/index.js";
import { useStore } from "vuex";
import customInput from "../components/layout/customInput.vue";
import ComparisonSideBar from "../components/comparisonSideBar.vue";
import router from "../router/index.js";
import { apiClient } from "../utils/axios.js";
import { CONSTANTS } from "../constants.js";

export default {
  name: "campingInfo",
  components: { ComparisonSideBar, customInput },

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
    const totalPages = ref(332); // 전체 페이지 수
    const isLoading = ref(false); // 로딩 상태

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

      try {
        isLoading.value = true; // 로딩 시작

        if (CONSTANTS.USE_LOCAL_DATA) {
          // 로컬 샘플 데이터 사용 (서버에 있는 camping 라우터의 데이터)
          const d = await apiClient("/camping/getCampingList", {
            page: page.value,
            keyWord: keyword.value,
            isAnimal: isAnimal.value,
          });

          if (d.data && d.data.length > 0) {
            dataList.value = d.data;
            totalPages.value = d.totalPages || 5; // 샘플 데이터는 5페이지로 가정
            console.log("캠핑장 데이터:", d.data);
          } else {
            console.log("검색 결과가 없습니다.");
            dataList.value = []; // 결과가 없을 경우 배열 초기화
          }
        } else {
          // GoCamping API 사용
          const d = await apiClient("/gocamping/getCampingList", {
            page: page.value,
            keyWord: keyword.value,
            isAnimal: isAnimal.value,
          });

          if (d.data && d.data.length > 0) {
            dataList.value = d.data;
            totalPages.value = d.totalPages || 332; // API에서 받은 전체 페이지 수로 업데이트
            console.log("캠핑장 데이터:", d.data);
          } else {
            console.log("검색 결과가 없습니다.");
            dataList.value = []; // 결과가 없을 경우 배열 초기화
          }
        }
      } catch (error) {
        console.error("캠핑장 데이터 로딩 실패:", error);
        alert("캠핑장 정보를 불러오는데 실패했습니다. 다시 시도해주세요.");
      } finally {
        isLoading.value = false; // 로딩 종료
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
      page.value = 1; // 검색 시 첫 페이지로 이동
      getCampInfo();
    };
    const reload = () => {
      window.location.reload();
    };

    const toggleAnimalFilter = () => {
      isAnimal.value = !isAnimal.value;
      page.value = 1; // 필터 변경 시 첫 페이지로 이동
      getCampInfo();
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
      isAnimal,
      toggleAnimalFilter,
      totalPages,
      isLoading,
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
      <input id="input" type="text" @input="myFunction" placeholder="캠핑장 이름, 유형, 지역으로 검색" />
    </div>
    <!--    <span class="selec">테마를 선택해주세요!</span>-->
    <div class="main-icon">
      <a @click="setKeyword('카라반')">
        <img src="/assets/image/icon/categoryCaravane.webp" alt="" />
        <span>카라반</span>
      </a>

      <a @click="setKeyword('글램핑')">
        <img src="/assets/image/icon/categoryGlamping.webp" alt="" />
        <span>글램핑</span>
      </a>

      <a @click="setKeyword('오토캠핑')">
        <img src="/assets/image/icon/categoryAutoCamping.webp" alt="" />
        <span>오토캠핑</span>
      </a>

      <a @click="setKeyword('키즈')">
        <img src="/assets/image/icon/categoryKids.webp" alt="" />
        <span>키즈</span>
      </a>

      <!-- 반려동물 필터 추가 -->
      <a @click="toggleAnimalFilter()" :class="{ active: isAnimal }">
        <img src="/assets/image/icon/categoryPet.webp" alt="" />
        <span>반려동물{{ isAnimal ? " ✓" : "" }}</span>
      </a>
    </div>

    <!-- 로딩 표시 -->
    <div v-if="isLoading" class="loading-container">
      <p>캠핑장 정보를 불러오는 중입니다...</p>
    </div>

    <!-- 데이터가 있을 때 정보 표시 -->
    <div class="info-body" v-else-if="dataList && dataList.length > 0">
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
              <span class="info-type" v-if="item.campingType">캠핑 타입: {{ item.campingType }}</span>
            </div>
            <div class="info-ad">
              <span>주소: {{ item.address }}</span>
            </div>
            <div class="info-ph">
              <span>전화번호: {{ item.tel }}</span>
            </div>
            <div class="info-ph" v-if="item.getInAnimal">
              <span>반려동물: {{ item.getInAnimal }}</span>
            </div>
            <div class="info-ph" v-if="item.doNm">
              <span>지역: {{ item.doNm }} {{ item.sigunguNm }}</span>
            </div>
            <div class="info-btn">
              <button @click="comparisonAction(item)">비교하기</button>
            </div>
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
        <button v-if="index + 1 + page < totalPages" @click="setRowCount(index + 1 + page)">
          {{ index + 1 + page }}
        </button>
        <button v-if="index + 2 + page < totalPages" @click="setRowCount(index + 2 + page)">
          {{ index + 2 + page }}
        </button>
        <button v-if="index + page + 1 < totalPages" @click="setRowCount(index + page + 1)">
          <i class="fa-solid fa-angle-right"></i>
        </button>
        <button v-if="index + page + 10 < totalPages" @click="setRowCount(index + page + 10)">
          <i class="fa-solid fa-angles-right"></i>
        </button>
        <!--        <button @click="setRowCount(331)"><i class="fa-solid fa-angles-right"></i></button>-->
      </div>
      <!--      <a href=""></a>-->
    </div>
    <!-- 데이터가 없을 때 메시지 표시 -->
    <div v-else-if="!isLoading" class="no-results">
      <p>검색 결과가 없습니다. 다른 검색어를 입력해보세요.</p>
    </div>
  </section>
  <comparison-side-bar v-if="store.state.comparisonSideBar" />
</template>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #666;
}

.main-icon a.active {
  color: #4caf50;
  font-weight: bold;
}
</style>

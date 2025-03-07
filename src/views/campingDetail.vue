<script>
import {useStore} from "vuex";
import {computed, nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import store, {STORE_TYPE} from "../store/index.js";
import router from "../router/index.js";
import commonUtil from "../utils/common-util.js";
import {apiClient} from "../utils/axios.js";
import kakaoMap from "../components/kakaoMap.vue";
import {useRoute} from "vue-router";

export default {
  name: "campingDetail",
  components: {kakaoMap},
  setup() {
    const route = useRoute();
    const campingIdx = ref("");
    // todo 기상청, 카카오지도, 캠핑 세부정보
    const campingInfo = ref([]);

    /**
     * 유저가 조회한 캠핑 로그 수집
     * @param campingIdx 캠핑 고유번호
     * @returns {Promise<void>}
     */

        // console.log(infoAp())

    const insertCampingViewLog = async campingIdx => {
          if (campingIdx) {
            const d = await apiClient("/camping/insertSearchLog", {campingIdx: campingIdx});
            // console.log(d);
          }
        };

    const getCampingData = async () => {
      const c = route.path.split("/")[2];
      campingIdx.value = c;

      const d = await apiClient("/camping/getCampingList", {campingIdx: c});
      // console.log(d);
      if (d.data) {
        campingInfo.value = d.data[0];
      }
    };

    onMounted(() => {
      // todo 주석 살리면됨
      getCampingData();
      // if (campInfo && campInfo.campingIdx) {
      //   insertCampingViewLog(campInfo.campingIdx);
      // }
    });

    return {
      campingInfo,
      campingIdx,
    };
  },
};
</script>
<template>
  <section class="detail-camping" v-if="campingInfo">


    <!--todo    지도-->

    <!--    <div id="map" style="width: 55%; height: 350px; margin: 0 auto; z-index: 0"></div>-->


    <div class="go-camping">
      <!--      <div class="camp-type">-->
      <img :src="campingInfo ? campingInfo.thumbnailUrl : '/assets/image/infologo.png'" alt="main"/>
      <div class="name">{{ campingInfo.campingName }}</div>
      <div class="des">{{ campingInfo.campingIntro }}</div>
      <span>
        {{ campingInfo.campingManageMode }}캠핑장
      </span>
      <!--      </div>-->
      
      <div>캠핑 타입 :{{ campingInfo.campingType }}</div>
      <div>캠핑 테마 :{{ campingInfo.campingTheme }}</div>
      <div>주소 : {{ campingInfo.address }}</div>
      <div>전화번호 : {{ campingInfo.tel ? campingInfo.tel : "홈페이지를 방문해주세요" }}</div>
      <div>운영여부 : {{ campingInfo.isOpen }}</div>
      <div>예약방법 : {{ campingInfo.reserve_type ? campingInfo.reserve_type : "예약페이지나 홈페이지를1 방문해주세요" }}</div>
      <div>생성일 : {{ campingInfo.createData }}</div>
      <div>우리글램핑 시설은 이런것들이있어요! : {{ campingInfo.glampOption ? campingInfo.glampOption : '글램핑시설이없어요..ㅠ ' }}</div>
      <div>우리카라반 시설은 이런것들이있어요! : {{ campingInfo.caravOption ? campingInfo.caravOption : '카라반시설이없어요..ㅠ ' }}</div>
      <div><a :href="campingInfo.reserve_url">클릭! 예약하러가기~</a></div>
      <div><a :href="campingInfo.homePageUrl">홈페이지 방문하기</a></div>
    </div>
    <h1 class="det-title">{{ campingInfo.campingName }} 위치</h1>
    <kakaoMap/>
  </section>
</template>

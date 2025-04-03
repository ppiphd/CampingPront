<script>
import { useStore } from "vuex";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import store, { STORE_TYPE } from "../store/index.js";
import router from "../router/index.js";
import commonUtil from "../utils/common-util.js";
import { apiClient } from "../utils/axios.js";
import kakaoMap from "../components/kakaoMap.vue";
import { useRoute, useRouter } from "vue-router";
import goTo from "vuetify/lib/services/goto";

export default {
  name: "campingDetail",
  components: { kakaoMap },
  setup() {
    const route = useRoute();
    const router = useRouter();
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
        const d = await apiClient("/camping/insertSearchLog", { campingIdx: campingIdx });
        // console.log(d);
      }
    };

    const getCampingData = async () => {
      // params에서 ID 추출, 예: /campingDetail/100025에서 100025 추출
      const campingId = route.params.campingIdx || route.path.split("/")[2] || "";
      campingIdx.value = campingId;

      console.log("요청할 캠핑장 ID:", campingId);

      // ID가 "getCampingList"인 경우 또는 ID가 없는 경우 처리
      if (!campingId || campingId === "getCampingList") {
        console.error("올바르지 않은 캠핑장 ID:", campingId);
        alert("올바른 캠핑장 ID가 필요합니다.");
        router.push("/infoPage"); // 메인 페이지로 리다이렉트
        return;
      }

      try {
        // 캠핑장 목록 API를 호출하여 특정 ID로 바로 필터링
        console.log(`캠핑장 정보 가져오기: /gocamping/getCampingList (ID: ${campingId})`);
        const response = await apiClient("/gocamping/getCampingList", {
          keyWord: "야영장", // 기본 키워드 제공 (필수 파라미터)
          campingIdx: campingId, // ID를 직접 전달하여 서버에서 필터링
          numOfRows: 100, // 한 페이지에 많은 결과를 가져오도록 설정
        });

        console.log("응답 받음:", response);

        if (response && response.data && response.data.length > 0) {
          // 응답에서 첫 번째 아이템 사용 (이미 서버에서 필터링됨)
          campingInfo.value = response.data[0];
          console.log("캠핑장 상세 정보 수신 성공:", campingInfo.value);

          // 조회 로그 수집
          insertCampingViewLog(campingId);
        } else {
          console.error("캠핑장 정보가 없습니다:", JSON.stringify(response));
          alert(`폐업한 캠핑장입니다 ㅠㅠ`);
          // 페이지 전환 시 부드러운 전환을 위해 nextTick 사용
          nextTick(() => {
            setTimeout(() => {
              router.push({
                path: "/infoPage",
                // 페이지 전환 시 스크롤 위치 등 상태 유지
                replace: true,
              });
            }, 100);
          });
        }
      } catch (error) {
        console.error("캠핑장 상세 정보 로딩 실패:", error);
        if (error.response) {
          console.error("오류 응답:", error.response.status, error.response.data);
        }
        alert("캠핑장 상세 정보를 불러오는데 실패했습니다. 다시 시도해주세요.");
        nextTick(() => {
          setTimeout(() => {
            router.push({
              path: "/infoPage",
              replace: true,
            });
          }, 100);
        });
      }
    };

    onMounted(() => {
      getCampingData();
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

    <!-- <div id="map" style="width: 500px; height: 400px"></div> -->
    <!-- <div id="map" style="width: 55%; height: 350px; margin: 0 auto; z-index: 0"></div> -->

    <div class="go-camping">
      <img :src="campingInfo.thumbnailUrl ? campingInfo.thumbnailUrl : '/assets/image/infologo.png'" alt="main" />
      <div class="name">{{ campingInfo.campingName }}</div>
      <div class="des">{{ campingInfo.campingIntro }}</div>
      <span>
        {{ campingInfo.campingManageMode }}
      </span>

      <div v-if="campingInfo.campingType">캠핑 타입: {{ campingInfo.campingType }}</div>
      <div v-if="campingInfo.address">주소: {{ campingInfo.address }}</div>
      <div v-if="campingInfo.tel">전화번호: {{ campingInfo.tel || "홈페이지를 방문해주세요" }}</div>
      <div v-if="campingInfo.operPdCl">운영기간: {{ campingInfo.operPdCl }}</div>
      <div v-if="campingInfo.operDeCl">운영일: {{ campingInfo.operDeCl }}</div>
      <div v-if="campingInfo.resveCl">
        예약방법: {{ campingInfo.resveCl || "예약페이지나 홈페이지를 방문해주세요" }}
      </div>
      <div v-if="campingInfo.sbrsCl">부대시설: {{ campingInfo.sbrsCl }}</div>
      <div v-if="campingInfo.posblFcltyCl">주변이용가능시설: {{ campingInfo.posblFcltyCl }}</div>
      <div v-if="campingInfo.getInAnimal">반려동물: {{ campingInfo.getInAnimal }}</div>

      <div v-if="campingInfo.homepage">
        <a :href="campingInfo.homepage" target="_blank" rel="noopener noreferrer">홈페이지 방문하기</a>
      </div>
      <div v-if="campingInfo.resveUrl">
        <a :href="campingInfo.resveUrl" target="_blank" rel="noopener noreferrer">예약 페이지 이동</a>
      </div>

      <!-- 이미지 갤러리 추가 -->
      <div v-if="campingInfo.images && campingInfo.images.length > 0" class="image-gallery">
        <h3>캠핑장 이미지</h3>
        <div class="images-container">
          <img
            v-for="(image, index) in campingInfo.images"
            :key="index"
            :src="image"
            alt="캠핑장 이미지"
            class="gallery-image"
          />
        </div>
      </div>
    </div>
    <h1 class="det-title">{{ campingInfo.campingName }} 위치</h1>
    <kakaoMap
      v-if="campingInfo.latitude && campingInfo.longitude"
      :latitude="campingInfo.latitude"
      :longitude="campingInfo.longitude"
    />
  </section>
</template>

<style scoped>
.detail-camping {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.go-camping {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
}

.go-camping img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.des {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}

.go-camping > div {
  margin-bottom: 10px;
  line-height: 1.6;
  color: #444;
}

.go-camping a {
  display: inline-block;
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 5px;
  transition: background-color 0.3s;
}

.go-camping a:hover {
  background-color: #45a049;
}

.image-gallery {
  margin-top: 30px;
}

.image-gallery h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
}

.images-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.gallery-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.gallery-image:hover {
  transform: scale(1.05);
}

.det-title {
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0;
  color: #333;
}

#map {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  margin-bottom: 30px;
}
</style>

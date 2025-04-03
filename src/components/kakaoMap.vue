<script>
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "kakaoMap",
  props: {
    latitude: {
      type: String,
      default: "",
    },
    longitude: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const map = ref(null);
    const markers = ref([]);
    const mapLoaded = ref(false);
    const loadingError = ref(null);
    const loadingMessage = ref("카카오맵을 불러오는 중입니다...");
    const route = useRoute();

    // 지도 초기화 함수
    const initMap = () => {
      const mapElement = document.getElementById("map");
      if (!mapElement) {
        console.log("지도를 표시할 요소가 없습니다");
        loadingError.value = "지도를 표시할 요소가 없습니다";
        return;
      }

      try {
        if (!window.kakao || !window.kakao.maps) {
          console.error("카카오맵 API가 로드되지 않았습니다");
          loadingError.value = "카카오맵을 불러오는데 실패했습니다";
          return;
        }

        console.log("지도 초기화 시작", { latitude: props.latitude, longitude: props.longitude });

        // 마커 배열 초기화
        markers.value = [];

        // 지도 옵션 설정
        const options = {
          center: new kakao.maps.LatLng(37.566826, 126.570667), // 기본 중심좌표
          level: 3, // 지도의 확대 레벨
        };

        // 지도 생성
        map.value = new kakao.maps.Map(mapElement, options);

        // 지도 컨트롤 추가
        const zoomControl = new kakao.maps.ZoomControl();
        map.value.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 지도 타입 컨트롤러 추가
        const mapTypeControl = new kakao.maps.MapTypeControl();
        map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 위도와 경도가 전달된 경우 해당 위치로 지도 이동
        if (props.latitude && props.longitude) {
          const lat = parseFloat(props.latitude);
          const lng = parseFloat(props.longitude);

          console.log("캠핑장 위치 표시:", lat, lng);

          if (!isNaN(lat) && !isNaN(lng)) {
            // 캠핑장 위치 생성
            const campingPosition = new kakao.maps.LatLng(lat, lng);

            // 지도 중심 이동
            map.value.setCenter(campingPosition);

            // 마커 이미지 설정
            const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
            const imageSize = new kakao.maps.Size(24, 35);
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커 생성
            const marker = new kakao.maps.Marker({
              position: campingPosition,
              map: map.value,
              image: markerImage,
            });

            markers.value.push(marker);

            // 인포윈도우 생성
            const infowindow = new kakao.maps.InfoWindow({
              content: `<div style="padding:5px;font-size:12px;font-weight:bold;">캠핑장 위치</div>`,
            });

            infowindow.open(map.value, marker);

            // 마커 클릭 이벤트 리스너 등록
            kakao.maps.event.addListener(marker, "click", function () {
              infowindow.open(map.value, marker);
            });
          }
        }

        mapLoaded.value = true;
        loadingMessage.value = "";
      } catch (error) {
        console.error("카카오맵 초기화 중 오류 발생:", error);
        loadingError.value = "지도 초기화 중 오류가 발생했습니다";
      }
    };

    // 위치 속성이 변경될 때 지도 다시 초기화
    watch(
      () => [props.latitude, props.longitude],
      () => {
        if (props.latitude && props.longitude) {
          nextTick(() => {
            initMap();
          });
        }
      },
    );

    onMounted(() => {
      // 카카오 API가 이미 로드되어 있는지 확인하고 초기화
      if (window.kakao && window.kakao.maps) {
        // 이미 로드된 상태이면 바로 초기화
        initMap();
      } else {
        // 로드 대기 (index.html에서 로드 중인 경우)
        loadingMessage.value = "카카오맵 API 로드 대기 중...";
        let checkCount = 0;
        const checkInterval = setInterval(() => {
          checkCount++;
          if (window.kakao && window.kakao.maps) {
            clearInterval(checkInterval);
            initMap();
          } else if (checkCount >= 20) {
            // 10초 후에도 로드되지 않으면 에러 표시
            clearInterval(checkInterval);
            loadingError.value = "카카오맵을 불러오는데 실패했습니다";
            console.error("카카오맵 API 로드 타임아웃");
          }
        }, 500);
      }
    });

    return {
      loadingError,
      loadingMessage,
      mapLoaded,
    };
  },
};
</script>
<template>
  <div class="map-box">
    <div id="map" style="width: 100%; height: 400px; border-radius: 15px; position: relative"></div>
    <div v-if="loadingError" class="map-error">
      {{ loadingError }}
    </div>
    <div v-else-if="!loadingError && !mapLoaded" class="map-loading">
      {{ loadingMessage }}
    </div>
  </div>
</template>

<style scoped>
.map-box {
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
  position: relative;
}

.map-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px 15px;
  border-radius: 5px;
  color: #e74c3c;
  font-weight: bold;
  text-align: center;
}

.map-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px 15px;
  border-radius: 5px;
  color: #3498db;
  font-weight: bold;
  text-align: center;
}
</style>

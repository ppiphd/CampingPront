<script>
import { ref, onMounted, defineProps, defineEmits } from "vue";

export default {
  name: "KakaoMap",
  props: {
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "캠핑장",
    },
  },
  setup(props) {
    const mapLoaded = ref(false);
    const map = ref(null);
    const marker = ref(null);

    // Kakao Maps API 로드
    const loadKakaoMapScript = () => {
      return new Promise((resolve, reject) => {
        // 이미 로드된 경우 바로 resolve
        if (window.kakao && window.kakao.maps) {
          console.log("Kakao Maps API already loaded");
          mapLoaded.value = true;
          resolve();
          return;
        }

        // script 요소 생성 및 src 설정
        const script = document.createElement("script");
        const apiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;
        console.log("Kakao Map API Key (first few chars):", apiKey ? apiKey.substring(0, 5) + "..." : "undefined");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
        script.async = true;

        // 스크립트 로드 성공 시
        script.onload = () => {
          // Kakao Maps SDK 초기화
          window.kakao.maps.load(() => {
            console.log("Kakao Maps API loaded successfully");
            mapLoaded.value = true;
            resolve();
          });
        };

        // 스크립트 로드 실패 시
        script.onerror = error => {
          console.error("Failed to load Kakao Maps API:", error);
          reject(new Error("Failed to load Kakao Maps API"));
        };

        // body에 스크립트 추가
        document.body.appendChild(script);
      });
    };

    // 지도 초기화
    const initMap = async () => {
      try {
        if (!mapLoaded.value) {
          await loadKakaoMapScript();
        }

        const latitude = parseFloat(props.latitude);
        const longitude = parseFloat(props.longitude);

        if (isNaN(latitude) || isNaN(longitude)) {
          console.error("Invalid coordinates:", props.latitude, props.longitude);
          return;
        }

        console.log("Initializing map with coordinates:", latitude, longitude);

        const container = document.getElementById("kakao-map");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        map.value = new window.kakao.maps.Map(container, options);

        // 마커 생성
        marker.value = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(latitude, longitude),
          map: map.value,
        });

        // 인포윈도우 생성
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${props.location}</div>`,
        });

        // 마커에 인포윈도우 표시
        infowindow.open(map.value, marker.value);

        // 지도 컨트롤 추가
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.value.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        console.log("Map initialized successfully");
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    onMounted(async () => {
      console.log("Component mounted, initializing map...");
      await initMap();
    });

    return {
      map,
      marker,
    };
  },
};
</script>

<template>
  <div>
    <div id="kakao-map" style="width: 100%; height: 400px"></div>
  </div>
</template>

<style scoped>
#kakao-map {
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}
</style>

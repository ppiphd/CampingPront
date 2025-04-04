import { createApp } from "vue";
// import '../src/assets/css/app.css';
// import '../src/assets/css/app.css.map';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dayjs from "dayjs";
// import "./assets/css/app.css";

// 앱 시작 시 카카오맵 스크립트 로드
function loadKakaoMapScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_API_KEY
    }&libraries=services&autoload=false`;

    script.onload = () => {
      console.log("카카오맵 스크립트 로드 완료 (main.js)");
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          console.log("카카오맵 API 초기화 완료 (main.js)");
          resolve();
        });
      } else {
        console.error("카카오 객체가 존재하지 않음 (main.js)");
        reject(new Error("카카오 객체가 존재하지 않음"));
      }
    };

    script.onerror = e => {
      console.error("카카오맵 스크립트 로드 실패 (main.js):", e);
      reject(e || new Error("스크립트 로드 실패"));
    };

    document.head.appendChild(script);
  });
}

// 카카오맵 로드 후 앱 마운트
loadKakaoMapScript()
  .then(() => {
    createApp(App).use(router).use(store).mount("#app");
    createApp(dayjs);
  })
  .catch(error => {
    console.error("카카오맵 로드 중 오류 발생 (main.js):", error);
    // 오류가 발생해도 앱은 계속 실행
    createApp(App).use(router).use(store).mount("#app");
    createApp(dayjs);
  });

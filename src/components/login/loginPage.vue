<script>
import HeaderPage from "../headerPage.vue";
import FooterPage from "../footerPage.vue";
import router from "../../router/index.js";
import store, { POPUP_TYPE, STORE_TYPE } from "../../store/index.js";
import { ref } from "vue";
import axios from "axios";

export default {
  name: "loginPage",
  components: {
    HeaderPage,
    FooterPage,
  },
  setup() {
    const email = ref("");
    const pw = ref("");

    const goToSample = () => router.push("/samplePage");
    const goToSungmi = () => router.push("/newsPage");
    const goToSignup = () => router.push("/signupPage");
    const goToPop = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.WRITE_BOARD);
    };

    const isPopup = ref(store.state.popupType);

    const onLogin = () => {
      axios
        .post("/api/login", {
          userEmail: email.value,
          userPassword: pw.value,
        })
        .then(res => {
          console.log("로그인 성공:", res.data);
          // 로그인 성공 시 동작 추가
          // 예: 토큰 저장, 페이지 이동 등
        })
        .catch(error => {
          console.error("로그인 실패:", error);
          alert("로그인에 실패했습니다.");
        });
    };

    return {
      email,
      pw,
      goToSample,
      goToSungmi,
      goToSignup,
      goToPop,
      isPopup,
      onLogin,
    };
  },
};
</script>

<template>
  <!--  <button @click="goToSample">샘플 페이지 가기</button>-->
  <!--  <button @click="goToSungmi">성미 페이지 가기</button>-->
  <!--  <button @click="goToPop">팝업창 열기</button>-->
  <!--  <p class="tip"></p>-->
  <div class="cont">
    <form action="" method="post" class="login-main">
      <!--      <img src="/public/assets/image/login-background.webp" alt="">-->
      <div class="login-form">
        <div>img</div>
        <h2>Bears</h2>
        <h2>로그인 해볼까요?</h2>
        <label>
          <span>Email</span>
          <input type="email" placeholder="이메일" id="email" required />
        </label>
        <label>
          <span>Password</span>
          <input type="password" placeholder="비밀번호" id="pw" required />
        </label>

        <div class="submit">
          <button @click="signupPage" class="sig-btn">회원가입</button>
          <button type="button" @click="onLogin">로그인</button>
        </div>
        <p class="forgot-pass">아이디/비밀번호 찾기</p>
      </div>
      <div class="sns-login">SNS 계정으로 간편 로그인/회원가입</div>
      <div class="sns-img">
        <a href=""><img src="/assets/image/face.webp" alt="페이스북" /></a>
      </div>
    </form>
  </div>
</template>

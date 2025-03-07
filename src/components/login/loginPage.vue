<script>
import HeaderPage from "../headerPage.vue";
import FooterPage from "../footerPage.vue";
import signupPage from "./signupPage.vue";
import router from "../../router/index.js";
import store, {POPUP_TYPE, STORE_TYPE} from "../../store/index.js";
import {ref} from "vue";
import axios from "axios";

// import {ref} from "vue";

export default {
  name: "loginPage",
  components: {FooterPage, HeaderPage, signupPage},
  setup() {
    const goToSample = () => {
      router.push("/samplePage");
    };
    const goToSungmi = () => {
      router.push("/newsPage");
    }
    const signupPage = () => {
      router.push("/signupPage");
    }
    const isPopup = ref(store.state.popupType)

    const goToPop = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.WRITE_BOARD)
    }
    const onLogin = () => {
      const userEmail = document.getElementById("email");
      const userPassword = document.getElementById("pw")
      axios({
        method: 'post',
        url: '/camp-api.calf.kr',
        data: {
          userEmail: '',
          userPassword: ''
        }
      }).then((res) => {
         res);
      }).catch(error => {
         error);
        throw new Error(error);
      });
    }

    return {
      goToSample, goToSungmi, signupPage, goToPop, isPopup, onLogin,
    };
  }

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
          <input type="email" placeholder="이메일" id="email" required/>
        </label>
        <label>
          <span>Password</span>
          <input type="password" placeholder="비밀번호" id="pw" required/>
        </label>

        <div class="submit">
          <button @click="signupPage" class="sig-btn">회원가입</button>
          <button type="button" @click="onLogin">로그인</button>
        </div>
        <p class="forgot-pass">아이디/비밀번호 찾기</p>

      </div>
      <div class="sns-login">SNS 계정으로 간편 로그인/회원가입</div>
      <div class="sns-img">
        <a href=""><img src="/assets/image/face.webp" alt="페이스북"></a>
      </div>
    </form>
  </div>

</template>


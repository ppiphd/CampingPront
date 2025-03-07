<script>
import router from "../router/index.js";
import commonUtil from "../utils/common-util.js";
import { ref, watch } from "vue";
import { CONSTANTS } from "../constants.js";
import store from "../store/index.js";

export default {
  name: "footerPage",
  setup() {
    const footerMenu = [
      {
        name: "회사소개",
        key: "INTRO",
      },
      {
        name: "인재채용",
        key: "TAKE",
      },
      {
        name: "제휴제안",
        key: "PROPOSAL",
      },
      {
        name: "이용약관",
        key: "TERMS",
      },
      {
        name: "개인정보처리방침",
        key: "PERSONAL",
      },
      {
        name: "청소년보호정책",
        key: "POLICY",
      },
      {
        name: "베어스 고객센터",
        key: "SERVICE",
        style: { borderRight: "none" },
      },
    ];
    const loginUser = ref(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO));
    const terms = v => {
      window.alert("준비중입니다.");
    };
    //로그아웃
    const logOut = () => {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        commonUtil.logOutUser();
        window.location.replace("/");
        location.reload();
      }
    };
    watch(
      () => store.state.loginUserIdx,
      () => {
        loginUser.value = commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO);
      },
    );
    return {
      footerMenu,
      loginUser,
      logOut,
      terms,
    };
  },
};
</script>
<template>
  <footer class="footer">
    <div class="footer-bar">
      <div class="footer-bar-wrap">
        <nav class="footer-bar-wrap-nav">
          <span class="footer-bar-wrap-nav-menu" @click="terms" v-for="item in footerMenu">{{ item.name }}</span>
          <a v-if="loginUser" @click="logOut()">로그아웃</a>
        </nav>
      </div>
      <div class="footer-bar-info">
        <div class="footer-bar-info-logo">
          <img src="/assets/image/logo.png" alt="" />
          <span>CAMP BEARS</span>
        </div>
      </div>
    </div>
  </footer>
</template>

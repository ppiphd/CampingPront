<script>
import router from "../router/index.js";
import { ref, watch } from "vue";
import { CONSTANTS } from "../constants.js";
import commonUtil from "../utils/common-util.js";
import store, { STORE_TYPE } from "../store/index.js";
import sideBar from "../components/sideBar.vue";

export default {
  name: "headerPage",
  components: {
    sideBar,
  },
  setup() {
    const loginUser = ref(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO));
    //상단 헤더 리스트
    const headerBarList = [
      {
        name: "커뮤니티",
        key: "SNS",
        target: "/snsPage",
      },
      {
        name: "중고거래",
        key: "MARKET",
        target: "/usedMarket",
      },
      {
        name: "캠핑장",
        key: "BOARD",
        target: "/infoPage",
      },
    ];
    //router 이동
    const goToX = v => {
      v ? router.push(v) : window.alert("준비중입니다.");
    };

    //로그아웃
    const logOut = () => {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        commonUtil.logOutUser();
        window.location.replace("/");
        location.reload();
      }
    };
    const checkUser = () => {
      if (!loginUser.value) {
        window.alert("로그인 하세요.");
        router.push("/login");
      } else {
        router.push("/myPage");
      }
    };
    const headerContainerAction = ref(false);
    const HeaderContainer = () => {
      store.commit(STORE_TYPE.sideBar, true);
    }; //전체 메뉴

    watch(
      () => store.state.loginUserIdx,
      () => {
        loginUser.value = commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO);
      },
    );

    return {
      headerBarList,
      loginUser,
      // headerContainerAction,
      store,
      checkUser,
      goToX,
      logOut,
      HeaderContainer,
    };
  },
};
</script>
<template>
  <header class="header">
    <div class="header-bar">
      <div class="mainContainer" @click="HeaderContainer">
        <label class="mainContainer-label">
          <i class="fa-solid fa-bars"></i>
        </label>
      </div>
      <div class="header-bar-logo" @click="goToX('/')">
        <img src="/assets/image/logo.png" alt="" />
        <span class="mb-hide">CAMP BEARS</span>
      </div>
      <div class="header-bar-mbLogo" @click="goToX('/')">
        <img src="/assets/image/mblogo.png" alt="" />
      </div>
      <div class="header-bar-myPage" @click="checkUser">
        <i class="fa-regular fa-user"></i>
      </div>
      <div class="header-bar-menu">
        <div class="header-bar-menu-login">
          <ul>
            <li v-if="!loginUser">
              <a @click="goToX('/login')">로그인</a>
              <a @click="goToX('/signup')"> 회원가입 </a>
            </li>
            <li v-else>
              <a @click="logOut()">로그아웃</a>
              <a @click="goToX(`/myPage`)"> 마이페이지</a>
            </li>
          </ul>
        </div>
        <div class="header-bar-menu-info">
          <div class="container">
            <input type="checkbox" class="container-trigger" />
            <label class="container-trigger-label">
              <i class="fa-solid fa-bars"></i>
            </label>
          </div>
          <nav class="header-bar-menu-info-list">
            <a class="btnef" v-for="item in headerBarList" @click="goToX(item.target)">{{ item.name }}</a>
          </nav>
          <!--            <div class="header-bar-menu-info-search">-->
          <!--              <input type="text" />-->
          <!--              <i class="fa-solid fa-magnifying-glass"></i>-->
          <!--            </div>-->
        </div>
      </div>
    </div>
  </header>
  <sideBar v-if="store.state.sideBar" />
</template>

<script>
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import commonUtil from "../utils/common-util.js";
import { CONSTANTS } from "../constants.js";
import router from "../router/index.js";
import store, { STORE_TYPE } from "../store/index.js";

export default {
  name: "sideBar",
  setup() {
    const flag = ref(false);
    const userData = ref({
      file: {},
    });
    const profileImg = ref("assets/image/profileImg.webp");
    const isActive = ref(false);

    const menuList = [
      { name: "커뮤니티", url: "/snsPage" },
      { name: "중고마켓", url: "/usedMarket" },
      { name: "캠핑장", url: "/infoPage" },
      { name: "로그아웃", url: "" },
    ];

    const goToX = target => {
      closePopup();
      router.push(target);
    };
    const closePopup = () => {
      store.commit(STORE_TYPE.sideBar, false);
    };
    const checkUser = () => {
      if (!userData.value) {
        window.alert("로그인 하세요.");
        router.push("/login");
      } else {
        router.push("/myPage");
      }
      closePopup();
    };

    const getProfileImg = file => {
      try {
        return commonUtil.getImgUrl(file.fileName);
      } catch (e) {
        return "/assets/image/profileImg.webp";
      }
    };

    onMounted(() => {
      flag.value = store.state.sideBar;
      const ud = commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO);
      if (ud) {
        userData.value = commonUtil.parseJson(ud);
      }
      setTimeout(() => {
        isActive.value = true;
      }, 10);
    });

    onUnmounted(() => {});

    watch(
      () => store.state.sideBar,
      () => {
        console.log(flag.value);
        flag.value = store.state.sideBar;
      },
    );

    return {
      userData,
      profileImg,
      flag,
      menuList,
      isActive,
      checkUser,
      goToX,
      closePopup,
      getProfileImg,
    };
  },
};
</script>
<template>
  <Transition>
    <div class="side-bar" @click="closePopup">
      <div class="body" :class="{ active: isActive }" @click.prevent.stop="">
        <i @click="closePopup" class="fa-solid fa-xmark"></i>
        <div class="profile-area">
          <img :src="getProfileImg(userData.file[0])" alt="profileImg" />
          <div>{{ userData ? userData.userNickName : "손님" }}</div>
          <i @click="checkUser" class="fa-solid fa-pen"></i>
        </div>
        <hr />
        <div class="menu-area">
          <div @click="goToX(item.url)" class="menu" v-for="item in menuList">
            {{ item.name }}
          </div>
        </div>
        <div class="footer">
          <span> 약관 </span>
          <span> 개인정보처리방침 </span>
        </div>
      </div>
    </div>
  </Transition>
</template>

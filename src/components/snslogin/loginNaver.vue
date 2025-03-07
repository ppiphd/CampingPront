<script>
import {nextTick, onMounted, onUnmounted} from "vue";
import LoginKakao from "./loginKaKao.vue";
import {useRoute} from "vue-router";

export default {
  name: "loginNaver",
  components: {LoginKakao},
  setup() {
    onMounted(() => {
      const naver_id_login = new window.naver_id_login("OkM9Pejxzz2VszesqaQP", "http://localhost:3001/#/auth");
      const state = naver_id_login.getUniqState();
      naver_id_login.setButton("white", 2, 40);
      naver_id_login.setDomain("YOUR_SERVICE_URL");
      naver_id_login.setState(state);
      // naver_id_login.setPopup();
      naver_id_login.init_naver_id_login();
    });
  }
};
</script>
<template>
  <div id="naver_id_login"></div>
  <login-kakao/>
</template>

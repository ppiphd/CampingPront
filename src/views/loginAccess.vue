<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  name: "auth",
  setup() {
    const userData = ref();
    onMounted(() => {
      const naver_id_login = new window.naver_id_login("OkM9Pejxzz2VszesqaQP", "http://localhost:3001/#/auth");
      // 네이버 사용자 프로필 조회
      const url = "/me";
      const header = "Bearer " + naver_id_login.oauthParams.access_token;
      axios.get(url, { headers: { Authorization: header } }).then(res => {
        //변조X jwt-token, http protocol
        if (res.status === 200) {
          userData.value = res.data.response;
          //console.log(userData.value);
        }
      });
    });
    return { userData };
  },
};
</script>
<template>
  <div>Login Access Pages</div>
  {{ userData }}
  <!--  <div id="naverIdLogin" style="display: none"></div>-->
</template>

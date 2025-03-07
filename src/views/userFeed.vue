<script>
import { apiClient } from "../utils/axios.js";
import { nextTick, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import commonUtil from "../utils/common-util.js";

export default {
  name: "userFeed",
  setup() {
    const route = useRoute();
    const userData = ref();
    const userIdx = ref();
    const profileImg = ref("/assets/image/profileImg.webp");
    const backProfile = ref("/assets/image/backgroundImg.webp");

    const setUserIdx = () => {
      userIdx.value = route.path.split("/")[2];
    };
    const getTargetUserInfo = async () => {
      const d = await apiClient("/user/getUserInfo", { userIdx: userIdx.value });
      if (d.data) {
        userData.value = d.data;
        if (d.data.file && d.data.file.length > 0) {
          d.data.file.map(v => {
            if (v.fileType === "USER_PROFILE")
              profileImg.value = commonUtil.getImgUrl(
                userData.value.file.filter(v => v.fileType === "USER_PROFILE")[0].fileName,
              );
            if (v.fileType === "USER_BACKGROUND")
              backProfile.value = commonUtil.getImgUrl(
                userData.value.file.filter(v => v.fileType === "USER_BACKGROUND")[0].fileName,
              );
          });
        }
      }
    };

    const getImgUrl = file => {
      return commonUtil.getImgUrl(file);
    };

    const doFollow = () => {
      if (confirm(`날 팔로우하고싶나?`)) {
        alert("자넨 날 팔로우 할수 없네 ㅋ");
      } else {
        alert("겁쟁이ㅋ");
      }
    };

    onMounted(() => {
      setUserIdx();
      nextTick(() => {
        getTargetUserInfo();
      });
    });
    return {
      userData,
      profileImg,
      backProfile,
      getImgUrl,
      doFollow,
    };
  },
};
</script>
<template>
  <section class="user-feed">
    <div class="profile-area" v-if="userData">
      <img class="background-img" :src="backProfile" alt="" />
      <div class="profile">
        <img class="profile-img" :src="profileImg" alt="" />
        <div>{{ userData.userNickName }}</div>
        <div class="follow-btn" @click="doFollow">팔로우하기</div>
      </div>
    </div>
    <div v-else>no data...</div>
  </section>
</template>

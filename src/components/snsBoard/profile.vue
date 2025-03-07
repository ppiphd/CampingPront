<script>
import { computed, onMounted, ref, toRef, watch } from "vue";
import { apiClient } from "../../utils/axios.js";
import commonUtil from "../../utils/common-util.js";
import router from "../../router/index.js";
import { CONSTANTS } from "../../constants.js";

export default {
  name: "profile",
  props: {
    img: {
      type: Array,
      required: true,
    },
    userInfo: {
      required: false,
    },
  },
  setup(props) {
    const userData = ref();
    const getData = async () => {
      try {
        return userData.value = commonUtil.parseJson(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO));
      } catch (e) {
        return e;
      }
    };
    const userProfileImg = computed(() => {
      const v = props.img.filter(v => v.fileType === "USER_PROFILE");
      return v[0];
    });
    const userInfo = ref(
      props.userInfo,
    );

    const getImgUrl = (file) => {
      try {
        if (file) {
          return commonUtil.getImgUrl(file.fileName);
        }
      } catch (e) {
        return "./assets/image/camping.webp";
      }
    };

    const goTargetFeed = () => {
      router.push(`/userFeed/${userInfo.value.userIdx}`);
    };
    onMounted(() => {
      getData();
    });

    return {
      userInfo,
      userData,
      userProfileImg,
      getImgUrl, goTargetFeed,

    };
  },
};
</script>
<template>
  <div class="profile">
    <div class="profile-wrap">
      <img :src="getImgUrl(userProfileImg)" alt="프사" @click="goTargetFeed()" />
      <div class="profile-wrap-data">
        <span>{{ userInfo.userNickName }}</span>
        <span v-if="userData?.userIdx !== userInfo?.userIdx">
          <span class="middle-dot">&#183;</span>
          <button class="follow">팔로우</button>
        </span><br />
        <a class="profile-wrap-data-place"><i class="fa-solid fa-location-dot"></i></a>
      </div>
    </div>
  </div>
</template>

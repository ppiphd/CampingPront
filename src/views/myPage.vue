<script>
import customButton from "../components/layout/customButton.vue";
import customInput from "../components/layout/customInput.vue";
import { onMounted, ref } from "vue";
import snsContentPage from "../components/snsBoard/snsContentPage.vue";
import UpdateProfile from "../components/myPage/updateProfile.vue";
import pagination from "../components/layout/customPagination.vue";
import { apiClient } from "../utils/axios.js";
import commonUtil from "../utils/common-util.js";
import { CONSTANTS } from "../constants.js";
import myFeedBoard from "../components/myPage/myFeedBoard.vue";
import myUsedBoard from "../components/myPage/myUsedBoard.vue";

export default {
  name: "myPage",
  components: {
    myFeedBoard,
    myUsedBoard,
    UpdateProfile,
    snsContentPage,
    customButton,
    customInput,
    pagination,
  },
  setup() {
    const tabType = {
      FEED: "feed",
      USED: "used",
      RENT: "rent",
      SAVE: "save",
      EDIT: "profileUpdate",
      PROFILE: "profile",
    }; // 컴포넌트 이름

    const tabIndex = ref(tabType.FEED);

    const componentChange = v => {
      tabIndex.value = v;
    };

    const profileInfo = ref({}); // 소개에 띄워줄 내용

    const getMyInfo = async () => {
      const data = await apiClient("user/getMe", {});
      if (data) {
        profileInfo.value = data.data;
        if (data.data.file && data.data.file.length > 0) {
          data.data.file.map(v => {
            if (v.fileType === "USER_PROFILE") profileInfo.value.profileImg = commonUtil.getImgUrl(v.fileName);
            if (v.fileType === "USER_BACKGROUND") profileInfo.value.backgroundImg = commonUtil.getImgUrl(v.fileName);
          });
        } else {
          profileInfo.value.profileImg = "/assets/image/profileImg.webp";
          profileInfo.value.backgroundImg = "/assets/image/backgroundImg.webp";
        }
        commonUtil.setLocalStorage(CONSTANTS.KEY_LIST.USER_INFO, data.data);
      }
    };

    onMounted(() => {
      getMyInfo();
    });

    return {
      profileInfo,
      tabIndex,
      tabType,
      componentChange,
    };
  },
};
</script>

<template>
  <div class="myPage">
    <div class="myProfile">
      <img class="backgroundPicture" :src="profileInfo.backgroundImg" alt="" />
      <img class="profilePicture" :src="profileInfo.profileImg" alt="" />
      <div class="profileIntroduce">
        <div class="userNickName">{{ profileInfo.userNickName }}</div>
        <div class="userDescription">{{ profileInfo.userDescription }}</div>
      </div>
    </div>
    <div class="myContents">
      <div class="tabBar">
        <custom-button
          :placeholder="'피드'"
          :onClick="() => componentChange(tabType.FEED)"
          :custom-class="tabIndex === tabType.FEED ? 'active' : ''"
        />
        <custom-button
          :placeholder="'판매'"
          :onClick="() => componentChange(tabType.USED)"
          :custom-class="tabIndex === tabType.USED ? 'active' : ''"
        />
        <custom-button
          :placeholder="'프로필'"
          :onClick="() => componentChange(tabType.PROFILE)"
          :custom-class="tabIndex === tabType.PROFILE ? 'active' : ''"
        />
      </div>
      <div class="contents-area">
        <my-feed-board v-if="tabIndex === tabType.FEED" :idx="profileInfo.userIdx" />
        <my-used-board v-else-if="tabIndex === tabType.USED" :idx="profileInfo.userIdx" />
        <update-profile v-else-if="tabIndex === tabType.PROFILE" />
      </div>
    </div>
  </div>
</template>

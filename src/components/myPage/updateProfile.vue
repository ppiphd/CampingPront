<script>
import { apiClient } from "../../utils/axios.js";
import { onMounted, ref } from "vue";
import customButton from "../layout/customButton.vue";
import customInput from "../layout/customInput.vue";
import commonUtil from "../../utils/common-util.js";
import { CONSTANTS } from "../../constants.js";
import CustomInputFileButton from "../layout/customInputFileButton.vue";

export default {
  name: "updateProfile",
  components: {
    CustomInputFileButton,
    customButton,
    customInput
  },
  setup() {
    const profileInfo = ref({
      userAddress: "",
      userEmail: "",
      userName: "",
      userNickName: "",
      userDescription: "",
      userPassword: "",
      userPhone: ""
    }); // 소개에 띄워줄 내용

    const passwordSet = ref({
      nowPassword: "",
      newPassword: "",
      newPasswordCheck: ""
    });

    const getData = async () => {
      profileInfo.value = await commonUtil.parseJson(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO));
      profileInfo.value.file.map(v => {
        if (v.fileType === "USER_PROFILE") profileInfo.value.profileImg = commonUtil.getImgUrl(v.fileName);
        if (v.fileType === "USER_BACKGROUND") profileInfo.value.backgroundImg = commonUtil.getImgUrl(v.fileName);
      });
    };

    onMounted(() => {
      getData();
    });

    const updateProfile = async () => {
      if (passwordSet.value.nowPassword && passwordSet.value.newPassword && passwordSet.value.newPasswordCheck) {
        if (profileInfo.value.userPassword !== passwordSet.value.nowPassword) {
          alert("현재 비밀번호를 다시 입력해주세요.");
          if (passwordSet.value.newPassword !== passwordSet.value.newPasswordCheck) {
            alert("새 비밀번호를 다시 입력해주세요.");
          }
        }
      }

      if (profileFormData) {
        await apiClient("user/update", profileFormData);
      }
      if (backgroundFormData) {
        await apiClient("user/updateBackground", backgroundFormData);
      }

      const data = await apiClient("user/update", profileInfo.value);
      if (data) {
        alert("변경 완료!");
        location.reload();
      }
    };

    const handleInput = e => {
      this.$emit("update:value", e.target.value);
    };

    const profilePreview = ref();
    const profileFormData = new FormData();
    const backgroundPreview = ref();
    const backgroundFormData = new FormData();

    const profileImgUpload = e => {
      profilePreview.value = URL.createObjectURL(e.target.files[0]);
      profileFormData.set("userNickName", profileInfo.value.userNickName);
      profileFormData.set("file", e.target.files[0]);
    };

    const backgroundImgUpload = e => {
      backgroundPreview.value = URL.createObjectURL(e.target.files[0]);
      backgroundFormData.set("file", e.target.files[0]);
    };

    return {
      updateProfile,
      profileInfo,
      handleInput,
      profileImgUpload,
      backgroundImgUpload,
      profilePreview,
      backgroundPreview,
      passwordSet
    };
  }
};
</script>

<template>
  <div class="updateProfile">
    <div class="input-area">
      <span>이름</span>
      <div class="fixed-info">{{ profileInfo.userName }}</div>
    </div>
    <div class="input-area">
      <span>이메일</span>
      <div class="fixed-info">{{ profileInfo.userEmail }}</div>
    </div>
    <div class="input-area">
      <span>주소</span>
      <div class="fixed-info">{{ profileInfo.userAddress }}</div>
    </div>
    <div class="input-area">
      <span>연락처</span>
      <div class="fixed-info">{{ profileInfo.userPhone }}</div>
    </div>
    <div class="input-area">
      <span>닉네임</span>
      <custom-input :placeholder="profileInfo.userNickName" @update:value="profileInfo.userNickName = $event" />
    </div>
    <div class="input-area">
      <span>소개</span>
      <custom-input :placeholder="profileInfo.userDescription" @update:value="profileInfo.userDescription = $event" />
    </div>
    <div class="input-area">
      <span>현재 비밀번호</span>
      <custom-input @update:value="passwordSet.nowPassword = $event" />
    </div>
    <div class="input-area">
      <span>새 비밀번호</span>
      <custom-input @update:value="passwordSet.newPassword = $event" />
    </div>
    <div class="input-area">
      <span>비밀번호 확인</span>
      <custom-input @update:value="passwordSet.newPasswordCheck = $event" />
    </div>

    <div class="input-area">
      <span>사진</span>
      <div class="img-upload-area">
        <div class="img-upload-area-ul">
          <div class="img-upload-area-ul-li">
            <div class="img-upload-area-ul-li-wrap">
              <img v-if="!profilePreview" :src="profileInfo.profileImg" alt="" />
              <img v-else :src="profilePreview" alt="" />
            </div>
            <custom-input-file-button @change="profileImgUpload" />
          </div>
          <div class="img-upload-area-ul">
            <div class="img-upload-area-ul-li">
              <div class="img-upload-area-ul-li-wrap">
                <img v-if="!backgroundPreview" :src="profileInfo.backgroundImg" alt="" />
                <img v-else :src="backgroundPreview" alt="" />
              </div>
              <custom-input-file-button @change="backgroundImgUpload" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <custom-button :class="'save'" :placeholder="'저장'" :onClick="updateProfile">
      <img src="/assets/image/icon/pen.webp" alt="" />
    </custom-button>
  </div>
</template>

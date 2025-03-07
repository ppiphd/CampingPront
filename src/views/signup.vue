<script>
import CustomLoading from "../components/layout/customLoading.vue";
import customInput from "../components/layout/customInput.vue";
import customButton from "../components/layout/customButton.vue";
// import signupPage from "../components/login/signupPage.vue";
import { onMounted, ref, watch } from "vue";
import { apiClient } from "../utils/axios.js";
import router from "../router/index.js";
import commonUtil from "../utils/common-util.js";
import { CONSTANTS } from "../constants.js";
// import {createRouter, createWebHashHistory} from "vue-router/dist/vue-router.js";
// import re from "../../dist/assets/infoPage.a89dbcb4";

export default {
  name: "signup",
  components: {
    CustomLoading,
    customInput,
    customButton,
  },
  setup() {
    const joinUserData = ref({
      isShow: true,
      userName: "",
      userEmail: "",
      userType: "",
      userPassword: "",
      userPassCheck: "",
      userAddress: "",
      userPhone: "",
      userNickName: "",
      stateTerms: "Y",
      dateTerms: new Date(),
      stateMarketing: "Y",
    });

    const typeSearchData = ref({
      type: "USER_TYPE",
    });
    const typeData = ref();
    const typeSearch = async () => {
      const data = await apiClient("/common/getTypeList", typeSearchData.value);
      typeData.value = data.data;
      if (typeData.value) {
        joinUserData.value.userType = typeData.value[0].column;
      }
    };

    const goToX = v => {
      v ? router.push(v) : window.alert("준비중입니다.");
    };

    //추가폼 등장

    // let isShow = true;
    // const secForm = () => {
    //   isShow = !isShow
    //   joinUserData.value.isShow = !joinUserData.value.isShow
    //   console.log(joinUserData.value.isShow)
    //   console.log(isShow)
    // }

    const isShow = ref(true);
    const checkForm = () => {
      const reg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      // const passCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const nameCheck = /^[가-힣]+$/; //한글만 입력가능
      if (nameCheck.test(joinUserData.value.userName) === false) {
        alert("이름은 한글로 입력해주세요 (2~4글자)");
        //console.log(joinUserData.value.userName)
        return false;
      }
      if (reg.test(joinUserData.value.userEmail) === false) {
        alert("이메일 형식이 올바르지 않아요");

        return false;
      }
      // if (()) {
      //   alert("비밀번호는 영문자 + 숫자 + 특수문자 조합으로 8~25자리 사용해야해요");
      //
      //   return false;
      // }
      if (joinUserData.value.userPassword !== joinUserData.value.userPassCheck) {
        alert("비밀번호가 일치하지않습니다.");

        return false;
      } else {
        isShow.value = !isShow.value;
      }

      // console.log(joinUserData.value.isShow)
      // console.log(isShow)
    };
    const secForm = () => {
      joinUser();
      goToX("/login");
      // console.log("회원가입후 로그인페이지 자동이동 확인")
    };
    const back = () => {
      isShow.value = !isShow.value;
    };
    // 전화번호 자동 하이픈
    // const autoHyphen = () => {
    //   if (joinUserData.value.userPhone === true) {
    //     joinUserData.value.userPhone.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
    //   }
    // }
    const by = () => {
      const loginUser = ref(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO));
      if (loginUser.value !== "") {
        goToX("/");
      }
    };
    by();
    const loginUser = ref(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO));
    const joinUser = async () => {
      const data = await apiClient("/user/join", joinUserData.value);
      // console.log(data.data)
      //console.log(data)

      // contentData.value = data.data;
    };

    // watch(() => joinUserData.value.userPhone, () => {
    //   autoHyphen()
    //   console.log(joinUserData.value.userPhone);
    // })

    onMounted(() => {
      typeSearch();
    });

    return {
      loginUser,
      joinUserData,
      joinUser,
      typeSearch,
      typeSearchData,
      checkForm,
      // autoHyphen,
      secForm,
      isShow,
      back,
      goToX,
      by,
    };
  },
};
</script>
<template>
  <div class="signup">
    <div class="signup-img-fir">
      <img src="/assets/image/login-camp1.webp" alt="" />
    </div>
    <div class="signup-img-sec">
      <img src="/assets/image/login-camp2.webp" alt="" />
    </div>

    <div v-if="isShow" class="signup-form">
      <span>캠퍼가 되어봐요!</span>

      <custom-input :placeholder="'이름'" @update:value="joinUserData.userName = $event"></custom-input>
      <custom-input :placeholder="'이메일'" @update:value="joinUserData.userEmail = $event"></custom-input>
      <custom-input :placeholder="'비밀번호'" @update:value="joinUserData.userPassword = $event"></custom-input>
      <custom-input :placeholder="'비밀번호확인'" @update:value="joinUserData.userPassCheck = $event"></custom-input>
      <custom-button :placeholder="'추가정보입력!'" @click="checkForm"></custom-button>
    </div>

    <div v-if="!isShow" class="signup-form-sec">
      <span>캠퍼가 되어봐요!</span>

      <!--      <button @click="back" style="position: relative; top: -20px;">뒤로가기버튼</button>-->
      <custom-input :placeholder="'닉네임'" @update:value="joinUserData.userNickName = $event"></custom-input>

      <custom-input :placeholder="'번호'" @update:value="joinUserData.userPhone = $event"></custom-input>
      <custom-input :placeholder="'주소'" @update:value="joinUserData.userAddress = $event"></custom-input>
      <custom-button :placeholder="'회원가입'" @click="secForm"></custom-button>
    </div>
  </div>
</template>

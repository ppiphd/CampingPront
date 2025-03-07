<script>
import { ref } from "vue";
import HeaderPage from "../headerPage.vue";
import FooterPage from "../footerPage.vue";
// import customInput from "src/components/layout/customInput.vue";
// import customButton from "src/components/layout/customButton.vue";
// import re from "../../../dist/assets/newsPage.e4b93b35.js";

export default {
  name: "signupPage",
  components: {
    FooterPage,
    HeaderPage,
  },
  setup() {
    const userInfo = ref({
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
      nickName: "",
      birthDate: "",
    });

    const checkEmail = e => {
      const target = e.target.value;
      const reg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (reg.test(target)) {
        ////console.log('true')
      } else {
        ////console.log('이메일형식')
      }
      // e.target.value;
      // ////console.log(e.target.value)
    };

    // const updateEmailValue = (e) => {
    //   userInfo.value.email = e;
    // }
    // const updatePasswordValue = (e) => {
    //   userInfo.value.password = e;
    // }
    // const updateCheckPasswordValue = (e) => {
    //   userInfo.value.passwordCheck = e;
    // };
    // const updateNickNameValue = (e) => {
    //   userInfo.value.nickName = e;
    // }
    // const updateBirthDateValue = (e) => {
    //   userInfo.value.birthDate = e;
    // }
    // const form = document.querySelector('#form__wrap');
    // const checkAll = document.querySelector('.terms__check__all input');
    // const checkBoxes = document.querySelectorAll('.input__check input');
    // const submitButton = document.querySelector('button');
    //
    // const agreements = {
    //   termsOfService: false,
    //   privacyPolicy: false,
    //   allowPromotions: false,
    // };
    //
    // form.addEventListener('submit', (e) => e.preventDefault()); // 새로고침(submit) 되는 것 막음
    //
    // checkBoxes.forEach((item) => item.addEventListener('input', toggleCheckbox));
    //
    // const toggleCheckbox = (e) => {
    //   const {checked, id} = e.target;
    //   agreements[id] = checked;
    //   this.parentNode.classList.toggle('active');
    //   checkAllStatus();
    //   toggleSubmitButton();
    // }
    //
    // const checkAllStatus = () => {
    //   const {termsOfService, privacyPolicy, allowPromotions} = agreements;
    //   checkAll.checked = termsOfService && privacyPolicy && allowPromotions;
    // }
    //
    // const toggleSubmitButton = () => {
    //   const {termsOfService, privacyPolicy} = agreements;
    //   submitButton.disabled = !(termsOfService && privacyPolicy);
    // }
    //
    // checkAll.addEventListener('click', (e) => {
    //   const {checked} = e.target;
    //   if (checked) {
    //     checkBoxes.forEach((item) => {
    //       item.checked = true;
    //       agreements[item.id] = true;
    //       item.parentNode.classList.add('active');
    //     });
    //   } else {
    //     checkBoxes.forEach((item) => {
    //       item.checked = false;
    //       agreements[item.id] = false;
    //       item.parentNode.classList.remove('active');
    //     });
    //   }
    //   toggleSubmitButton();
    // });
    //
    // // const doLogin = () => {
    //   if (checkForm("login")) window.alert("login");
    // };
    // const gogo = () => {
    //   if (checkForm("join")) window.alert("join");
    // };
    // const changeLoginState = () => {
    //   loginState.value = !loginState.value;
    // };

    // const checkForm = (type) => {
    //   if (!checkValue(userInfo.value.email)) {
    //     window.alert("이메일써")
    //     return false;
    //   } else if (!checkValue(userInfo.value.password)) {
    //     ////console.log(userInfo.value.password);
    //     window.alert("비번쓰셈")
    //     return false;
    //   } else if (type === "join" && !checkValue(userInfo.value.nickName)) {
    //     window.alert("이름쓰셈")
    //     return false;
    //   } else if (type === "join" && !checkValue(userInfo.value.passwordCheck)) {
    //     window.alert("비번확인쓰셈")
    //     return false;
    //   } else if (type === "join" && userInfo.value.password !== userInfo.value.passwordCheck)
    //     window.alert("비번 서로다름")
    //   return true;
    // };

    // const checkValue = (value) => {
    //   return !(!value || value === "" || value === undefined);
    // };
    return {
      userInfo,
      checkEmail,
      // userInfo,
      // updateEmailValue,
      // updatePasswordValue,
      // updateCheckPasswordValue,
      // updateNickNameValue,
      // updateBirthDateValue,
      // doLogin,
      // gogo,
    };
  },
};
</script>

<template>
  <div class="container">
    <div>
      <label for="email">email</label>
      <input
        type="text"
        id="email"
        required="required"
        title="이메일형식에 맞춰주세요 제발"
        v-model="userInfo.email"
        @input="checkEmail"
      />
    </div>
    <div>
      <label for="name">성함</label>
      <input
        type="text"
        id="name"
        required="required"
        pattern="/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,}$/"
        title="한글2글자 이상 입력해주세요 제발"
        v-model="userInfo.name"
      />
    </div>
    <div>
      <label for="password">비밀번호</label>
      <input type="password" id="password" required="required" v-model="userInfo.password" />
    </div>
    <div>
      <label for="passwordConfirm">비밀번호 확인</label>
      <input type="password" id="passwordConfirm" required="required" v-model="userInfo.passwordConfirm" />
    </div>
    <div>
      <!--          <input v-model="onlyNumber"/>-->
    </div>
    <input type="submit" value="회원가입" />
  </div>
  <div class="checkbox_group">
    <div class="auth">
      <div id="certificationNumber">000000</div>
      <button id="send-message">인증번호 전송</button>
    </div>

    <div class="timer">
      <div id="time-limit">03:00</div>
      <button id="completion">인증확인</button>
    </div>
    <div class="area">
      <select id="area">
        <option selected disabled>지역을 선택하세요.</option>
        <option>서울</option>
        <option>인천</option>
        <option>경기</option>
      </select>
      <div id="areaError" class="error"></div>
    </div>
    <div class="gender">
      <input id="gender_man" type="radio" name="gender" />남성
      <input id="gender_woman" type="radio" name="gender" />여성
      <div id="genderError" class="error"></div>
    </div>
    <div class="line">
      <hr />
    </div>
    <div class="signUp">
      <button type="button" @click="checkEmail">회원가입</button>
    </div>
  </div>
  <div class="wrap">
    <div class="logo">
      <h1>JUN</h1>
    </div>
    <div class="contents">
      <form action="/" method="POST" id="form__wrap">
        <div class="terms__check__all">
          <input type="checkbox" name="checkAll" id="checkAll" />
          <label for="checkAll"
            >JUN 이용약관, 개인정보 수집 및 이용, 프로모션 정보 수신(선택)에<br />모두 동의합니다.</label
          >
        </div>
        <ul class="terms__list">
          <li class="terms__box">
            <div class="input__check">
              <input type="checkbox" name="agreement" id="termsOfService" value="termsOfService" required />
              <label for="termsOfService" class="required">JUN 이용약관 동의</label>
            </div>
            <div class="terms__content">감사</div>
          </li>
          <li class="terms__box">
            <div class="input__check">
              <input type="checkbox" name="agreement" id="privacyPolicy" value="privacyPolicy" required />
              <label for="privacyPolicy" class="required">개인정보 수집 및 이용 동의</label>
            </div>
            <div class="terms__content">개인정보</div>
          </li>
          <li class="terms__box">
            <div class="input__check">
              <input type="checkbox" name="agreement" id="allowPromotions" value="allowPromotions" />
              <label for="allowPromotions">프로모션 정보 수신 동의</label>
            </div>
            <div class="terms__content">동의</div>
          </li>
        </ul>
        <button type="submit" class="next-button" disabled>확인</button>
      </form>
    </div>
  </div>
</template>

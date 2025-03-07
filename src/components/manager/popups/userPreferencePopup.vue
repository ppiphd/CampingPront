<script>
import commonUtil from "../../../utils/common-util.js";
import { CONSTANTS } from "../../../constants.js";
import { onMounted, ref } from "vue";

export default {
  name: "userPreferencePopup",
  props: {
    clickClose: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const userInfo = ref();

    const typeChck = ref({
      fir: "",
      sec: "",
      thr: "",
      foo: "",
      fiv: "",
      six: "",
      sev: "",
      eig: "",
    });

    /**
     * 제출하기
     */
    const setPreferenceValue = () => {
      console.log(result);
    };

    onMounted(() => {
      if (commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)) {
        userInfo.value = JSON.parse(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO));
      }
    });

    return {
      userInfo,

      setPreferenceValue,
    };
  },
};
</script>
<template>
  <!--  <div class="user-refer">-->
  <!--    <div class="black"></div>-->
  <!--    <div class="refer">-->
  <!--      <div class="title">잠시만요! 당신의 취향을 알고 싶어요</div>-->
  <!--      <div>-->
  <!--        간단한 설문을 도와주시면 {{ userInfo ? userInfo.userName : "손" }}님의 취향을 더 잘 알 수 있어요!-->
  <!--      </div>-->
  <!--      <div v-for="i in 8">-->
  <!--        &lt;!&ndash;        <input type="button" :value="ty">&ndash;&gt;-->
  <!--        <img @click="" :src="`/assets/image/prefeRence/${i}.png`" alt="" />-->
  <!--        &lt;!&ndash;        {{ index }}&ndash;&gt;-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="submit">-->
  <!--      <button @click="setPreferenceValue">제출</button>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<style lang="scss">
.user-refer {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  .black {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(#000000, 0.8);
  }

  .refer {
    position: relative;
    width: 90%;
    height: 90%;
    background-color: #EEEEEE;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;

    .title {
      padding-top: 50px;
      padding-bottom: 10px;
      font-size: 50px;

    }

    .img-area {
      margin: 30px 10px;
      display: flex;
      justify-content: space-around;
      flex-direction: column;


      .theme {
        margin-top: 10px;
        width: 100%;
        display: flex;
        justify-content: space-around;

        div {
          padding: 20px;
        }

        img {
          width: 100px;
          height: 100px;
          border-radius: 8px;
        }
      }

      .type {
        margin-top: 10px;
        width: 100%;
        display: flex;
        justify-content: space-around;

        div {
          padding: 20px;
        }

        img {
          width: 100px;
          height: 100px;
          border-radius: 8px;
        }
      }
    }
  }

}


</style>
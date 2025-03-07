<script>
import { apiClient } from "../../../utils/axios.js";
import store, { POPUP_TYPE, STORE_TYPE } from "../../../store/index.js";
import { ref } from "vue";
import CustomButton from "../../layout/customButton.vue";
import CustomInput from "../../layout/customInput.vue";

export default {
  name: "reportPopup",
  components: { CustomInput, CustomButton },
  props: {
    reportPop: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const arr = ref([{ detailReason: "" }]);
    const checkArr = () => {
      // console.log(arr.value);
    };

    return {
      arr,
      close,
      checkArr,
    };
  },
};
</script>
<template>
  <div class="modal-report">
    <span @click="reportPop" type="button">X</span>
    <div class="modal-report-content">
      <div class="checkbox"><input type="checkbox" v-model="arr" value="그냥1" /> 그냥</div>
      <div class="checkbox"><input type="checkbox" v-model="arr" value="그냥2" /> 그냥2</div>
      <div class="checkbox"><input type="checkbox" v-model="arr" value="그냥3" /> 그냥3</div>
      <div class="checkbox"><input type="checkbox" v-model="arr" value="그냥4" /> 그냥4</div>
      <div class="checkbox"><input type="checkbox" v-model="arr" value="그냥5" /> 그냥5</div>
      <div class="checkbox"><input type="checkbox" v-model="arr" value="그냥6" /> 그냥6</div>
    </div>
    <div>
      <custom-input
        :custom-class="'detailedReason'"
        :placeholder="'상세 이유 작성'"
        @update:value="arr.detailReason = $event"
      />
    </div>
    <div class="modal-report-btn">
      <custom-button @click="reportPop">취소</custom-button>
      <custom-button @click="checkArr">신고하기</custom-button>
    </div>
  </div>
</template>

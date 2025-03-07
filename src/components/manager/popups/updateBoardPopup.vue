<script>
import { onMounted, ref } from "vue";
import { apiClient } from "../../../utils/axios.js";
import CustomButton from "../../layout/customButton.vue";
import CustomInput from "../../layout/customInput.vue";
import store, { POPUP_TYPE, STORE_TYPE } from "../../../store/index.js";
import router from "../../../router/index.js";
import customInputFileButton from "../../layout/customInputFileButton.vue";

export default {
  name: "updateBoardPopup",
  components: { CustomInput, CustomButton, customInputFileButton },
  props: {
    clickClose: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const publicType = {
      All: "ALL",
      FOLLOW: "FOLLOW",
    };
    const publicIndex = ref();
    const checkValue = v => {
      publicIndex.value = v;
    };
    const updateData = ref({
      boardIdx: store.state.boardIdx,
      boardBody: "",
    });
    const inputHashTag = ref("");
    const hashTagList = ref([]);

    const update = async () => {
      const param = Object.assign({}, updateData.value, { hashTag: hashTagList.value });
      const data = await apiClient("/sns/updateSns", param);
      if (data.resultCode === 0) {
        window.alert("수정되었습니다.");
      } else {
        window.alert("다시 시도해주세요");
      }
    };
    const handleInput = (e) => {
      let target = e.target.value;
      target = target.trim();
      // if (target.includes("#")) {
      //   console.log(target.includes("#"));
      // }
      if (target[0] === "#") {
        inputHashTag.value = target;
      } else {
        const eng = /^[a-z|A-Z]+$/;
        if (eng.test(e.target.value)) {
          e.target.value = "#" + e.target.value;
        } else {
          e.target.value = "#" + e.target.value.substring(1);
        }
        // inputHashTag.value = "#" + inputHashTag.value;
      }
    };

    const handleEnterEvent = (e) => {
      // inputHashTag.value = inputHashTag.value.trim();
      if (e.key === "Enter") {
        if (inputHashTag.value[0] === "#" && inputHashTag.value.length >= 2) {
          const param = inputHashTag.value.substring(1).trim();
          hashTagList.value.push(param);
          inputHashTag.value = "";
        }
      }

    };
    //태그 지우기
    const deleteTag = (index) => {
      hashTagList.value.index = index;
      hashTagList.value.splice(hashTagList.value.index, 1);
    };
    return {
      publicType,
      checkValue,
      publicIndex,
      updateData,
      update,
      inputHashTag,
      handleInput,
      handleEnterEvent,
      hashTagList,
      deleteTag,
    };
  },
};
</script>
<template>
  <div class="modal-inner">
    <div class="save-btn">
      <custom-button :customClass="'cancel'" :placeholder="'취소'" :onClick="clickClose" />
      <div class="save-btn-wrap">
        <custom-button :customClass="'upLoad'" :placeholder="'수정'" :onClick="update" />
      </div>
    </div>
    <div class="modal-inner-wrap">
      <div class="content">
        <div class="file">
          <custom-input-file-button />
        </div>
        <div class="content-profile">
          <!--          <div class="content-profile-wrap">-->
          <!--            <img src="/assets/image/IU.webp" />-->
          <!--            <span>dlwlrma</span>-->
          <!--          </div>-->
        </div>
        <div class="content-content">
          <custom-input
            :custom-class="'content'"
            :placeholder="'문구 입력...'"
            @update:value="updateData.boardBody = $event"
          >
          </custom-input>
          <div class="count">(0 / 200)</div>
        </div>
        <div class="content-profile-public">
          <custom-button
            :placeholder="'전체 공개'"
            :onClick="() => checkValue(publicType.All)"
            :custom-class="publicIndex === publicType.All ? 'active' : ''"
          />
          <custom-button
            :placeholder="'팔로워 공개'"
            :onClick="() => checkValue(publicType.FOLLOW)"
            :custom-class="publicIndex === publicType.FOLLOW ? 'active' : ''"
          />
        </div>
        <div class="content-position">
          <div class="content-position-wrap">
            <span class="title">위치태그</span>
            <span><i class="fa-solid fa-chevron-right"></i></span>
          </div>
        </div>
        <div class="content-position">
          <div class="content-position-wrap">
            <span class="title">장소</span>
            <span><i class="fa-solid fa-chevron-right"></i></span>
          </div>
        </div>
        <div class="content-person">
          <div class="content-person-wrap">
            <span>인원</span>
            <div>range slider</div>
          </div>
        </div>
        <div class="content-tag">
          <div class="content-tag-div">태그 설정</div>
          <div class="content-tag-main" v-if="hashTagList.length > 0 ">
            <div class="content-tag-main-content" v-for="(item,index) in hashTagList" :key="index">#{{ item }}
              <span class="deleteTag" @click="deleteTag(index)">x</span>
            </div>
          </div>
          <div class="content-tag-wrap">
            <input type="text" placeholder="# 태그입력...(최대 30개)" v-model="inputHashTag" @keydown="handleEnterEvent"
                   @input="handleInput">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

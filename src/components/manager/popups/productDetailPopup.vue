<script>
import CustomButton from "../../layout/customButton.vue";
import { onMounted, ref } from "vue";
import { apiClient } from "../../../utils/axios.js";
import commonUtil from "../../../utils/common-util.js";
import store, { POPUP_TYPE, STORE_TYPE } from "../../../store/index.js";
import { CONSTANTS } from "../../../constants.js";
import router from "../../../router/index.js";
import chat from "../../chat.vue";

export default {
  name: "productDetailPopup",
  components: { CustomButton, chat },
  setup() {
    const detailData = ref({
      productIdx: "",
      userIdx: "",
      productType: "",
      userNickName: "",
      productDes: "",
      file: [],
    });
    //todo 채팅하기 활성화

    const userData = ref();
    const getData = async () => {
      try {
        return (userData.value = commonUtil.parseJson(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)));
      } catch (e) {
        return e;
      }
    };
    let param = "";
    const goChat = async () => {
      param = Object.assign({}, param, { targetIdx: detailData.value.userIdx });
      const data = await apiClient("/chat/joinChat", param);
      if (data.resultCode === 0) {
      }
    };
    const productChat = () => {
      if (userData.value && detailData.value.userIdx) {
        goChat();
      } else {
        window.alert("로그인 하세요.");
        store.commit(STORE_TYPE.popupType, POPUP_TYPE.NONE); //팝업닫기
        router.push("/login");
      }
    };


    const getDetail = async () => {
      // Product Detail Info 받아오기
      detailData.value.productIdx = store.state.boardIdx;
      const data = await apiClient("product/getProductDetail", detailData.value);
      if (data) {
        detailData.value = data.data[0];
        detailData.value.dateReg = detailData.value.dateReg.slice(2, 10);
        detailData.value.productPrice = detailData.value.productPrice.toLocaleString();
      }

      // User 프로필 이미지 가져오기
      for (let i in detailData.value.userProfile) {
        if (detailData.value.userProfile[i].fileType === "USER_PROFILE") {
          userProfile.value = commonUtil.getImgUrl(detailData.value.userProfile[i].fileName);
        }
      }
    };
    const tabIndex = ref(0);

    const nextOverImg = () => {
      if (tabIndex.value < detailData.value.file.length - 1) {
        tabIndex.value++;
      }
    };
    const beforeOverImg = () => {
      if (tabIndex.value > 0) {
        tabIndex.value--;
      }
    };


    const userProfile = ref("/assets/image/profileImg.webp");
    const getImgUrl = file => {
      try {
        if (file) {
          return commonUtil.getImgUrl(file.fileName);
        }
      } catch (e) {
        return "./assets/image/camping.webp";
      }
    };

    const changeImg = index => {
      tabIndex.value = index;
    };

    onMounted(() => {
      getDetail();
      getData();
    });
    return {
      detailData,
      tabIndex,
      userProfile,
      userData,
      nextOverImg,
      beforeOverImg,
      getImgUrl,
      changeImg,
      productChat,
      goChat,
    };
  },
};
</script>
<template>
  <section class="product-detail-popup">
    <div class="modal-detail">
      <div class="modal-detail-content">
        <div class="product">
          <div class="product-image">
            <img :src="getImgUrl(detailData.file[tabIndex])" alt="상품 사진" />
            <div v-if="detailData.file.length > 1" class="product-image-subImg">
              <div class="product-image-subImg-list" v-for="(item, index) in detailData.file">
                <img @click="changeImg(index)" :src="getImgUrl(item)" :tabindex="tabIndex" alt="" />
              </div>
            </div>
            <span v-if="detailData.file.length > 1" @click="nextOverImg" class="product-image-right">
              <i class="fa-solid fa-circle-chevron-right" />
            </span>
            <span v-if="detailData.file.length > 1" @click="beforeOverImg" class="product-image-left">
              <i class="fa-solid fa-circle-chevron-left" />
            </span>
          </div>
          <div class="product-wrap">
            <div class="product-wrap-profile">
              <img :src="userProfile" alt="프사" />
              <div class="product-wrap-profile-info">
                <span>{{ detailData.userNickName }}</span>
              </div>
            </div>
            <div class="product-wrap-chat">
              <!--              todo 채팅-->
              <custom-button v-if="userData?.userIdx !== detailData.userIdx" @click="productChat"
                             :placeholder="'채팅하기'" />
            </div>
          </div>
          <div class="product-main">
            <div class="product-main-wrap">
              <div class="product-main-wrap-title">
                <div class="pomsom">{{ detailData.productType }}</div>
                <h4>{{ detailData.productName }}</h4>
              </div>
              <div class="product-main-wrap-rest">
                <span>
                  <i class="fa-regular fa-clock" />
                  {{ detailData.dateReg }}
                </span>
              </div>
            </div>
            <div class="product-main-menu">
              <span class="heart"><i class="fa-regular fa-heart" /></span>
              <span class="share"><i class="fa-solid fa-share-nodes" /></span>
            </div>
          </div>
          <div class="product-price">
            <div class="grade">
              <span class="name">상품 컨디션</span>
              <span><i class="fa-solid fa-star" /></span>
              <span><i class="fa-solid fa-star" /></span>
              <span><i class="fa-solid fa-star" /></span>
              <span><i class="fa-solid fa-star" /></span>
              <span><i class="fa-solid fa-star" /></span>
            </div>
            <p>{{ detailData.productPrice }}</p>
          </div>
          <div class="product-content">
            <div class="product-content-wrap">
              {{ detailData.productDes }}
            </div>
            <!--            <div class="product-content-deal">-->
            <!--              <span>{{ detailData.deliveryInfo }}</span>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import customButton from "../../layout/customButton.vue";
import { nextTick, onMounted, ref } from "vue";
import CustomInput from "../../layout/customInput.vue";
import CustomInputFileButton from "../../layout/customInputFileButton.vue";
import { apiClient } from "../../../utils/axios.js";

export default {
  name: "productWritePopup",
  components: { CustomInputFileButton, CustomInput, customButton },
  props: {
    clickClose: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const overall_Type = [
      {
        name: "텐트/타프",
      },
      {
        name: "침낭/매트",
      },
      {
        name: "테이블/의자",
      },
      {
        name: "조명 기구",
      },
      {
        name: "주방 용품",
      },
      {
        name: "화로/버너",
      },
      {
        name: "안전/위생용품",
      },
      {
        name: "전기/전자제품",
      },
      {
        name: "캠핑카/카라반",
      },
      {
        name: "차박 용품",
      },
      {
        name: "의류/수납",
      },
      {
        name: "기타 용품",
      },
    ];
    const typeType = {
      SELL: "SELL",
      BUY: "BUY",
    };
    const typeIndex = ref("");
    const checkValue = v => {
      typeIndex.value = v;
      uploadData.value.productType = v;
    };
    const clickState = ref(false);
    let star1, star2, star3, star4, star5;
    const handleMouseOver = index => {
      if (!clickState.value) {
        if (index >= 1) {
          star1.style.color = "red";
        }
        if (index >= 2) {
          star2.style.color = "red";
        }
        if (index >= 3) {
          star3.style.color = "red";
        }
        if (index >= 4) {
          star4.style.color = "red";
        }
        if (index >= 5) {
          star5.style.color = "red";
        }
      }
    };
    const handleMouseOut = index => {
      if (!clickState.value) {
        if (index >= 1) {
          star1.style.color = "#d2d2d2";
        }
        if (index >= 2) {
          star2.style.color = "#d2d2d2";
        }
        if (index >= 3) {
          star3.style.color = "#d2d2d2";
        }
        if (index >= 4) {
          star4.style.color = "#d2d2d2";
        }
        if (index >= 5) {
          star5.style.color = "#d2d2d2";
        }
      }
    };
    const clickHandler = index => {
      clickState.value = true;
      if (index === 1) {
        star1.style.color = "red";
        star2.style.color = "#d2d2d2";
        star3.style.color = "#d2d2d2";
        star4.style.color = "#d2d2d2";
        star5.style.color = "#d2d2d2";
      }
      if (index === 2) {
        star1.style.color = "red";
        star2.style.color = "red";
        star3.style.color = "#d2d2d2";
        star4.style.color = "#d2d2d2";
        star5.style.color = "#d2d2d2";
      }
      if (index === 3) {
        star1.style.color = "red";
        star2.style.color = "red";
        star3.style.color = "red";
        star4.style.color = "#d2d2d2";
        star5.style.color = "#d2d2d2";
      }
      if (index === 4) {
        star1.style.color = "red";
        star2.style.color = "red";
        star3.style.color = "red";
        star4.style.color = "red";
        star5.style.color = "#d2d2d2";
      }
      if (index === 5) {
        star1.style.color = "red";
        star2.style.color = "red";
        star3.style.color = "red";
        star4.style.color = "red";
        star5.style.color = "red";
      }
    };
    onMounted(() => {
      nextTick(() => {
        star1 = document.getElementById("stars1");
        star2 = document.getElementById("stars2");
        star3 = document.getElementById("stars3");
        star4 = document.getElementById("stars4");
        star5 = document.getElementById("stars5");
      });
    });

    const handleInput = e => {
      this.$emit("update:value", e.target.value);
    };

    const tabIndex = ref(0);

    const imgPreview = ref([]);
    const formData = new FormData();
    const uploadImg = e => {
      let fileList = e.target.files;
      if (fileList.length < 1) {
        alert("사진을 한 장 이상 넣어주세요.");
      } else if (fileList.length < 11) {
        for (let i = 0; i < fileList.length; i++) {
          if (fileList[i]) imgPreview.value.push(URL.createObjectURL(fileList[i]));
          formData.append("file", fileList[i]);
        }
      } else alert("사진은 10장으로 제한됩니다.");
    };

    const uploadData = ref({
      productName: "",
      productType: "SELL",
      productDes: "",
      stateView: "Y",
      productPrice: 0,
      productState: "GOOD",
    });
    const uploadPost = async () => {
      if (
        uploadData.value.productName &&
        uploadData.value.productType &&
        uploadData.value.productDes &&
        uploadData.value.stateView &&
        uploadData.value.productPrice &&
        uploadData.value.productState
      ) {
        formData.append("productName", uploadData.value.productName);
        formData.append("productDes", uploadData.value.productDes);
        formData.append("stateView", uploadData.value.stateView);
        formData.append("productPrice", uploadData.value.productPrice);
        formData.append("productType", uploadData.value.productType);
        formData.append("productState", "GOOD");

        const data = await apiClient("product/insertProduct", formData);
        if (data) {
          alert("업로드 완료!");
          location.reload();
        }
      }
    };

    const changeIndex = index => {
      tabIndex.value = index;
    };

    return {
      typeType,
      typeIndex,
      overall_Type,
      checkValue,
      handleMouseOver,
      handleMouseOut,
      clickHandler,
      uploadImg,
      imgPreview,
      handleInput,
      tabIndex,
      changeIndex,
      uploadPost,
      uploadData,
    };
  },
};
</script>

<template>
  <section class="product-write-popup">
    <div class="modal-inner">
      <div class="save-btn">
        <custom-button :customClass="'cancel'" :placeholder="'취소'" :onClick="clickClose" />
        <custom-button :customClass="'upLoad'" :placeholder="'올리기'" :onClick="uploadPost" />
      </div>
      <div class="modal-inner-wrap">
        <div class="product">
          <div class="product-img-wrap">
            <div v-if="!imgPreview.length > 0" />
            <div v-else class="product-img-upload-after">
              <img :src="imgPreview[tabIndex]" alt="" />
            </div>
          </div>
          <div v-if="imgPreview" class="item-preview-list">
            <div v-for="(item, index) in imgPreview" class="item-preview-list-wrap">
              <img @click="changeIndex(index)" :src="item" alt="" />
            </div>
          </div>
          <custom-input-file-button @change="uploadImg" />
          <div class="product-title">
            <custom-input :placeholder="'제목'" @update:value="uploadData.productName = $event" />
            <div class="product-title-type">
              <custom-button
                :placeholder="'팝니다'"
                :onClick="() => checkValue(typeType.SELL)"
                :custom-class="typeIndex === typeType.SELL ? 'active' : ''"
              />
              <custom-button
                :placeholder="'삽니다'"
                :onClick="() => checkValue(typeType.BUY)"
                :custom-class="typeIndex === typeType.BUY ? 'active' : ''"
              />
            </div>
          </div>
          <div class="product-option">
            <div class="product-option-price">
              <custom-input :placeholder="'가격(원)'" @update:value="uploadData.productPrice = $event" />
            </div>
            <!--            <div class="product-option-grade">-->
            <!--              <span class="title">상품 컨디션</span>-->
            <!--              <span @mouseover="handleMouseOver(1)" @mouseleave="handleMouseOut(1)"-->
            <!--                ><i @click="clickHandler(1)" id="stars1" class="fa-solid fa-star"></i-->
            <!--              ></span>-->
            <!--              <span @mouseover="handleMouseOver(2)" @mouseleave="handleMouseOut(2)"-->
            <!--                ><i @click="clickHandler(2)" id="stars2" class="fa-solid fa-star"></i-->
            <!--              ></span>-->
            <!--              <span @mouseover="handleMouseOver(3)" @mouseleave="handleMouseOut(3)"-->
            <!--                ><i @click="clickHandler(3)" id="stars3" class="fa-solid fa-star"></i-->
            <!--              ></span>-->
            <!--              <span @mouseover="handleMouseOver(4)" @mouseleave="handleMouseOut(4)"-->
            <!--                ><i @click="clickHandler(4)" id="stars4" class="fa-solid fa-star"></i-->
            <!--              ></span>-->
            <!--              <span @mouseover="handleMouseOver(5)" @mouseleave="handleMouseOut(5)"-->
            <!--                ><i @click="clickHandler(5)" id="stars5" class="fa-solid fa-star"></i-->
            <!--              ></span>-->
            <!--            </div>-->
          </div>
          <!--          <div class="product-sort">-->
          <!--            <div class="product-sort-info">-->
          <!--              <span>구분</span>-->
          <!--              <span class="import"> *</span>-->
          <!--            </div>-->
          <!--            <div class="product-sort-deal">-->
          <!--              <div class="product-sort-deal-type">-->
          <!--                <span v-for="item in overall_Type">{{ item.name }}</span>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <div class="product-content">
            <custom-input
              :placeholder="'게시글 내용을 작성해주세요. 허위 내용 작성시 게시가 제한될 수 있어요.'"
              @update:value="uploadData.productDes = $event"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

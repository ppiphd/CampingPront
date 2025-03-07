<script>
import { ref } from "vue";

export default {
  name: "myReview",
  setup() {
    const itemData = ref({
      itemImg: "/assets/image/chun.webp"
    });
    return {
      itemData
    };
  }
};
</script>

<template>
  <div class="myReview">
    <div class="reviewItem">
      <img class="itemImg" :src="itemData.itemImg" alt="" />
      <div class="itemBox">
        <div class="itemTitle">최신식 텐트</div>
        <div class="itemOption">옵션 : 춘식이, 판매자</div>
        <div class="itemGrade">
          <img src="/assets/image/icon/fullStar.webp" alt="" />
          <img src="/assets/image/icon/fullStar.webp" alt="" />
          <img src="/assets/image/icon/fullStar.webp" alt="" />
          <img src="/assets/image/icon/emptyStar.webp" alt="" />
          <img src="/assets/image/icon/emptyStar.webp" alt="" />
        </div>
        <div class="itemComments">판매자도 쉽고 설치가 친절했습니다. 좋은 거래였습니다.</div>
      </div>
      <div class="itemBuyDate">2022.11.01</div>
    </div>
  </div>
</template>

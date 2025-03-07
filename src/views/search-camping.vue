<script>

import router from "../router/index.js";

export default {

  name: "mainPage",
  setup() {

    const goToSample = () => {
      router.push("/samplePage");
    };
    const goLoginPage = () => {
      router.push("/loginPage")
    };


    return {
      goToSample,
      goLoginPage,


    }
  }
}


</script>
<template>
  <div class="searchBox">
    <label>캠핑: <input type="text" id="search" onkeyup="filter()" placeholder="캠핑장을 검색하세요."/></label>

  </div>
  <div class="listBox">
    <div class="listInner">
      <span class="camp">서울</span>
      <span class="camping">대한민국</span>
    </div>
    <div class="listInner">
      <span class="camp">서울</span>
      <span class="camping">대한민국</span>
    </div>
    <div class="listInner">
      <span class="camp">서울</span>
      <span class="camping">대한민국</span>
    </div>
    <div class="listInner">
      <span class="camp">서울</span>
      <span class="camping">대한민국</span>
    </div>
    <div class="listInner">
      <span class="camp">서울</span>
      <span class="camping">대한민국</span>
    </div>
    <div class="listInner">
      <span class="camp">서울</span>
      <span class="camping">대한민국</span>
    </div>
    <div class="listInner">
      <span class="camp">서울</span>
      <span class="camping">대한민국</span>
    </div>
    <div class="listInner">
      <span class="camp">서울</span>
      <span class="camping">대한민국</span>
    </div>
    <div class="listInner">
      <span class="camp">서울</span>
      <span class="camping">대한민국</span>
    </div>
    <div class="listInner">
      <span class="camp">서울</span>
      <span class="camping">대한민국</span>
    </div>
    <div class="listInner">
      <span class="camp">서울</span>
      <span class="camping">대한민국</span>
    </div>
  </div>

</template>

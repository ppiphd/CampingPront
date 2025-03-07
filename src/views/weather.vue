<script>
import router from "../router/index.js";
import { onMounted, ref } from "vue";
import axios from "axios";
import store, { POPUP_TYPE, STORE_TYPE } from "../store/index.js";
import { useStore } from "vuex";

export default {
  name: "weather",
  components: {},

  setup() {
    const store = useStore();
    //https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=%2B73Gk9VQ6LP%2FEICWELVtDo%2FLQDhSaoMt46Iv6JFU%2BWo3iERh%2FojmCv5Z8Deh0O93nC5R1xVDq77PxTkQKP3rKA%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20221129&base_time=0500&nx=55&ny=127
    const api = axios.create({
      baseURL: "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0",
      timeout: 1000 * 60 * 3,
      headers: { "content-type": "Json" },
    });

    const avgTemp = ref(0);

    /**
     * POP : 강수확률
     * REH : 습도
     * SKY : 하늘상태
     * TMN : 최저 기온
     * TMX : 최고 기온
     * VEC : 풍향
     * WSD : 풍속
     *
     * fcstValue : 예보시각
     **/

    const dataList = ref([]);

    const getCampInfo = async () => {
      const date = new Date().getDate();
      const m = new Date().getMonth();
      const y = new Date().getFullYear();
      const sibalData = y.toString() + (m + 1).toString() + date;
      // console.log(sibalData);
      const d = await api.get(
        "/getVilageFcst?serviceKey=%2B73Gk9VQ6LP%2FEICWELVtDo%2FLQDhSaoMt46Iv6JFU%2BWo3iERh%2FojmCv5Z8Deh0O93nC5R1xVDq77PxTkQKP3rKA%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20221129&base_time=0500&nx=55&ny=127",
      );
      const data = await d.data.response.body.items.item;
      let result = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
      data.map(v => {
        if (v.fcstDate === sibalData) {
          const index = Number(v.fcstTime.toString().slice(0, 2));
          if (v.fcstValue) {
            if (v.category === "POP") {
              result[index]["rainRate"] = v.fcstValue;
            } else if (v.category === "REH") {
              result[index]["hameRate"] = v.fcstValue;
            } else if (v.category === "SKY") {
              result[index]["skyState"] = v.fcstValue;
            } else if (v.category === "REH") {
              result[index]["hame"] = v.fcstValue;
            } else if (v.category === "TMN") {
              result[index]["minTemp"] = v.fcstValue;
            } else if (v.category === "TMX") {
              result[index]["maxTemp"] = v.fcstValue;
            } else if (v.category === "VEC") {
              result[index]["windVector"] = v.fcstValue;
            } else if (v.category === "WSD") {
              result[index]["windSpeed"] = v.fcstValue;
            } else if (v.category === "TMP") {
              result[index]["temp"] = v.fcstValue;
            }
          }
        }
      });

      dataList.value = result;

      let total = 0;
      result.map(v => {
        total += Number(v.temp);
      });

      avgTemp.value = Math.floor(total / 24);
    };
    console.log(dataList.value);
    const showDetail = index => {
      // console.log(dataSet);
      store.commit(STORE_TYPE.campInfo, dataList[index]);
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.DETAIL_CAMPING);
    };

    onMounted(() => {
      getCampInfo();

      // getCampInfo();
    });
    return {
      dataList,
      avgTemp,
      showDetail,
      // goLink,
    };
  },
};
</script>

<template>
  <div class="zzz">
    <div>평균기온 : {{ avgTemp }}</div>
    <div v-for="(item, index) in dataList">
      <div>현재시간 : {{ index }}시</div>
      <div>날씨 상태 : {{ item.skyState }}</div>
      <div>기온 : {{ item.temp }}</div>
      <div>풍속 : {{ item.windSpeed }}</div>
      <div>풍향 : {{ item.windVector }}</div>
    </div>
  </div>
  <!--  <div> {{ this.responseText }}</div>-->
</template>

<style lang="scss">
.zzz {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  > div {
    width: 200px;
    border: 1px solid red;
  }
}
</style>

<script>
import { ref, computed } from "vue";
import CustomButton from "./customButton.vue";

export default {
  name: "customPagination",
  components: { CustomButton },
  setup() {
    let page = ref(1);

    const data = Array.from(Array(24).keys()).map(item => {
      return { index: item, value: `this_${item}` };
    });

    const perPage = 10;

    const paginatedData = computed(() => data.slice((page.value - 1) * perPage, page.value * perPage));

    const nextPage = () => {
      if (page.value !== Math.ceil(data.length / perPage)) {
        page.value += 1;
      }
    };

    const backPage = () => {
      if (page.value !== 1) {
        page.value -= 1;
      }
    };

    const goToPage = numPage => {
      page.value = numPage;
    };

    return {
      data,
      paginatedData,
      perPage,
      page,
      nextPage,
      backPage,
      goToPage,
    };
  },
};
</script>

<template>
  <div class="custom-pagination">
    <div v-for="item in paginatedData" :key="item.index" />
    <custom-button :placeholder="`<`" :onClick="backPage" />
    <custom-button v-for="item in Math.ceil(data.length / perPage)" :key="item" @click="() => goToPage(item)">
      {{ item }}
    </custom-button>
    <custom-button :placeholder="`>`" :onClick="nextPage" />
  </div>
</template>

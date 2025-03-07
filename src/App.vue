<script>
import { useRoute } from "vue-router";
import customLoading from "./components/layout/customLoading.vue";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { CONSTANTS } from "./constants.js";
import { apiClient } from "./utils/axios.js";
import popupManager from "./components/manager/popupManager.vue";
import { getStore, POPUP_TYPE } from "./store/index.js";
import HeaderPage from "./components/headerPage.vue";
import FooterPage from "./components/footerPage.vue";

export default {
  name: "App",
  components: {
    FooterPage,
    HeaderPage,
    customLoading,
    popupManager
  },
  setup() {
    const store = getStore();
    const route = useRoute();
    const isLoading = ref(false);
    const isPopup = ref(store.state.popupType);

    const eventHandler = e => {
      if (e.detail === CONSTANTS.KEY_LIST.EVENT_MESSAGE.PROCESS) {
        isLoading.value = true;
      } else if (e.detail === CONSTANTS.KEY_LIST.EVENT_MESSAGE.COMPLETE) {
        isLoading.value = false;
      }
    };

    const getAPI = async () => {
      const data = await apiClient("/pbl/getProductList", {});
    };

    watch(
      () => store.state.popupType,
      () => {
        isPopup.value = store.state.popupType;
      }
    );

    onMounted(() => {
      addEventListener(CONSTANTS.KEY_LIST.EVENT_LIST.LOADING, eventHandler);
      // getAPI();
    });

    onUnmounted(() => {
      removeEventListener(CONSTANTS.KEY_LIST.EVENT_LIST.LOADING, eventHandler);
    });

    return {
      isLoading,
      isPopup,
      POPUP_TYPE
    };
  }
};
</script>

<template>
  <header-page />
  <router-view />
  <custom-loading v-if="isLoading" />
  <Transition name="fade">
    <popup-manager v-if="isPopup !== POPUP_TYPE.NONE" />
  </Transition>
  <footer-page />
</template>

<style lang="scss">
@import "assets/css/app.scss";
</style>

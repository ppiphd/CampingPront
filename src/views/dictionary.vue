<script>
import router from "../router/index.js";
import customInput from "../components/layout/customInput.vue";
import customButton from "../components/layout/customButton.vue";
import snsPage from "./snsPage.vue";
import myPage from "./myPage.vue";
import {apiClient} from "../utils/axios.js";
import {onMounted, ref} from "vue";
import CustomLoading from "../components/layout/customLoading.vue";
// import {e} from "../../dist/assets/index.a54a7291.js";
import HeaderPage from "../components/headerPage.vue";
import customSelect from "../components/layout/customSelect.vue";
import CustomDatePicker from "../components/layout/customDatePicker.vue";
import customPagination from "../components/layout/customPagination.vue";

export default {
  name: "dictionary",
  components: {
    CustomDatePicker,
    customSelect,
    CustomLoading,
    customInput,
    customButton,
    snsPage,
    myPage,
    HeaderPage,
    customPagination,
  },

  setup() {


    return {};
  },
};
</script>
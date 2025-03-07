<script>
import customInput from "../components/layout/customInput.vue";
import customButton from "../components/layout/customButton.vue";
import customSelect from "../components/layout/customSelect.vue";
import customDatePicker from "../components/layout/customDatePicker.vue";
import { ref, watch } from "vue";

export default {
  name: "samplePage",
  components: {
    customInput,
    customButton,
    customSelect,
    customDatePicker,
  },
  setup() {
    const inputValue = ref();

    const selectedValue = ref();

    const date = ref();

    const selectedUpdateValue = value => {
      selectedValue.value = value;
      //console.log(selectedValue.value);
    };

    const updateValue = event => {
      inputValue.value = event;
      //console.log(inputValue.value);
    };

    const btnClickEvent = () => {
      //console.log(`this is btnClick Event`);
    };

    const setDate = event => {
      date.value = event;
    };

    const selectData = [
      { key: "one", value: "1" },
      { key: "two", value: "2" },
      { key: "three", value: "3" },
      { key: "four", value: "4" },
      { key: "five", value: "5" },
    ];

    return {
      updateValue,
      btnClickEvent,
      selectedUpdateValue,
      setDate,
      inputValue,
      selectData,
      selectedValue,
      date,
    };
  },
};
</script>
<template>
  <!--  custom input 사용 예시-->
  <custom-input :placeholder="`hi`" @update:value="updateValue" :custom-class="`test-input`">
    <template v-slot:element>result :</template>
  </custom-input>
  {{ inputValue }}

  <!--  custom-button 사용 예시-->
  <custom-button :placeholder="`버튼예시`" :custom-class="`test-input`" :onClick="btnClickEvent">
    <template v-slot:element>slot</template>
  </custom-button>

  <customSelect @update:value="selectedUpdateValue" :data="selectData"></customSelect>
  {{ selectedValue }}

  <!--  custom-date-picker 사용법-->
  <custom-date-picker @update:value="setDate"></custom-date-picker>
  {{ date }}
</template>

<style lang="scss">
.test-input {
  width: 100px;
  height: 100px;
}
</style>

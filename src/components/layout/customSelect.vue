<script>
export default {
  name: "customSelect",
  emits: ["update:value"],
  props: {
    data: {
      type: Array,
      required: false
    },
    customClass: {
      type: String,
      required: false
    }
  },
  setup() {
    return {};
  },
  methods: {
    handler(e) {
      this.$emit("update:value", e.target.value);
    }
  }


};
</script>
<template>
  <select class="custom-select" :class="customClass" @change="handler">
    <option v-for="item in data" :value="item.key">{{ item.value }}</option>
  </select>
</template>

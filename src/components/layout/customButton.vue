<script>
export default {
  name: "customButton",
  props: {
    placeholder: {
      type: String,
      required: false,
    },
    customClass: {
      type: String,
      required: false,
    },
    onClick: {
      type: Function,
      required: false,
      default() {
        return undefined;
      },
    },
  },
};
</script>
<template>
  <div class="custom-button" :class="customClass" @click="onClick">
    <a :class="customClass" href="#" @click.prevent.stop="onClick">{{ placeholder }}</a>
    <slot></slot>
  </div>
</template>

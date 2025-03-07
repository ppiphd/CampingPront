<script>
export default {
  name: "customModal",
};
</script>

<template>
  <div class="custom-modal">
    <div class="custom-modal-overlay" @click="$emit('close')" />
    <div class="custom-modal-card">
      <slot />
    </div>
  </div>
</template>

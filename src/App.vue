<script setup lang="ts">
import ColorPicker from './components/ColorPicker.vue'
import PasswordGenerator from './components/PasswordGenerator.vue'
</script>

<template>
  <div class="w-full">
    <ColorPicker />
    <hr />
    <PasswordGenerator />
    <hr />
  </div>
</template>

<style lang="scss">
.success-text {
  color: #54ee54;
}

.button-right-aligned-content {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
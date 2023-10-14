<script lang="ts" setup>
import { useEyeDropper } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

const { open, sRGBHex } = useEyeDropper()
let sRGBHexForeground = ref('#FFF')

onMounted(() => {
  const eyeDropperTrigger = document.getElementById('eyeDropperTrigger')
  console.log('trigger: ', eyeDropperTrigger)

  eyeDropperTrigger?.click()
})

watch(() => sRGBHex.value, () => {
  copyToClipboard()

  // Calculate inverse foreground color
  let hex = sRGBHex.value

  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);

  if ((r * 0.299 + g * 0.587 + b * 0.114) > 186) {
    sRGBHexForeground.value = '#000000';
  } else {
    sRGBHexForeground.value = '#FFFFFF';
  }
})

let clipboardSuccessState = ref(false)
function copyToClipboard() {
  navigator.clipboard.writeText(`${sRGBHex.value}`)
  clipboardSuccessState.value = true

  setTimeout(() => {
    clipboardSuccessState.value = false
  }, 2000)
}
</script>

<template>
  <button @click="open()">
    <i-pepicons-pop-color-picker-circle-filled /> Color picker

    <div class="flex button-right-aligned-content gap-2 items-center">
      <span v-if="clipboardSuccessState" class="success-text">Copied</span>

      <span class="picked-color" :style="`background-color: ${sRGBHex}; color: ${sRGBHexForeground};`">
        {{ sRGBHex }}
      </span>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.picked-color {
  display: inline-block;
  padding: 4px 6px;
  font-size: 11.5px;
  border-radius: 12px;
  font-weight: 600;
  letter-spacing: 0.08px;
  color: #000;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
</style>
<script lang="ts">
import { useEyeDropper } from '@vueuse/core'
import { ref } from 'vue'

export default {
  setup() {
    const { open, sRGBHex } = useEyeDropper()
    const clipboardSuccessState = ref(false)

    return {
      hexColor: sRGBHex,
      openEyeDropper: open,
      clipboardSuccessState,
    }
  },

  computed: {
    foregroundColor() {
      let hex = this.hexColor

      if (hex.indexOf('#') === 0) hex = hex.slice(1);
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }

      const r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);

      if ((r * 0.299 + g * 0.587 + b * 0.114) > 186) {
        return '#000000';
      }

      return '#FFFFFF';
    }
  },

  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(`${this.hexColor}`)
      this.clipboardSuccessState = true

      setTimeout(() => {
        this.clipboardSuccessState = false
      }, 2000)
    }
  },

  watch: {
    hexColor() {
      this.copyToClipboard()
    }
  }
}
</script>

<template>
  <button @click="openEyeDropper()">
    <i-ri-palette-fill /> {{ $t("color_picker_component.color_picker") }}

    <div v-if="hexColor" class="flex button-right-aligned-content gap-2 items-center">
      <span v-if="clipboardSuccessState" class="success-text">{{ $t('shared.feedback.copied') }}</span>

      <span class="picked-color" :style="`background-color: ${hexColor}; color: ${foregroundColor};`">
        {{ hexColor }}
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
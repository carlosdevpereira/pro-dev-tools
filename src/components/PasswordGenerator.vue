<script lang="ts">
// Allowed characters to be used in the generated strings
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*().";

export default {
  data() {
    return {
      password: '',
      clipboardSuccessState: false
    }
  },

  methods: {
    generatePassword() {
      let randomString = "";

      for (let i = 0; i < 16; i++) {
        randomString += characters[Math.floor(Math.random() * characters.length)];
      }

      this.password = randomString;
      this.copyToClipboard()
    },

    copyToClipboard() {
      navigator.clipboard.writeText(this.password)
      this.clipboardSuccessState = true

      setTimeout(() => {
        this.clipboardSuccessState = false
      }, 2000)
    }
  }
}
</script>

<template>
  <button @click="generatePassword()">
    <i-ri-key-fill /> {{ $t("password_generator_component.password_generator") }}

    <div class="flex button-right-aligned-content gap-2 items-center">
      <span v-if="clipboardSuccessState" class="success-text">{{ $t('shared.feedback.copied') }}</span>
    </div>
  </button>
</template>
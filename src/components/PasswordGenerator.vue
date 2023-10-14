<script lang="ts" setup>
import { ref } from 'vue';

let password = ref('')

function generatePassword() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*().";
  let randomString = "";

  for (let i = 0; i < 16; i++) {
    randomString += characters[Math.floor(Math.random() * characters.length)];
  }

  password.value = randomString;

  copyToClipboard()
}

let clipboardSuccessState = ref(false)
function copyToClipboard() {
  navigator.clipboard.writeText(password.value)
  clipboardSuccessState.value = true

  setTimeout(() => {
    clipboardSuccessState.value = false
  }, 2000)
}
</script>

<template>
  <button @click="generatePassword()">
    <i-solar-key-minimalistic-square-bold /> Password generator

    <div class="flex button-right-aligned-content gap-2 items-center">
      <span v-if="clipboardSuccessState" class="success-text">Copied</span>
    </div>
  </button>
</template>
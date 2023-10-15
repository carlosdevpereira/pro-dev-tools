<script lang="ts" setup>
const quitApp = () => {
  window.ipcRenderer.send("trigger-action", "quit-app");
}
</script>

<template>
  <button @click="quitApp">
    <i-ri-close-circle-fill /> {{ $t("quit_app_component.quit") }}
  </button>
</template>
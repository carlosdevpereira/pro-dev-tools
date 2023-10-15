<script setup lang="ts">
import ColorPicker from './components/ColorPicker.vue'
import CurrentVersion from './components/CurrentVersion.vue';
import PasswordGenerator from './components/PasswordGenerator.vue'
import ReportIssue from './components/ReportIssue.vue';
import QuitApp from './components/QuitApp.vue';
</script>

<template>
  <div class="w-full">
    <label>Pro.Dev.Tools</label>
    <ColorPicker />
    <hr />
    <PasswordGenerator />
    <hr class="w-full" />
    <CurrentVersion />
    <ReportIssue />
    <hr />
    <QuitApp />
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
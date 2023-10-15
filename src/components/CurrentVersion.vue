<script lang="ts" setup>
import Package from '../../package.json'
</script>

<template>
  <label>{{ $t('shared.app_version', { version: Package.version }) }}</label>
</template>
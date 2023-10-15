<script lang="ts" setup>
const reportAnIssue = () => {
  window.open('https://github.com/carlosdevpereira/pro-dev-tools/issues/new')
}
</script>

<template>
  <button @click="reportAnIssue">
    <i-ri-alert-fill /> {{ $t("report_issue_component.report_an_issue") }}
  </button>
</template>
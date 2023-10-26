<script setup lang="ts">
import OpenChatGPT from '@/components/OpenChatGPT.vue'
import ColorPicker from '@/components/ColorPicker.vue'
import CurrentVersion from '@/components/CurrentVersion.vue';
import PasswordGenerator from '@/components/PasswordGenerator.vue'
import ReportIssue from '@/components/ReportIssue.vue';
import QuitApp from '@/components/QuitApp.vue';
</script>

<template>
    <label>Pro.Dev.Tools</label>
    <OpenChatGPT />
    <ColorPicker />
    <hr />
    <PasswordGenerator />
    <hr class="w-full" />
    <CurrentVersion />
    <ReportIssue />
    <hr />
    <QuitApp />
</template>
<script setup lang="ts">
const openChatGPT = () => {
    window.open('https://chat.openai.com/')
}
</script>

<template>
    <button @click="openChatGPT">
        <i-ri-chat-smile-2-line /> {{ $t("chat_gpt_component.chat_gpt") }}
    </button>
</template>


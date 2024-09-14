<template>
<AudioViewWrapper
    v-model:audio="store.audio" />
</template>

<script setup>
import { useScriptStore } from 'src/modules/transcripts/ScriptStore';
import AudioViewWrapper from 'src/modules/audio/AudioViewWrapper.vue';

const store = useScriptStore()
</script>
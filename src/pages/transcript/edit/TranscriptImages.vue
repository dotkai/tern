<template>
<ImageViewWrapper 
    v-model:images="store.images"
/>
</template>

<script setup>
import { useScriptStore } from 'src/modules/transcripts/ScriptStore';
import ImageViewWrapper from 'src/modules/images/ImageViewWrapper.vue';

const store = useScriptStore()
</script>
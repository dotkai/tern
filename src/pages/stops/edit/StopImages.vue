<template>
<ImageViewWrapper 
    v-model:images="store.images"
/>
</template>

<script setup>
import { useStopStore } from 'src/modules/stops/StopStore';
import ImageViewWrapper from 'src/modules/images/ImageViewWrapper.vue';

const store = useStopStore()
</script>
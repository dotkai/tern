<template>
<ImageViewWrapper 
    v-model:images="store.images"
/>
</template>

<script setup>
import { useLocationStore } from 'src/modules/location/LocationStore';
import ImageViewWrapper from 'src/modules/images/ImageViewWrapper.vue';

const store = useLocationStore()
</script>
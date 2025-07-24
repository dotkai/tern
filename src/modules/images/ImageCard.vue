<template>
<q-card class="my-card">
    <ImageWrapper
        :filename="path" />

    <div class="text-subtitle2 ellipsis q-pa-sm">{{ name }}</div>
    <div>
        <q-chip v-for="tag in tags" :key="tag">{{ tag }}</q-chip>
    </div>
</q-card>
</template>

<script setup>
import ImageWrapper from 'src/components/wrappers/ImageWrapper.vue';

defineProps({
    path: String,
    name: String,
    tags: Array
})
</script>

<style lang="scss">
.my-card {
  width: 200px;
}
</style>
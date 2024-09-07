<template>
<q-card class="my-card">
    <q-img :src="'/image_files/'+path"
        spinner-color="blue" />

    <div class="text-subtitle2 ellipsis q-pa-sm">{{ name }}</div>
    <div>
        <q-chip v-for="tag in tags" :key="tag">{{ tag }}</q-chip>
    </div>
</q-card>
</template>

<script setup>
defineProps({
    path: String,
    name: String,
    tags: Array
})
</script>

<style lang="scss">
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
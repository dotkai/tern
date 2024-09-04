<template>
<div style="display: inline-block;">
    <q-card class="my-card" @click="editDialog = true">
        <q-card-section>
            <div class="text-subtitle2 ellipsis">{{ name }}</div>
        </q-card-section>

        <q-img :src="'/image_files/'+path"
            spinner-color="blue" />

        <q-card-section>
            <q-chip v-for="tag in tags" :key="tag">{{ tag }}</q-chip>
        </q-card-section>
    </q-card>

    <ImageGalleryCardEditDialog 
        v-model="editDialog"
        :_id="_id"
        :path="path"
        :name="name"
        :tags="tags"
        @onupdate="v => $emit('onupdate', v)"
        @onremove="v => $emit('onremove', v)" />
</div>
</template>

<script setup>
import {ref} from 'vue'
import ImageGalleryCardEditDialog from './_ImageGalleryCardEditDialog.vue';

defineProps({
    _id: String,
    path: String,
    name: String,
    tags: Array
})
defineEmits(['onupdate', 'onremove'])

const editDialog = ref(null)
</script>

<style lang="scss">
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
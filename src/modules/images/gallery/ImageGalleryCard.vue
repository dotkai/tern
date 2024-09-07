<template>
<div style="display: inline-block;">
    <ImageCard 
        :name="name"
        :path="path"
        :tags="tags"
        @click="editDialog = true"
        />

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
import ImageCard from '../ImageCard.vue';
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

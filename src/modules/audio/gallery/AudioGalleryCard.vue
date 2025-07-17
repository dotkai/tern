<template>
<div style="display: inline-block;">
    <AudioCard 
        :name="name"
        :path="path"
        :tags="tags"
        @onclick="editDialog = true"
        />

        <AudioCardEditDialog 
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
import AudioCard from '../AudioCard.vue';
import AudioCardEditDialog from './_AudioCardEditDialog.vue';

const props = defineProps({
    _id: String,
    path: String,
    name: String,
    tags: Array
})
defineEmits(['onupdate', 'onremove'])

const editDialog = ref(null)
</script>

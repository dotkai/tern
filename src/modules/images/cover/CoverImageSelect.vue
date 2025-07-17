<template>
<div class="col" style="position: relative;">
    <div>
        <q-img
            v-if="path" 
            :src="'/image_files/'+path"
            height="200px">
            <div class="absolute-bottom bg-grey-4">
                CAPTION
            </div>
        </q-img>
        <div 
            v-if="!path"
            class="bg-grey-4 row justify-center items-center" 
            style="height:200px;">
            <q-icon name="image" size="lg" color="grey-6"/>
        </div>
    </div>
    <FindSelectImageButton
        style="position:absolute;bottom:5px;left:5px;"
        @update:images="v => $emit('update:path', v[0].path)" />
    <q-btn 
        v-if="path"
        flat round
        style="position:absolute;bottom:5px;right:5px;"
        icon="clear"
        @click="$emit('update:path', null)"
        />
</div>
</template>

<script setup>
import FindSelectImageButton from '../FindSelectImageButton.vue';

const props = defineProps({
    path: String
})
defineEmits(['update:path'])

</script>
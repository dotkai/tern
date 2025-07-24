<template>
<div class="col" style="position: relative;">
    <div>
        <ImageWrapper
            :filename="path"
            style="height: 200px">        
            <div class="absolute-bottom bg-grey-4">
                CAPTION
            </div>
        </ImageWrapper>
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
import ImageWrapper from 'src/components/wrappers/ImageWrapper.vue';
import FindSelectImageButton from '../FindSelectImageButton.vue';

const props = defineProps({
    path: String
})
defineEmits(['update:path'])

</script>
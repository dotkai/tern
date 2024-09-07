<template>
<MaxMinDialogWrapper
    :modelValue="modelValue" 
    @update:model-value="$emit('update:model-value')" >
    <div>
        <q-card-section class="row">
            <div class="col q-pa-md">
                <q-img 
                    spinner-color="blue" 
                    class="display-image" :src="'/image_files/'+path"/>
            </div>
            <q-separator vertical inset />
            <div class="col q-pa-md">
                <span class="text-subtitle2">Image Name</span>
                <q-input filled clearable v-model="updateName" />
                <span class="text-subtitle2">Caption</span>
                <q-input
                    v-model="updateCaption"
                    filled
                    type="textarea" />
            </div>
        </q-card-section>

        <q-card-actions>
            <q-btn flat label="Remove" icon="delete" color="red" v-close-popup
                @click="removeImage" />
            <q-space />
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Save" icon="save" color="primary" v-close-popup
                @click="updateImage" />
        </q-card-actions>
    </div>
</MaxMinDialogWrapper>
</template>

<script setup>
import {ref, watch} from 'vue'
import _ from 'lodash'
import MaxMinDialogWrapper from 'src/components/wrappers/MaxMinDialogWrapper.vue';

const props = defineProps({
    modelValue: Boolean,
    image_id: String,
    path: String,
    name: String,
    caption: String,

    images: Array
})
const emit = defineEmits(['update:model-value', 'update:images'])

const updateName = ref(null)
const updateCaption = ref(null)

watch(() => props.name, (nu, ol) => {
    updateName.value = nu
})
watch(() => props.caption, (nu,ol) => {
    updateCaption.value = nu
})
    

function updateImage(){
    const target = props.images.find(v => v.image_id === props.image_id)
    target.name = updateName
    target.caption = updateCaption
}
function removeImage(){
    emit('update:images', store.images.filter(v => v.image_id !== props.image_id))
}
</script>
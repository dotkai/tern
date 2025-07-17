<template>
    <PickerBlock 
    label="Select Script"
    icon="edit_note"
    :modelValue="modelValue"
    @update:modelValue="onupdate"
    :stopOptionList="scriptList"
    :addRoute="{ name: 'edit_script', params: { script_id: 'NEW' } }" />
</template>

<script setup>
import _ from 'lodash';
import PickerBlock from 'src/components/forms/PickerBlock.vue';
import { Database } from 'src/db/db';
import { ref } from 'vue';

const props = defineProps({
    modelValue: Array
})
const emit = defineEmits(['update:model-value', 'onadd'])

const ScriptData = new Database('transcripts')
const scriptList = ref([])

function onupdate(v){
    // Setup 1, get the newkey being added
    // Get the data associated with it
    const diff = _.difference(v, props.modelValue || [])
    const nu = scriptList.value.find(v => v._id === diff[0])

    emit('update:model-value', v)
    emit('onadd', {
        images: JSON.parse(JSON.stringify(nu.images)),
        locations: JSON.parse(JSON.stringify(nu.locations))
    })
}

init()

async function init(){
    const data = await ScriptData.getAll()
    scriptList.value = data
}
</script>
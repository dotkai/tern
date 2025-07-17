<template>
<PickerBlock 
    label="Select Location"
    icon="pin_drop"
    :modelValue="modelValue"
    @update:modelValue="onupdate"
    :stopOptionList="locationList"
    :addRoute="{ name: 'edit_location', params: { location_id: 'NEW' } }" />
</template>

<script setup>
import _ from 'lodash'
import PickerBlock from 'src/components/forms/PickerBlock.vue';
import { Database } from 'src/db/db';
import { ref, onMounted } from 'vue';

const props = defineProps({
    modelValue: Array
})
const emit = defineEmits(['update:model-value', 'onadd'])

const LocationData = new Database('locations')
const locationList = ref([])

function onupdate(v){
    // Setup 1, get the newkey being added
    // Get the data associated with it
    const diff = _.difference(v, props.modelValue || [])
    const nu = locationList.value.find(v => v._id === diff[0])

    emit('update:model-value', v)
    emit('onadd', {
        images: JSON.parse(JSON.stringify(nu.images))
    })
}

onMounted(async () => {
    const data = await LocationData.getAll()
    locationList.value = data
})
</script>
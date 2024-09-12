<template>
<PickerBlock 
    :modelValue="location"
    @update:modelValue="v => $emit('update:model-value', v)"
    :stopOptionList="locationList"
    :addRoute="{ name: 'edit_location', params: { location_id: 'NEW' } }" />
</template>

<script setup>
import PickerBlock from 'src/components/forms/PickerBlock.vue';
import { Database } from 'src/db/db';
import { ref } from 'vue';

defineProps({
    location: Array
})
defineEmits(['update:model-value'])

const LocationData = new Database('locations')
const locationList = ref([])

LocationData.getAll()
.then(data => locationList.value = data)

</script>
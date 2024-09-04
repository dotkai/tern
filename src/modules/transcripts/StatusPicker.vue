<template>
<SelectItem 
    :selected="modelValue"
    :options="options"
    @update:selected="v => $emit('update:model-value', v)"
/>

</template>

<script setup>
import SelectItem from 'src/components/forms/SelectItem.vue';

defineProps({
    modelValue: String
})

defineEmits(['update:model-value'])

const options = [{
    _id: 'TO_DO',
    name: 'To Do'
}, {
    _id: 'IN_PROGRESS',
    name: 'In Progress'
}, {
    _id: 'EDITING',
    name: 'Editing'
}, {
    _id: 'COMPLETE',
    name: 'Complete'
}, {
    _id: 'ARCHIVED',
    name: 'Archived'
}, {
    _id: 'FLAGGED',
    name: '! Flagged !'
},]
</script>
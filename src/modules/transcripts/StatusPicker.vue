<template>
<SelectItem 
    :selected="modelValue"
    :options="options"
    @update:selected="v => $emit('update:model-value', v)"
/>

</template>

<script setup>
import STATUS from 'src/constants/STATUS.js'
import SelectItem from 'src/components/forms/SelectItem.vue';

defineProps({
    modelValue: String
})

defineEmits(['update:model-value'])

const options = STATUS;
</script>
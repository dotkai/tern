<template>
<q-input dense filled 
  :label="label"
  :modelValue="modelValue" 
  @update:modelValue="v => $emit('update:modelValue', v)" />
</template>

<script setup>
defineProps({
    modelValue: String,
    label: String
})
defineEmits(['update:modelValue'])
</script>
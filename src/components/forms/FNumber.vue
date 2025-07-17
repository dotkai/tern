<template>
<q-input 
  dense filled 
  type="number"
  :label="label"
  :modelValue="modelValue" 
  @update:modelValue="v => $emit('update:modelValue', v)" />
</template>

<script setup>
defineProps({
    modelValue: [String, Number],
    label: String
})
defineEmits(['update:modelValue'])
</script>
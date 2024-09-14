<template>
    <PickerBlock 
        :modelValue="transcripts"
        @update:modelValue="v => $emit('update:model-value', v)"
        :stopOptionList="scriptList"
        :addRoute="{ name: 'edit_script', params: { script_id: 'NEW' } }" />
    </template>
    
    <script setup>
    import PickerBlock from 'src/components/forms/PickerBlock.vue';
    import { Database } from 'src/db/db';
    import { ref } from 'vue';
    
    defineProps({
        transcripts: Array
    })
    defineEmits(['update:model-value'])
    
    const ScriptData = new Database('transcripts')
    const scriptList = ref([])
    
    init()
    
    async function init(){
        const data = await ScriptData.getAll()
        scriptList.value = data
    }
    </script>
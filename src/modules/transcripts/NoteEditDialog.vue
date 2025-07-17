<template>
<MaxMinDialogWrapper
    :modelValue="modelValue"
    @update:model-value="v => $emit('update:model-value', v)">
    <div>
        <div>
            <TextEditor class="q-pb-lg" style="max-height: 400px;overflow: auto;"
                v-model:text="editText" />
        </div>
        
        <div class="row justify-between">
            <RemoveButton v-close-popup @click="$emit('remove')" />
            <div>  
                <CancelButton v-close-popup />
                <SaveButton @click="updateText" />
            </div>
        </div>
    </div>
</MaxMinDialogWrapper>
</template>

<script setup>
import { ref, watch } from 'vue'
import RemoveButton from 'src/components/buttons/RemoveButton.vue';
import SaveButton from 'src/components/buttons/SaveButton.vue';
import TextEditor from 'src/components/forms/TextEditor.vue';
import MaxMinDialogWrapper from 'src/components/dialogs/MaxMinDialog.vue';
import CancelButton from 'src/components/buttons/CancelButton.vue';

const props = defineProps({
    modelValue: Boolean,
    text: String
})
const emit = defineEmits(['update:model-value', 'update:text', 'remove'])

const editText = ref()
watch(() => props.text, (nu, ol) => {
    editText.value = nu
})

function updateText(){
    emit('update:text', editText.value)
}

</script>

<style>
.fixed-bar {
    position: fixed;
    z-index: 100;
    background: white;
}
</style>
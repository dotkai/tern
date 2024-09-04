<template>
<QuillEditor theme="snow" style="min-height: 300px;"
    :content="text" @update:content="v => $emit('update:text', v)" contentType="html" />
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps({
    text: String
})
const emits = defineEmits(['update:text'])
</script>
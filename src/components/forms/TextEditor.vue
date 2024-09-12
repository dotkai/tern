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

<style>
.ql-snow .ql-editor h1 {
    line-height: 2em;
}
.ql-snow .ql-editor h2 {
    line-height: 1.5em;
}
</style>
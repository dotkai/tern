<template>
<section>
    <TextEditor v-model="store.sources" />
</section>
</template>

<script setup>
import TextEditor from 'src/components/forms/TextEditor.vue';
import { useScriptStore } from 'src/modules/transcripts/ScriptStore';

const store = useScriptStore()
</script>
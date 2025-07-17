<template>
<section>  
  <ScriptSelect v-model="store.transcripts"
    @onadd="store.addScriptAttachment" />
  
  <EmptyContentBlock v-if="!store.transcripts.length" label="No Script" icon="edit_note" />
  <ScriptList v-model:transcripts="store.transcripts" />

</section>
</template>

<script setup>
import { useStopStore } from 'src/modules/stops/StopStore';
import ScriptSelect from 'src/modules/transcripts/ScriptSelect.vue';
import ScriptList from 'src/modules/transcripts/ScriptList.vue';
import EmptyContentBlock from 'src/components/space_holders/EmptyContentBlock.vue';

const store = useStopStore()


</script>
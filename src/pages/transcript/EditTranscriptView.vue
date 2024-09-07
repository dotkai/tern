<template>
<EditPageWrapper
  name="Script"
  :store="store"
  :routeData="routeData"
  :linksList="linksList"
/>
</template>

<script setup>
  import { useScriptStore } from 'src/modules/transcripts/ScriptStore';
  import EditPageWrapper from 'src/components/wrappers/EditPageWrapper.vue';

  const store = useScriptStore()
  const routeData = {
    param_id: 'script_id',
    back_root: 'scripts'
  }

  const linksList = [{
    title: 'Home',
    to: { name: 'edit_script' }
  }, {
    title: 'Notes',
    to: { name: 'edit_script_notes' }
  }, {
    title: 'Sources',
    to: { name: 'edit_script_sources' }
  }, {
    title: 'Images',
    to: { name: 'edit_script_images' }
  }, {
    title: 'Audio',
    to: { name: 'edit_script_audio' }
  }]
</script>

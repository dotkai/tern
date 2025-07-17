<template>
<EditPageWrapper
  name="Script"
  :store="store"
  :routeData="routeData"
  :linksList="linksList"
>
  <TranscriptMain />

  <template #helper="{ tab }">  
    <component :is="getTabComponent(tab)" />
  </template>
</EditPageWrapper>
</template>

<script setup> 
  import { useScriptStore } from 'src/modules/transcripts/ScriptStore';
  import EditPageWrapper from 'src/components/wrappers/EditPageWrapper.vue';

  import TranscriptMain from 'src/pages/transcript/edit/TranscriptMain.vue'

  import TranscriptLocation from 'src/pages/transcript/edit/TranscriptLocation.vue'
  import TranscriptNotes from 'src/pages/transcript/edit/TranscriptNotes.vue'
  import TranscriptSources from 'src/pages/transcript/edit/TranscriptSources.vue'
  import TranscriptImages from 'src/pages/transcript/edit/TranscriptImages.vue'
  import TranscriptAudio from 'src/pages/transcript/edit/TranscriptAudio.vue'

  const store = useScriptStore()
  const routeData = {
    param_id: 'script_id',
    back_root: 'scripts'
  }

  const linksList = [{
    title: 'Location',
    icon: 'pin_drop'
  },{
    title: 'Notes',
    icon: 'note'
  }, {
    title: 'Sources',
    icon: 'attribution',
    to: 'sources',
    path: { name: 'edit_script_sources' }
  }, {
    title: 'Images',
    icon: 'image',
    to: 'images',
    path: { name: 'edit_script_images' }
  }, {
    title: 'Audio',
    icon: 'mic',
    to: 'audio',
    path: { name: 'edit_script_audio' }
  }]

function getTabComponent(tab) {
  switch (tab) {
    case 'Location': return TranscriptLocation
    case 'Notes': return TranscriptNotes
    case 'Sources': return TranscriptSources
    case 'Images': return TranscriptImages
    case 'Audio': return TranscriptAudio
    default: return null
  }
}
</script>

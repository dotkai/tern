<template>
<EditPageWrapper
  name="Stop"
  :store="store"
  :routeData="routeData"
  :linksList="linksList"
>
  <StopMain />
  
  <template #helper="{ tab }">  
    <component :is="getTabComponent(tab)" />
  </template>

</EditPageWrapper>
</template>

<script setup>
  import { useStopStore } from 'src/modules/stops/StopStore';
  import EditPageWrapper from 'src/components/wrappers/EditPageWrapper.vue';
  import StopMain from './edit/StopMain.vue';
import StopImages from './edit/StopImages.vue';
import StopScripts from './edit/StopScripts.vue'

  const store = useStopStore()
  const routeData = {
    param_id: 'stop_id',
    back_root: 'stops'
  }

  const linksList = [{
    title: 'Script',
    icon: 'edit_note',
  }, {
    title: 'Images',
    icon: 'image'
  }]

  function getTabComponent(tab) {
  switch (tab) {
    case 'Images': return StopImages
    case 'Script': return StopScripts
    default: return null
  }
}
</script>

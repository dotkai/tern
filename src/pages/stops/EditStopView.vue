<template>
  <EditPageWrapper
  name="Stop"
  :store="store"
  :routeData="routeData"
  :linksList="linksList"
/>
</template>

<script setup>
  import { useStopStore } from 'src/modules/stops/StopStore';
  import EditPageWrapper from 'src/components/wrappers/EditPageWrapper.vue';

  const store = useStopStore()
  const routeData = {
    param_id: 'stop_id',
    back_root: 'stops'
  }

  const linksList = [{
    title: 'Home',
    to: { name: 'edit_stop' }
  }, {
    title: 'Images',
    to: { name: 'edit_stop_images' }
  }]
</script>

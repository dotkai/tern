<template>
<EditPageWrapper
  name="Location"
  :store="store"
  :routeData="routeData"
  :linksList="linksList"
/>
</template>

<script setup>
  import { useLocationStore } from 'src/modules/location/LocationStore';
  import EditPageWrapper from 'src/components/wrappers/EditPageWrapper.vue';

  const store = useLocationStore()
  const routeData = {
    param_id: 'location_id',
    back_root: 'location'
  }

  const linksList = [{
    title: 'Home',
    to: { name: 'edit_location' }
  }, {
    title: 'Images',
    to: { name: 'edit_location_images' }
  }]

</script>

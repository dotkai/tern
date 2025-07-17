<template>
<EditPageWrapper
  name="Location"
  :store="store"
  :routeData="routeData"
  :linksList="linksList">

  <LocationMain />
  
  <template #helper="{ tab }">  
    <component :is="getTabComponent(tab)" />
  </template>
</EditPageWrapper>
</template>

<script setup>
  import { useLocationStore } from 'src/modules/location/LocationStore';
  import EditPageWrapper from 'src/components/wrappers/EditPageWrapper.vue';

  import LocationMain from 'src/pages/location/edit/LocationMain.vue'
  import LocationMap from 'src/pages/location/edit/LocationMap.vue'
  import LocationImage from 'src/pages/location/edit/LocationImage.vue'

  const store = useLocationStore()
  const routeData = {
    param_id: 'location_id',
    back_root: 'location'
  }

  const linksList = [{
    title: 'Map',
    icon: 'map'
  },{
    title: 'Images',
    icon: 'image'
  }]

function getTabComponent(tab) {
  switch (tab) {
    case 'Map': return LocationMap
    case 'Images': return LocationImage
    default: return null
  }
}
</script>

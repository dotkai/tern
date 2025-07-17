<template>
<section>
  <LocationSelect 
    v-model="store.locations"
    @onadd="store.addLocationAttachment" />
  <EmptyContentBlock v-if="!store.locations.length" label="No Location" icon="pin_drop" />
  <LocationList
    v-model:location="store.locations" />
</section>
</template>

<script setup>
  import EmptyContentBlock from 'src/components/space_holders/EmptyContentBlock.vue';
import LocationList from 'src/modules/location/LocationList.vue';
import LocationSelect from 'src/modules/location/LocationSelect.vue';
  import { useScriptStore } from 'src/modules/transcripts/ScriptStore';

  const store = useScriptStore()

</script>
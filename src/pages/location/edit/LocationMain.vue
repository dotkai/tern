<template>
<section>
  <LabelWrapper name="Name">
    <q-input class="col" filled v-model="store.name" />
  </LabelWrapper>
  <GroupTagSelect
    v-model:group="store.group"
    v-model:tags="store.tags" />
  <LabelWrapper name="Location">
    <div class="col">
      <q-input filled label="Adress" v-model="store.location_address" />
      <TextDivider label="OR"/>
      <div class="row">
        <q-input filled class="col q-mr-sm" label="Latitude" v-model="store.location_lat" type="number" />
        <q-input filled class="col q-ml-sm" label="Longitude" v-model="store.location_long" type="number" />
      </div>
      <div>
        <GoogleMap
          :address="store.location_address"
          :lat="store.location_lat"
          :long="store.location_long"/>
      </div>
    </div>
  </LabelWrapper>
</section>
</template>

<script setup>
import { useLocationStore } from 'src/modules/location/LocationStore';
import GoogleMap from 'src/components/GoogleMap.vue';
import TextDivider from 'src/components/TextDivider.vue';
import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue';
import GroupTagSelect from 'src/modules/groups/GroupTagSelect.vue';

const store = useLocationStore()

// SETUP INIT DATA

</script>
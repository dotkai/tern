<template>
<section>
  <LabelWrapper name="Name">
    <FInput class="col" v-model="store.name" />
  </LabelWrapper>
  <LabelWrapper name="Tags">
    <ChipAutoAddInput 
      class="col"
      v-model:chips="store.tags"
      v-model:options="tagList"
    />
  </LabelWrapper>

  <LabelWrapper name="Location">
  <div class="col">
    <div v-if="store.maptype === 'ADDRESS'">
      <FInput
        label="Address"
        v-model="pendingAddress"
        @keyup.enter="updateMap"
      />
    </div>
    <div v-else>
      <div class="row">
        <FNumber
          class="col q-mr-sm"
          label="Latitude"
          v-model.number="pendingLat"
          @keyup.enter="updateMap"
        />
        <FNumber
          class="col q-ml-sm"
          label="Longitude"
          v-model.number="pendingLong"
          @keyup.enter="updateMap"
        />
      </div>
    </div>
    
    <div class="row justify-between q-mb-sm">
      <q-toggle
        v-model="store.maptype"
        :true-value="'COORD'"
        :false-value="'ADDRESS'"
        label="Use Coordniates"
        left-label
      />
      <div>
        <q-btn flat rounded color="primary" icon="travel_explore"
          @click="updateMap" />
      </div>
    </div>
  </div>
</LabelWrapper>

</section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Database } from 'src/db/db';
import { useLocationStore } from 'src/modules/location/LocationStore';
import {NotifyService} from 'src/services';
import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue';
import FInput from 'src/components/forms/FInput.vue';
import FNumber from 'src/components/forms/FNumber.vue';
import ChipAutoAddInput from 'src/components/forms/ChipAutoAddInput.vue';

const store = useLocationStore()
const LocationDatabase = new Database('locations')
const message = new NotifyService('Location')

const tagList = ref([])
const pendingAddress = ref(store.address);
const pendingLat = ref(store.coords.lat);
const pendingLong = ref(store.coords.lon);

watch(() => store.address, (val) => {
  pendingAddress.value = val
})
watch(() => store.coords, (val) => {
  pendingLat.value = val.lat
  pendingLong.value = val.lon
})

// Get the tags
onMounted(async () => {
  tagList.value = await LocationDatabase.getGroup('tags')
})

function updateMap() {
  if (store.maptype === 'COORD') {
    if(!(pendingLat.value && pendingLong.value)) return message.userError('Please add coordinates')
    store.coords = {
      lat: Number(pendingLat.value),
      long: Number(pendingLong.value)
    }
    store.address = '' // optional: clear to avoid confusion
  } else {
    if(!pendingAddress.value) return message.userError('Please add address')
    store.address = pendingAddress.value
    store.coords = { lat: 0, long: 0 } // optional: clear coords
  }
}

</script>
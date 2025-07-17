<template>
<section>
    <LabelWrapper name="Name">
        <FInput class="col" v-model="store.name" />
    </LabelWrapper>
    <LabelWrapper name="Tags">        
        <ChipAutoAddInput 
            class="col"
          v-model:chips="store.tags"
          v-model:options="filterOptions" />
    </LabelWrapper>
    <LocationSelect class="col" 
      v-model="store.locations"
      @onadd="store.addLocationAttachment" />
    
    <LocationList
        v-model:location="store.locations" />
</section>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { useStopStore } from 'src/modules/stops/StopStore';
import { Database } from 'src/db/db';
import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue';
import LocationSelect from 'src/modules/location/LocationSelect.vue';
import FInput from 'src/components/forms/FInput.vue';
import LocationList from 'src/modules/location/LocationList.vue';
import ChipAutoAddInput from 'src/components/forms/ChipAutoAddInput.vue';

const store = useStopStore()
const StopDatabase = new Database('stories')

const filterOptions = ref([])

// Get the tags
onMounted(async () => {
  filterOptions.value = await StopDatabase.getGroup('tags')
})
</script>
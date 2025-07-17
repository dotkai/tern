<template>
<div>
  <q-separator class="q-mb-md" />
  <LabelWrapper name="Export Type">
    <SelectItem
      v-model="getView"
      :options="viewTypeOptions" />
  </LabelWrapper>
  <q-separator />

  <ExportPrintSubview v-if="getView === 'FULL'" :tour="tour" />
  <ExportMaterialSubview v-if="getView === 'MATERIALS'" :tour="tour" />
  <ExportAudioSubview v-if="getView === 'AUDIO'" :tour="tour" />
</div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useTourStore } from 'src/modules/tours/TourStore';
import { Database } from 'src/db/db';
import SelectItem from 'src/components/forms/SelectItem.vue';
import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue';
import ExportPrintSubview from 'src/modules/tours/exports/ExportPrintSubview.vue';
import ExportMaterialSubview from 'src/modules/tours/exports/ExportMaterialSubview.vue';
import ExportAudioSubview from 'src/modules/tours/exports/ExportAudioSubview.vue';

const store = useTourStore()
const TourDatabase = new Database('tours')

const tour = ref({})
const getView = ref('FULL')

const viewTypeOptions = [{
  _id: 'FULL',
  name: 'Full Compiled Tour'
}, {
  _id: 'MATERIALS',
  name: 'Materials'
}, {
  _id: 'AUDIO',
  name: 'Audio'
}]

onMounted(async () => {
  tour.value = await TourDatabase.getOneFilled(store.ACTIVE_ID, [{
    origin: 'stops',
    db: 'stories',
    fill: ['locations', 'transcripts']
  }])
})
</script>
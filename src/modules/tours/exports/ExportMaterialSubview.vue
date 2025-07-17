<template>
<div class="q-pt-sm">
  <LabelWrapper name="Export to">
    <SelectItem 
      v-model:selected="selected"
      :options="exportOptions"
      />
  </LabelWrapper>
  
  <div class="row justify-between">
    <PreviewWrapperButton>
      <q-card-section class="row justify-between">
        <SelectItem 
          v-model:selected="selected"
          :options="exportOptions"
          />        
        <ExportButton
          :disable="!selected"
          @click="launchExport" />
      </q-card-section>
      <TourMaterialCard
        v-for="image in imageList" 
        :key="image.image_id"
        :image="image" />
    </PreviewWrapperButton>

    <ExportButton
      :disable="!selected"
      @click="launchExport" />
  </div>

  <div ref="printContent">    
    <TourMaterialCard
      v-for="(image, index) in imageList" 
      :key="image.image_id"
      :image="image"
      :class="index > 0 ? 'pdf-page-break' : ''" />
  </div>
</div>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue';
import SelectItem from 'src/components/forms/SelectItem.vue';
import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue';
import ExportButton from '../minis/ExportButton.vue';
import PreviewWrapperButton from '../minis/PreviewWrapperButton.vue';
import TourMaterialCard from '../TourMaterialCard.vue';
import { ExportService, NotifyService } from 'src/services';
import { useTourStore } from '../TourStore';

const props = defineProps({
  tour: Object
})

const store = useTourStore()
const message = new NotifyService('Export')

const selected = ref('')
const printContent = ref(null)
const exportOptions = [{
  _id: 'PDF',
  name: 'PDF'
}, {
  _id: 'HTML',
  name: 'Web (index.html and files)'
}]


const fileName = computed(() => {
  return store.title?.replace(' ', '') + 'Materials'
})

const imageList = computed(() => {
  let dump = []
  props.tour?.stops.forEach((stop, index) => {
    dump.push(...stop.images.map(img => {
      return {
        stopNumber: index + 1,
        stopName: stop.name,
        ...img
      }
    }))
  });
  return dump
})


async function launchExport(){
  const map = {
    PDF: async () => {
      return ExportService.exportToPDF(fileName.value, printContent.value)
    },
    HTML: () => {
      return ExportService.exportToZip(fileName.value, printContent.value?.outerHTML)
    }
  }

  try {
    await map[selected.value]()
  } catch(e){
    message.error(e)
  }
}
</script>


<style>
@media print {
  .pdf-page-break {
    page-break-before: always;
    break-before: page;
  }
}
</style>
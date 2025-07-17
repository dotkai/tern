<template>
<div class="q-pt-sm">
  <LabelWrapper name="File/Zip Name">
    <div>{{ fileName }}</div>
  </LabelWrapper> 
  <LabelWrapper name="Export to">
    <div class="column">
      <SelectItem 
        v-model:selected="selected"
        :options="exportOptions"
        @onset="onUpdatePrintSelect"
        />
      <ShowToggles 
        v-model:showImages="showImages"
        v-model:showAudio="showAudio"
        :disableAudio="disableAudio"
        />
    </div>
  </LabelWrapper>

  <div class="row justify-between">
    <PreviewWrapperButton>
      <q-card-section class="row justify-between">
        <LabelWrapper name="Export to">
          <SelectItem 
            v-model:selected="selected"
            :options="exportOptions"
            />
        </LabelWrapper>  
        <ShowToggles 
          v-model:showImages="showImages"
          v-model:showAudio="showAudio"
          :disableAudio="disableAudio"
          />
        <ExportButton
          :disable="!selected"
          @click="launchExport" />
      </q-card-section>
      <q-card-section>
        <TourPrintView
        :tour="tour"
          :show-images="showImages" />
      </q-card-section>
    </PreviewWrapperButton>

      <ExportButton
        :disable="!selected"
        @click="launchExport" />
  </div>

  <q-card>
    <q-card-section>
      <TourPrintView
        ref="printContent"
        :tour="tour"
        :show-images="showImages"
        :show-audio="showAudio" />
    </q-card-section>
  </q-card>
</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useTourStore } from 'src/modules/tours/TourStore';

import SelectItem from 'src/components/forms/SelectItem.vue';
import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue';
import TourPrintView from 'src/modules/tours/TourPrintView.vue';
import ShowToggles from '../minis/ShowToggles.vue';
import PreviewWrapperButton from '../minis/PreviewWrapperButton.vue';
import ExportButton from '../minis/ExportButton.vue';
import { ExportService, NotifyService } from 'src/services';

defineProps({
  tour: Object
})

const store = useTourStore()
const message = new NotifyService('Export')

const selected = ref('')
const printContent = ref(null)

const showImages = ref(true)
const showAudio = ref(true)
const disableAudio = ref(false)

const exportOptions = [{
  _id: 'PDF',
  name: 'PDF'
}, {
  _id: 'HTML',
  name: 'Web (index.html and files)'
}]

const fileName = computed(() => {
  return store.title?.replace(' ', '')
})

function onUpdatePrintSelect(value){
  showAudio.value = ['PDF', 'WORD'].includes(value)? false : true;
  disableAudio.value = ['PDF', 'WORD'].includes(value)? true : false;
}

async function launchExport(){
  const map = {
    PDF: () => {
      ExportService.exportToPDF(fileName.value, printContent.value?.$el)
    },
    HTML: () => {
      ExportService.exportToZip(fileName.value, printContent.value?.$el.outerHTML)
    }
  }

  try {
    await map[selected.value]()
  } catch(e){    
    message.error(e)
  }
}
</script>
<template>
<div>
  <LabelWrapper name="Zip Name">
    <div class="col align-center">{{ fileName }}</div>
  </LabelWrapper> 
  <div class="row justify-end">
    <ExportButton
      @click="launchExport" />
  </div>
  <div v-for="(stop, index) in tour.stops" :key="stop._id">
    <div class="q-mb-md">
      <div class="text-h6">{{ index+1 }}. {{ stop.name }}</div>
      <div class="text-subtitle2">{{ formatLocationName(stop.locations) }}</div>
      <div>Export Name: {{ getAudioExportName(stop, index)  }}</div>
    </div>
    <div v-for="script in stop.transcripts" :key="script._id">
        <div v-for="(audio, index) in script.audio" :key="index" class="q-mb-md">
          <audio controls>
            <source :src="`/audio_files/${audio.path}`" :type="getAudioMimeType(audio.path)" />
            Audio file type not supported.
          </audio>
        </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTourStore } from '../TourStore'
import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue'
import { ExportService, NotifyService } from 'src/services'
import ExportButton from '../minis/ExportButton.vue'

const props = defineProps({
  tour: Object
})

const store = useTourStore()
const message = new NotifyService('Export')

const fileName = computed(() => {
  return store.title?.replace(' ', '')
})

function formatLocationName(locations = []) {
  return locations
    .map(loc => {
      if (!loc) return ''

      const { maptype, address, coords } = loc

      if (maptype === 'ADDRESS' && address) {
        return address
      }

      if (maptype === 'COORD' && coords?.lat != null && coords?.lon != null) {
        const lat = parseFloat(coords.lat).toFixed(5)
        const lon = parseFloat(coords.lon).toFixed(5)
        return `Lat: ${lat}, Lng: ${lon}`
      }

      return '[Unknown Location]'
    })
    .filter(Boolean)
    .join(', OR ')
}

function getAudioMimeType(path) {
  const ext = path.split('.').pop().toLowerCase()
  const map = {
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    m4a: 'audio/mp4',
    aac: 'audio/aac',
    flac: 'audio/flac',
    webm: 'audio/webm'
  }
  return map[ext] || 'audio/*'
}

function getAudioExportName(stop, index){
  return `${ index+1 }_${  stop.name.replace(' ', '') }`
}

async function launchExport(){
  try{
    await ExportService.exportTourAudioZip(fileName.value, props.tour)
  } catch(e){
    message.error(e)
  }
}
</script>
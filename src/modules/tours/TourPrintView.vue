<template>
<div>
  <div class="text-center">
    <div class="text-h4">{{  tour.title }}</div>
    <div class="text-subtitle1">{{  tour.brief  }}</div>
  </div>
  <q-separator class="q-my-sm" />
  <div v-html="tour.description"></div>
  <q-separator class="q-my-sm" />
  <div class="text-h5">Overview</div>
  <ol>
    <li v-for="stop in tour.stops" :key="stop._id">
      <span class="text-weight-bold">{{ stop.name }}</span> ({{  formatLocationName(stop.locations)  }})
    </li>
  </ol>
  <q-separator class="q-mt-sm q-mb-lg" />
  <div v-for="(stop, index) in tour.stops" :key="stop._id">
    <div v-if="showImages && stop.images[0]?.path" class="text-center">
      <img
        :src="'image_files/'+stop.images[0]?.path"
        style="max-width: 300px; height: 150px;"
        />
      <p class="text-caption">{{ stop.images[0]?.caption }}</p>
    </div>
    <div class="q-mb-md">
      <div class="text-h6">{{ index+1 }}. {{ stop.name }}</div>
      <div class="text-subtitle2">{{ formatLocationName(stop.locations) }}</div>
    </div>
    <div v-for="script in stop.transcripts" :key="script._id">
      <div v-if="showAudio">
        <div v-for="(audio, index) in script.audio" :key="index" class="q-mb-md">
          <audio controls>
            <source :src="`/audio_files/${audio.path}`" :type="getAudioMimeType(audio.path)" />
            Audio file type not supported.
          </audio>
        </div>
      </div>
      <div v-html="script.text"></div>
    </div>

    <div v-if="showImages">
      <div v-for="image in stop.images.slice(1)" :key="image.image_id"
        class="row q-mb-sm">
        <img
          :src="'image_files/' + image.path"
          style="max-width: 300px; height: 150px;"
        />
        <div class="col q-pa-md">
          <p class="text-subtitle2">{{ image.name }}</p>
          <p class="text-caption">{{ image.caption }}</p>
        </div>
      </div>
    </div>

    <div class="text-h6 text-center q-py-lg" v-if="index < tour.stops.length-1">~*~</div>
  </div>
</div>
</template>

<script setup>

const props = defineProps({
  tour: Object,
  showImages: Boolean,
  showAudio: Boolean
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
</script>
<template>
  <q-page>
    <div class="row justify-between q-ma-md">
      <FilterInput v-model="filter" />
      <AudioAddInput :postupload="init" />
    </div>
  
    <q-separator />
  
    <section>
      <EmptyContentBlock v-if="!gallery.length" label="No Audio" icon="mic" />

      <div class="column">
        <AudioGalleryCard 
          v-for="audio in displayGallery"
          :key="audio._id"
          v-bind="audio"
          @onupdate="v => updateGalleryItem(audio, v)"
          @onremove="removeAudio"
          />
      </div>
    </section>
  </q-page>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import { NotifyService } from 'src/services';
import { Database } from 'src/db/db';
import EmptyContentBlock from 'src/components/space_holders/EmptyContentBlock.vue';
import AudioAddInput from 'src/modules/audio/gallery/AudioAddInput.vue';
import FilterInput from 'src/components/forms/FilterInput.vue';
import AudioGalleryCard from 'src/modules/audio/gallery/AudioGalleryCard.vue';

const Audio = new Database('audio_files')
const message = new NotifyService('Audio')

const filter = ref('')
const gallery = ref([])

const displayGallery = computed(() => {
  const keyword = filter.value?.toLowerCase().trim()
  if (!keyword) return gallery.value

  return gallery.value.filter(item => {
    const nameMatch = item.name?.toLowerCase().includes(keyword)
    const tagsMatch = Array.isArray(item.tags)
      ? item.tags.some(tag => tag.toLowerCase().includes(keyword))
      : false

    return nameMatch || tagsMatch
  })
})


async function init(){
  try{
    const data = await Audio.getAll()
    gallery.value = data
  } catch(e) {
    message.error(e)
  }
}

onMounted(async () => {
  init()
})

function updateGalleryItem(item, nu){
  item.name = nu.name
  item.tags = nu.tags
}

function removeAudio(_id){
  gallery.value = gallery.value.filter(item => item._id !== _id)
}
</script>
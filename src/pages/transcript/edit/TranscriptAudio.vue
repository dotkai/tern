<template>
<section>
  <div class="row justify-between">
      <FilterInput 
          v-model:filter="filter" />
      <FindSelectAudioButton 
        v-model:audio="store.audio" />
  </div>

  <q-separator class="q-my-md" />
  
  <EmptyContentBlock v-if="!store.audio.length" label="No Audio" icon="mic" />
  <SortList 
    showbase
    click-edit
    :displayList="displayList"
    v-model="store.audio"
    @onedit="openEdit">

    <template #header="{item}">
      <div class="q-px-md q-pb-sm">
          <div class=" text-subtitle2">{{ item.name }}</div>
          <div v-if="item.caption">{{ item.caption }}</div>
      </div>
    </template>
    <template #base="{item}">
        <AudioPlayer
        :audioPath="item.path"
        /> 
    </template>
  </SortList>

  <MaxMinDialog
  v-model="editDialog">
  <SelectedAudioEditDialogContent
    v-bind="editTarget"
    @set="updateAudio"
    @remove="removeAudio" />
</MaxMinDialog>
</section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useScriptStore } from 'src/modules/transcripts/ScriptStore';
import { Database } from 'src/db/db';
import MaxMinDialog from 'src/components/dialogs/MaxMinDialog.vue';
import EmptyContentBlock from 'src/components/space_holders/EmptyContentBlock.vue';
import SortList from 'src/components/lists/SortList.vue';
import FindSelectAudioButton from 'src/modules/audio/FindSelectAudioButton.vue';
import FilterInput from 'src/components/forms/FilterInput.vue';
import AudioPlayer from 'src/modules/audio/AudioPlayer.vue';
import SelectedAudioEditDialogContent from 'src/modules/audio/SelectedAudioEditDialogContent.vue';

const store = useScriptStore()
const AudioData = new Database('audio_files')



const filter = ref('')
const editDialog = ref(false)
const editTarget = ref({})

const displayList = computed(() => {
  return store.audio.filter(v => {
    return (v.name || '').includes(filter.value) 
      || (v.caption || '').includes(filter.value)
  })
})

function openEdit(item){
  editDialog.value = true
  editTarget.value = item
}
function updateAudio(nu){
  const target = store.audio[editTarget.value.index]
  // Modify object directlu
  target.name = nu.name;
  target.caption = nu.caption;
}
function removeAudio(id){
  emit('update:images', store.audio.toSpliced(index, 1))
}
</script>
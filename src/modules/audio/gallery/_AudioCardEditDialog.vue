<template>
<MaxMinDialogWrapper
    :modelValue="modelValue"
    @update:model-value="v => $emit('update:model-value', v)">

      <q-card-section>
        <span class="text-subtitle2">Audio Name</span>
        <q-input dense filled clearable v-model="updateName" />
        <span class="text-subtitle2">Tags</span>
        <ChipAutoAddInput 
          v-model:chips="updateTags"
          v-model:options="filterOptions" />
      </q-card-section>

      <q-separator inset />

      <q-card-actions>
          <RemoveButton v-close-popup @click="removeAudio(_id)" />
          <q-space />
          <SaveButton v-close-popup @click="saveAudio(_id)" />
      </q-card-actions>
</MaxMinDialogWrapper>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import _ from 'lodash'
import { Database } from 'src/db/db';
import { NotifyService } from 'src/services';
import SaveButton from 'src/components/buttons/SaveButton.vue';
import RemoveButton from 'src/components/buttons/RemoveButton.vue';
import MaxMinDialogWrapper from 'src/components/dialogs/MaxMinDialog.vue';
import ChipAutoAddInput from 'src/components/forms/ChipAutoAddInput.vue';

const props = defineProps({
    modelValue: Boolean,
    _id: String,
    path: String,
    name: String,
    tags: Array
})
const emit = defineEmits(['update:model-value', 'onupdate', 'onremove'])

const fs = window.electronFs
const filterOptions = ref([])
const message = new NotifyService('Audio')
const AudioDatabase = new Database('audio_files')

const updateName = ref(props.name)
const updateTags = ref(props.tags || [])

// Get the tags
onMounted(async () => {
  filterOptions.value = await AudioDatabase.getGroup('tags')
})

/*********
 * Buttons
 ***/
async function saveAudio(_id){
  try {
    const data = {
      name: updateName.value,
      tags: JSON.parse(JSON.stringify(updateTags.value))
    }
    await AudioDatabase.update(_id, data)
    emit('onupdate', data)
  } catch(e){
    message.error(e)
  }
}

async function removeAudio(_id){
  try {
    await AudioDatabase.remove(_id)
    await fs.removeFile(props.path, 'audio_files')
    emit('onremove', _id)
    message.update('Removed')
  } catch(e){
    message.error(e)
  }
}
</script>

<style lang="scss">
.audio-dialog .card-wrapper {
  width:70%;
  max-width: 70%;
}
.audio-dialog .display-audio {
    width: 100%;
    max-width: 500px;
}
</style>
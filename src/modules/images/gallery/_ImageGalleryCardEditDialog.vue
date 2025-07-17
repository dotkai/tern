<template>
<MaxMinDialogWrapper
    :modelValue="modelValue"
    @update:model-value="v => $emit('update:model-value', v)">

      <q-card-section class="row">
          <div class="col q-pa-md">
              <q-img 
                spinner-color="blue" 
                error-src="util_images/noimage.png"
                class="display-image" :src="'/image_files/'+path"/>
          </div>
          <q-separator vertical inset />
          <div class="col q-pa-md">
              <span class="text-subtitle2">Image Name</span>
              <q-input dense filled clearable v-model="updateName" />
              <span class="text-subtitle2">Tags</span>
              <ChipAutoAddInput 
                v-model:chips="updateTags"
                v-model:options="filterOptions" />
          </div>
      </q-card-section>

      <q-card-actions>
          <RemoveButton v-close-popup @click="removeImage(_id)" />
          <q-space />
          <SaveButton v-close-popup @click="saveImage(_id)" />
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
const message = new NotifyService('Image')
const ImageDatabase = new Database('image_files')

const updateName = ref(props.name)
const updateTags = ref(props.tags || [])

// Get the tags
onMounted(async () => {
  filterOptions.value = await ImageDatabase.getGroup('tags')
})

/*********
 * Buttons
 ***/
async function saveImage(_id){
  try {
    const data = {
      name: updateName.value,
      tags: JSON.parse(JSON.stringify(updateTags.value))
    }
    await ImageDatabase.update(_id, data)
    emit('onupdate', data)
  } catch(e){
    message.error(e)
  }
}

async function removeImage(_id){
  try {
    await ImageDatabase.remove(_id)
    await fs.removeFile(props.path, 'image_files')
    emit('onremove', _id)
    message.update('Removed')
  } catch(e){
    message.error(e)
  }
}
</script>

<style lang="scss">
.image-dialog .card-wrapper {
  width:70%;
  max-width: 70%;
}
.image-dialog .display-image {
    width: 100%;
    max-width: 500px;
}
</style>
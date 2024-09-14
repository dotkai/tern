<template>
<q-dialog 
    :modelValue="modelValue" 
    @update:model-value="$emit('update:model-value')" 
    class="image-dialog"
    :maximized="maximizedToggle"
    backdrop-filter="blur(4px)">
    <q-card :class="{ 'card-wrapper': !maximizedToggle }">
        <q-bar>
          <q-space />

          <q-btn v-if="maximizedToggle" dense flat icon="minimize" @click="maximizedToggle = false">
            <q-tooltip class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn v-if="!maximizedToggle" dense flat icon="crop_square" @click="maximizedToggle = true">
            <q-tooltip  class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

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
                <q-input filled clearable v-model="updateName" />
                <span class="text-subtitle2">Tags</span>
                <q-select
                    filled
                    v-model="updateTags"
                    use-input
                    use-chips
                    multiple
                    input-debounce="0"
                    @new-value="createValue"
                    :options="filterOptions"
                    @filter="filterFn"
                    />
            </div>
        </q-card-section>

        <q-card-actions>
            <RemoveButton v-close-popup @click="removeImage(_id)" />
            <q-space />
            <SaveButton v-close-popup @click="saveImage(_id)" />
        </q-card-actions>
    </q-card>
</q-dialog>
</template>

<script setup>
import {ref} from 'vue'
import _ from 'lodash'
import { Database } from 'src/db/db';
import { NotifyService } from 'src/services';
import SaveButton from 'src/components/buttons/SaveButton.vue';
import RemoveButton from 'src/components/buttons/RemoveButton.vue';

const props = defineProps({
    modelValue: Boolean,
    _id: String,
    path: String,
    name: String,
    tags: Array
})
const emit = defineEmits(['update:model-value', 'onupdate', 'onremove'])

let tagList = ['Test']

const fs = window.electronFs
const maximizedToggle = ref(false)
const filterOptions = ref(tagList)
const message = new NotifyService('Image')
const ImageDatabase = new Database('image_files')

const updateName = ref(props.name)
const updateTags = ref(props.tags || [])

// Not the best way to do this...
ImageDatabase.getAll()
.then(data => {
  tagList = data.reduce((arr, item) => {
    return _.union(arr, (item.tags || []))
  }, [])
  filterOptions.value = tagList
})

/*********
 * Tag Filter Stuff
 */
function createValue (val, done) {
    // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
    // and it resets the input textbox to empty string
    // ----
    // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
    // only if is not already set
    // and it resets the input textbox to empty string
    // ----
    // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
    // (adds to model if not already in the model, removes from model if already has it)
    // and it resets the input textbox to empty string
    // ----
    // If "var" content is undefined/null, then it doesn't tampers with the model
    // and only resets the input textbox to empty string

    if (val.length > 0) {
      if (!tagList.includes(val)) {
        tagList.push(val)
      }
      done(val, 'toggle')
    }
}

function filterFn (val, update) {
    update(() => {
      if (val === '') {
        filterOptions.value = tagList
      } else {
        const needle = val.toLowerCase()
        filterOptions.value = tagList.filter(
            v => v.toLowerCase().indexOf(needle) > -1
        )
      }
    })
}

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
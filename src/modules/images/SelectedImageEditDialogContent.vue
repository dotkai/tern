<template>
<div>
  <q-card-section class="row">
      <div class="col q-pa-md">
        <ImageWrapper
          class="display-image" 
          :filename="path"/>
      </div>
      <q-separator vertical inset />
      <div class="col q-pa-md">
          <span class="text-subtitle2">Image Name</span>
          <q-input filled clearable v-model="updateName" />
          <span class="text-subtitle2">Caption</span>
          <q-input
              v-model="updateCaption"
              filled
              type="textarea" />
      </div>
  </q-card-section>

  <q-card-actions>
      <RemoveButton v-close-popup @click="$emit('remove')" />
      <q-space />
      <CancelButton v-close-popup />
      <SaveButton v-close-popup @click="updateImage" />
  </q-card-actions>
</div>
</template>

<script setup>
import { ref } from 'vue'
import SaveButton from 'src/components/buttons/SaveButton.vue'
import CancelButton from 'src/components/buttons/CancelButton.vue'
import RemoveButton from 'src/components/buttons/RemoveButton.vue'
import ImageWrapper from 'src/components/wrappers/ImageWrapper.vue'

const props = defineProps({
  path: String,
  name: String,
  caption: String,

  images: Array
})

const emit = defineEmits(['setimage', 'remove'])

const updateName = ref(props.name || '')
const updateCaption = ref(props.caption || '')

function updateImage() {
  emit('setimage', {
    name: updateName.value,
    caption: updateCaption.value
  })
}
</script>
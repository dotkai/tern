<template>
<div>
  <q-card-section class="row">
    <div class="col q-pa-md">
        <span class="text-subtitle2">Audio Name</span>
        <FInput clearable v-model="updateName" />
        <span class="text-subtitle2">Caption</span>
        <q-input
          dense
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
import FInput from 'src/components/forms/FInput.vue';
import SaveButton from 'src/components/buttons/SaveButton.vue'
import CancelButton from 'src/components/buttons/CancelButton.vue'
import RemoveButton from 'src/components/buttons/RemoveButton.vue'

const props = defineProps({
  path: String,
  name: String,
  caption: String,

  images: Array
})

const emit = defineEmits(['set', 'remove'])

const updateName = ref(props.name || '')
const updateCaption = ref(props.caption || '')

function updateImage() {
  emit('set', {
    name: updateName.value,
    caption: updateCaption.value
  })
}
</script>
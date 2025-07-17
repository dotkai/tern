<template>
<section>
  <LabelWrapper name="Active Tour">
    <div>
      <q-btn  
          unelevated
          :flat="!store.active"
          :color="store.active? 'green' : 'grey'" 
          label="Active"
          @click="store.active = !store.active" />
      <q-btn 
          unelevated
          :flat="store.active"
          :color="store.active? 'grey' : 'orange'" 
          label="Inactive"
          @click="store.active = !store.active" />
    </div>
  </LabelWrapper>
  <LabelWrapper name="Cover Image">
      <CoverImageSelect v-model:path="store.cover_image_path" />
  </LabelWrapper>
  <LabelWrapper name="Title">
      <FInput class="col" v-model="store.title" />
  </LabelWrapper>
  <LabelWrapper name="Brief">
    <FInput class="col" v-model="store.brief" />
  </LabelWrapper>
  <LabelWrapper name="Tags">
    <ChipAutoAddInput 
      class="col"
      v-model:chips="store.tags"
      v-model:options="tagList"
    />
  </LabelWrapper>
  <LabelWrapper name="Description" style="height: 350px;">
    <div class="col">
      <TextEditor v-model:content="store.description" />
    </div>
  </LabelWrapper>
</section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Database } from 'src/db/db';
import { useTourStore } from 'src/modules/tours/TourStore';

import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue'
import CoverImageSelect from 'src/modules/images/cover/CoverImageSelect.vue';
import TextEditor from 'src/components/forms/TextEditor.vue';
import FInput from 'src/components/forms/FInput.vue';
import ChipAutoAddInput from 'src/components/forms/ChipAutoAddInput.vue';

const store = useTourStore()
const TourDatabase = new Database('tours')
const tagList = ref([])

onMounted(async () => {
  tagList.value = await TourDatabase.getGroup('tags')
})

</script>
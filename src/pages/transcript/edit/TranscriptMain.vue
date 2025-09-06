<template>
<section style="margin-top:-24px;">
  <q-expansion-item
      icon="description"
      header-class="text-primary"
      :label="expandHeader"
      default-opened
    >
      <q-card>
        <q-card-section>
          <LabelWrapper name="Name">
            <FInput class="col" v-model="store.name" />
          </LabelWrapper>
          <LabelWrapper name="Year">
            <FInput class="col" v-model="store.year" />
          </LabelWrapper>
          <LabelWrapper name="Status">
            <StatusPicker v-model="store.status" />
          </LabelWrapper>
          <LabelWrapper name="Tags">
            <ChipAutoAddInput 
              class="col"
              v-model:chips="store.tags"
              v-model:options="tagOptions" />
          </LabelWrapper>

        </q-card-section>
      </q-card>
  </q-expansion-item>

  <div class="row justify-between align-center">
    <div>Text</div>
    <q-btn flat icon="fit_screen" color="grey" @click="dialog = true"></q-btn>
  </div>
  <TextEditor v-model:content="store.text" />
  <q-separator />
  <div class="row q-pt-md justify-end">Word Count: {{store.wordCount}}</div>

  
  <MaxMinDialog v-model="dialog">    
    <TextEditor v-model:content="store.text" />
  </MaxMinDialog>

</section>
</template>
    
<script setup>
  import {computed, ref, onMounted} from 'vue';
import { Database } from 'src/db/db';
  import { useScriptStore } from 'src/modules/transcripts/ScriptStore';
  import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue';
  import StatusPicker from 'src/modules/transcripts/StatusPicker.vue';
import ChipAutoAddInput from 'src/components/forms/ChipAutoAddInput.vue';
  import TextEditor from 'src/components/forms/TextEditor.vue';
  import FInput from 'src/components/forms/FInput.vue';
import MaxMinDialog from 'src/components/dialogs/MaxMinDialog.vue';
    
  const store = useScriptStore()
  const ScriptDatabase = new Database('transcripts')

  const tagOptions = ref([])
  const dialog = ref(false)
    
  const expandHeader = computed(_ => {
    return store.name || '(No Name)'
  })

  // Get the tags
onMounted(async () => {
  tagOptions.value = await ScriptDatabase.getGroup('tags')
})
      
</script>
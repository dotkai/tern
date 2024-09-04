<template>
  <section style="margin-top:-24px;">
    <q-expansion-item
        icon="description"
        :label="expandHeader"
        default-opened
      >
        <q-card>
          <q-card-section>
            <LabelWrapper name="Name">
              <q-input class="col" filled v-model="store.name" />
            </LabelWrapper>
            <LabelWrapper name="Year">
              <q-input class="col" filled v-model="store.year" />
            </LabelWrapper>
            <LabelWrapper class="col" name="Status">
              <StatusPicker v-model="store.status" />
            </LabelWrapper> 
          </q-card-section>
        </q-card>
    </q-expansion-item>

    <TextEditor v-model:content="store.text" />
    <q-separator />
    <div class="row q-pt-md justify-end">Word Count: {{store.wordCount}}</div>


      <!-- <div class="q-pa-lg">
    
    <LabelWrapper name="Location">
      <PickerBlock 
        v-model:modelValue="form.location"
        :stopOptionList="locationOptions"
        :addRoute="{ name: 'edit_location', params: { location_id: 'NEW' } }" />
    </LabelWrapper>

    <LabelWrapper name="Sources" class=" q-my-md">
      <q-card class="col">
        <q-card-section>
          <QuillEditor theme="bubble" style="min-height: 300px;"
          v-model:content="form.sources" contentType="html" />
        </q-card-section>
      </q-card>
    </LabelWrapper>
    <LabelWrapper name="Audio Files">
      <SelectMediaWrapper 
        class="col"
        v-model="form.audio_files"
        uploadTarget="/management/audio" />
    </LabelWrapper>
    </div> -->
    </section>
    </template>
    
<script setup>
  import {ref, computed} from 'vue';
  import { useScriptStore } from 'src/modules/transcripts/ScriptStore';
  import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue';
  import StatusPicker from 'src/modules/transcripts/StatusPicker.vue';
  import TextEditor from 'src/components/forms/TextEditor.vue';
    
  const store = useScriptStore()
    
  const expandHeader = computed(_ => {
    return (store.name? store.name : '') 
      + (store.status? `(${store.status})` : '')
  })
      
</script>
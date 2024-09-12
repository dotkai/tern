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
            <q-input class="col" filled v-model="store.name" />
          </LabelWrapper>
          <div class="row">
            <LabelWrapper name="Year" class="col q-mr-md">
              <q-input class="col" filled v-model="store.year" />
            </LabelWrapper>
            <LabelWrapper class="col" name="Status">
              <StatusPicker v-model="store.status" />
            </LabelWrapper>
          </div>

          <LabelWrapper name="Location">
            <LocationSelect v-model="store.location" />
          </LabelWrapper>

        </q-card-section>
      </q-card>
  </q-expansion-item>

  <TextEditor v-model:content="store.text" />
  <q-separator />
  <div class="row q-pt-md justify-end">Word Count: {{store.wordCount}}</div>

</section>
</template>
    
<script setup>
  import {computed} from 'vue';
  import { useScriptStore } from 'src/modules/transcripts/ScriptStore';
  import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue';
  import StatusPicker from 'src/modules/transcripts/StatusPicker.vue';
  import TextEditor from 'src/components/forms/TextEditor.vue';
  import LocationSelect from 'src/modules/location/LocationSelect.vue';
    
  const store = useScriptStore()
    
  const expandHeader = computed(_ => {
    return store.name || '(No Name)'
  })
      
</script>
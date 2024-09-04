<template>
<div>
    <q-toolbar class="justify-between">
        <div style="display: flex;align-items: center;">
            <q-btn label="Back" icon="chevron_left" flat :to="returnto" />
            <span style="margin: 0 10px;">|</span>
            <span class="text-h6">{{pageName}}</span>
        </div>
        <div class="row">
            <RemoveButton class="q-mx-md" @click="confirm = true" />
            <q-btn 
                unelevated label="Save" 
                icon="save" color="blue" @click="$emit('submit')" />

        </div>
    </q-toolbar>
    <q-separator />

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-md text-h6">Are you sure you want to delete this?</span>
        </q-card-section>
        <q-card-section>

        </q-card-section>

        <q-card-actions align="between">
          <q-btn flat label="No, Cancel" v-close-popup />
          <q-btn flat label="Yes, Delete" color="red" v-close-popup
            @click="$emit('remove')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

</div>
</template>

<script setup>
import { ref } from 'vue';
import RemoveButton from '../buttons/RemoveButton.vue';
const props = defineProps({
    pageName: String,
    returnto: Object,
    inu: Boolean
})
const emits = defineEmits(['submit', 'remove'])

const confirm = ref(null)
</script>
<template>
<div>
    <q-toolbar class="justify-between">
        <div style="display: flex;align-items: center;">
            <q-btn label="Back" icon="chevron_left" flat 
              @click="NavigationStore.popReturn($router, returnto)" />
            <span style="margin: 0 10px;">|</span>
            <span class="text-h6">{{pageName}}</span>
        </div>
        <div class="row">
            <RemoveCollapseButton class="q-mx-md" @click="confirm = true" />
            <q-btn 
                unelevated 
                label="Save" 
                icon="save" 
                color="blue" 
                @click="$emit('submit')" />
            <!-- <q-btn
              disabled
              unelevated
              icon="pending"
              label="Saving..." /> -->
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
import { computed, ref, onMounted, onUnmounted  } from 'vue';
import RemoveCollapseButton from '../buttons/RemoveCollapseButton.vue';
import { useNavigationStore } from 'src/modules/navigation/NavigationStore';

const props = defineProps({
    pageName: String,
    returnto: Object
})
const emits = defineEmits(['submit', 'remove'])
const NavigationStore = useNavigationStore()

const confirm = ref(null)

onMounted(() => {
  document.addEventListener("keydown", doSave);
})

onUnmounted(() => {
  document.removeEventListener("keydown", doSave);
})

function doSave(e) {
  if (!(e.keyCode === 83 && (e.ctrlKey || e.metaKey))) {
    return;
  }

  e.preventDefault();
  emits('submit')
}
</script>
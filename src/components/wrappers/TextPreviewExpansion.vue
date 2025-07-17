<template>
  <q-expansion-item
    expand-separator
    v-model="expanded"
    dense
  >
    <!-- Preview (when collapsed) -->
    <template #header>
      <div class="col flex align-center">
        <div v-if="!expanded" class="text-body2" style="align-content:center" v-html="previewHtml" />
      </div>
    </template>

    <!-- Full content (when expanded) -->
    <div v-if="expanded" class="q-ma-md q-pt-sm text-body1" v-html="text" />
  </q-expansion-item>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  previewLength: {
    type: Number,
    default: 100
  }
})

const expanded = ref(false)

function stripHtml(html) {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

const previewHtml = computed(() => {
  if (!props.text) return '(Empty)'
  const plain = stripHtml(props.text)
  return plain.length > props.previewLength
    ? plain.slice(0, props.previewLength) + '...'
    : plain
})
</script>

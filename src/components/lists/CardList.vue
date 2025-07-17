<template>
<div>
  <div v-for="(item, index) in displayList" :key="item._id"
    class="row">
    <div v-if="shownum" class="q-pa-md text-subtitle2">{{index+1}}</div>
    <q-card class="col">
      <q-card-section class="q-pb-none q-pt-sm q-px-sm">
        <slot name="header" v-bind="item" :index="index"></slot>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-sm q-px-sm" v-if="showbase">
        <slot name="base" v-bind="item"></slot>
      </q-card-section>
    </q-card>
  </div>
</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  filterText: String,
  filterKeys: Array,
  list: Array,
  shownum: Boolean,
  showbase: Boolean
})

const displayList = computed(_ => {
  return props.list
})

</script>
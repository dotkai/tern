<template>
<div class="col">
  <div class="row">
    <SelectItem 
      v-model:selected="pendingStop" 
      :options="stopOptionList"
      />
    <q-btn color="primary" class="col-1" icon="arrow_downward" @click="addStop(pendingStop)" />
    <q-btn class="col-1" icon="add" 
      @click="$router.push(addRoute)" />
  </div>
  <SortList 
    :modelValue="modelValue"
    @update:modelValue="v => $emit('update:modelValue', v)"
    :displayList="displayStopList"
    />
</div>
</template>

<script setup>
  import SortList from './SortList.vue'
  import SelectItem from './SelectItem.vue'
  import { ref, computed } from 'vue';

  const props = defineProps({
  	modelValue: Array,
  	stopOptionList: Array,
  	addRoute: Object
  })
	const emits = defineEmits(['update:modelValue'])

	const pendingStop = ref(null)

  const displayStopList = computed(() => {
      if(!props.modelValue) return true
      return props.modelValue.map(key => {
        return props.stopOptionList.find(v => key === v._id)
      })
    })

  function addStop(v){
  	if(!v) return;
  	emits('update:modelValue', [...props.modelValue || [], v._id])
    pendingStop.value = null
  }

  
</script>
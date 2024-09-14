<template>
<div class="col">
  <div class="row">
    <SelectItem 
      v-model:selected="pendingStop" 
      :options="stopOptionList"
      />
    <q-btn color="primary" class="col-1" icon="arrow_downward" @click="addStop(pendingStop)" />
    <q-btn class="col-1" icon="add" 
      @click="navstore.stashReturn($router, $route, addRoute)" />
  </div>
  <SortList 
    :modelValue="modelValue"
    @update:modelValue="v => $emit('update:modelValue', v)"
    :displayList="displayStopList"
    />
</div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import SortList from './SortList.vue'
  import SelectItem from './SelectItem.vue'
import { useNavigationStore } from 'src/modules/navigation/NavigationStore';

  const props = defineProps({
  	modelValue: Array,
  	stopOptionList: Array,
  	addRoute: Object
  })
	const emits = defineEmits(['update:modelValue'])
  const navstore = useNavigationStore()

	const pendingStop = ref(null)

  const displayStopList = computed(() => {
      if(!props.modelValue || !props.stopOptionList) return []
      return props.modelValue.map(key => {
        return props.stopOptionList.find(v => key === v._id)
      }).filter(v => v)
    })

  function addStop(pendingStopId){
  	if(!pendingStopId) return;
  	emits('update:modelValue', [...props.modelValue || [], pendingStopId])
    pendingStop.value = null
  }

  
</script>
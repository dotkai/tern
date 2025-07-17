<template>
<div class="row q-mb-sm">
  <SelectItem 
    :label="label"
    :icon="icon"
    v-model:selected="pendingStop" 
    :options="stopOptionList"
    />
  <q-btn color="primary" class="col-1" icon="arrow_downward" @click="addStop(pendingStop)" />
  <q-btn class="col-1" icon="add" 
    @click="navstore.stashReturn($router, $route, addRoute)" />
</div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import SelectItem from './SelectItem.vue'
import { useNavigationStore } from 'src/modules/navigation/NavigationStore';

  const props = defineProps({
    label: String,
    icon: String,
  	modelValue: Array,
  	stopOptionList: Array,
  	addRoute: Object
  })
	const emits = defineEmits(['update:modelValue'])
  const navstore = useNavigationStore()

	const pendingStop = ref(null)

  function addStop(pendingStopId){
  	if(!pendingStopId) return;
  	emits('update:modelValue', [...props.modelValue || [], pendingStopId])
    pendingStop.value = null
  }

  
</script>
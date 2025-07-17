<template>
<q-select class="col" 
  clearable
  filled 
  dense
  :multiple="multiple"
  :use-chips="multiple"
  :label="label"
	:model-value="selected"
	@update:model-value="v => setValue(v)" 
  @clear="$emit('clear')"
  :options="displayOptionList"
  option-value="_id" 
  option-label="name"
  map-options
  emit-value
  use-input
  input-debounce="0"
  behavior="dialog"
  @filter="filterFn">
  <template v-if="icon" v-slot:prepend>
    <q-icon :name="icon" />
  </template>
  <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
</q-select>
</template>

 <script setup>
  import { ref, computed } from 'vue';

  const props = defineProps({
    label: String,
    icon: String,
  	selected: [String, Array],
  	options: Array,
    multiple: Boolean
  })
	const emits = defineEmits(['update:selected', 'clear', 'onset'])


  const displayOptionList = ref(props.options) 

  function setValue(v){
    emits('update:selected', v)
    emits('onset', v)
  }

  function filterFn (val, update) {
    if (val === '') {
      update(() => {
        displayOptionList.value = _merge()
      })
      return
    }

    update(() => {
      displayOptionList.value = _merge(val)
    })   
  }

  function _merge(val){

    return props.options.filter(item => {
      if((props.selected || '').includes(item._id)) return false
      return val? item.name.includes(val) : true
    })
  }

</script>
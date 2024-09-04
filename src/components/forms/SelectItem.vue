<template>
<q-select class="col" 
  clearable
  filled 
  :multiple="multiple"
  :use-chips="multiple"
  :label="label"
	:model-value="selected"
	@update:model-value="v => $emit('update:selected', v)" 
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
  	selected: [String, Array],
  	options: Array,
    multiple: Boolean
  })
	const emits = defineEmits(['update:selected', 'clear'])


  const displayOptionList = ref(props.options) 

  function filterFn (val, update) {
    try {
         if (val === '') {
        update(() => {
          displayOptionList.value = _merge()
        })
        return
      }

      update(() => {
        displayOptionList.value = _merge(val)
      })
    } catch(e){
      console.log(e)
    }
   
  }

  function _merge(val){

    return props.options.filter(item => {
      if((props.selected || '').includes(item._id)) return false
      return val? item.name.includes(val) : true
    })
  }

</script>
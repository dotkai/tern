<template>
<q-select
    filled
    dense
    :model-value="chips"
    @update:model-value="v => $emit('update:chips', v)"
    use-input
    use-chips
    multiple
    input-debounce="0"
    @new-value="createValue"
    :options="filterOptions"
    @filter="filterFn"
    />
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  chips: Array,
  options: Array
})
const emit = defineEmits(['update:chips', 'update:options'])

const filterOptions = ref(props.options)

function createValue (val, done) {
    // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
    // and it resets the input textbox to empty string
    // ----
    // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
    // only if is not already set
    // and it resets the input textbox to empty string
    // ----
    // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
    // (adds to model if not already in the model, removes from model if already has it)
    // and it resets the input textbox to empty string
    // ----
    // If "var" content is undefined/null, then it doesn't tampers with the model
    // and only resets the input textbox to empty string

    if (val.length > 0) {
      if (!props.options.includes(val)) {
        emit('update:options', [...props.options, val])
      }
      done(val, 'toggle')
    }
}

function filterFn (val, update) {
    update(() => {
      if (val === '') {
        filterOptions.value = props.options
      } else {
        const needle = val.toLowerCase()
        filterOptions.value = props.options.filter(
            v => v.toLowerCase().indexOf(needle) > -1
        )
      }
    })
}
</script>
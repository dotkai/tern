<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'App',
  beforeCreate () {
    // Notification hooks
    this.$root.$error = this.triggerError;
    this.$root.$success = this.triggerPositive;

  },
  
  setup(){
    const $q = useQuasar()

    return {
      triggerError(err){
        $q.notify({
          type: 'negative',
          message: err? err.message : 'Error',
          actions: [{
            icon: 'clear',
            color: 'white',
            round: true
          }]
        })
      },
      triggerPositive(msg) {
        $q.notify({
          type: 'positive',
          message: msg,
          actions: [{
            icon: 'clear',
            color: 'white',
            round: true
          }]
        })
      }
    }
  }
})
</script>

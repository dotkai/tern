<template>
<q-page class="column">
  <EditMenuBar pageName="Edit Script" :returnto="{ name: 'scripts' }" />
  
  <div class="row col">
    <div class="col-2 bg-grey-2">
      <LinkList :list="linksList"/>
    </div>
    <div class="q-pa-lg col">
      <router-view />
    </div>
  </div>
</q-page>
</template>

<script setup>
  import { useScriptStore } from 'src/modules/transcripts/ScriptStore';
  import { RouteService } from 'src/services';
  import EditMenuBar from 'src/components/bars/EditMenuBar.vue'
  import LinkList from 'src/components/wrappers/LinkList.vue';

  const store = useScriptStore()
  const route = new RouteService({
    param_id: 'script_id',
    back: 'scripts'
  })

  const linksList = [{
    title: 'Home',
    to: { name: 'edit_script' }
  }, {
    title: 'Notes',
    to: { name: 'edit_script_notes' }
  }, {
    title: 'Sources',
    to: { name: 'edit_script_sources' }
  }, {
    title: 'Images',
    to: { name: 'edit_script_images' }
  }, {
    title: 'Audio',
    to: { name: 'edit_script_audio' }
  }]

  store.init(route.getEditId())

//   import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue'
//   import PickerBlock from 'src/components/forms/PickerBlock.vue'
//   import SelectMediaWrapper from 'components/SelectMediaWrapper.vue'
//   import TextEditor from 'src/components/forms/TextEditor.vue'
//   
// export default {
//   components: {
//     LabelWrapper,
//     PickerBlock,
//     SelectMediaWrapper,
//     TextEditor,
//     EditMenuBar
//   },
//   data(){
//     return {
//       transcriptId: null,
//       locationOptions: [],
//       form: {
//         name: null,
//         complete: false,
//         location: [],
//         audio_files: [],
//         text: '',
//         sources: null
//       }
//     }
//   },
//   computed: {
//     wordCount(){
//       return this.form.text.split(' ').length
//     }
//   },
//   methods: {
//     submit(){
//       if(this.transcriptId === 'NEW'){
//         this.$api.post(`/management/scripts`, this.form)
//         .then(v => this.$router.push({ name: 'scripts' }))
//         .catch(err => this.$root.$error(err))    
//         return;
//       }

//       this.$api.post(`/management/scripts/${this.transcriptId}`, this.form)
//       .then(v => this.$router.push({ name: 'scripts' }))
//       .catch(err => this.$root.$error(err))        
//     },
//     remove(){
//       this.$api.delete(`/management/scripts/${this.locationId}`, this.form)
//       .then(v => this.$router.push({ name: 'scripts' }))
//       .catch(err => this.$root.$error(err))  
//     }
//   },
//   mounted(){
//     this.transcriptId = this.$route.params.script_id


//     // Select options
//     this.$api.get(`/management/locations`)
//       .then(v => this.locationOptions = v.data)
//       .catch(err => this.$root.$error(err))

//     if(this.transcriptId === 'NEW') return;
//     this.$api.get(`/management/scripts/${this.transcriptId}`)
//       .then(v => this.form = v.data)
//       .catch(err => this.$root.$error(err))
//   }
// }
</script>

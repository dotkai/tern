<template>
<q-page class="q-pa-lg">
  <LabelWrapper name="_id">
    <q-input class="col" filled v-model="form._id" />
  </LabelWrapper>
  <LabelWrapper name="Name">
    <q-input class="col" filled v-model="form.name" />
  </LabelWrapper>
  <LabelWrapper name="Location">
    <q-select
        filled  class="col"
        v-model="form.locations"
        multiple
        emit-value
        map-options
        option-value="_id" 
        option-label="name" 
        :options="locationOptions"
      />
  </LabelWrapper>
  <LabelWrapper name="Audio Files">
    <SelectMediaWrapper 
      class="col"
      v-model="form.audio_files"
      uploadTarget="/management/audio" />
  </LabelWrapper>
  <LabelWrapper name="Images">
    <SelectMediaWrapper 
      image 
      class="col"
      v-model="form.image_files"
      uploadTarget="/management/images" />
  </LabelWrapper>
  <LabelWrapper name="Transcript" style="height: 350px;">
    <div class="col">
      <QuillEditor theme="snow" style="height: 300px;"
      v-model:content="form.transcript" contentType="html" />
    </div>
  </LabelWrapper>
  <LabelWrapper name="Sources" style="height: 180px;">
    <div class="col">
      <QuillEditor theme="snow" style="height: 130px;"
      v-model:content="form.sources" contentType="html" />
    </div>
  </LabelWrapper>

  <LabelWrapper name="Preview">
    {{form}}
  </LabelWrapper>

  <div class="row justify-between">
    <q-btn label="Remove" color="negative" @click="remove" />
    <div>
      <q-btn label="Cancel" @click="$router.go(-1)" class="q-mx-md" />
      <q-btn label="Submit" color="primary" @click="submit" />
    </div>
  </div>
</q-page>
</template>

<script>
  import SelectMediaWrapper from 'components/SelectMediaWrapper.vue'
  import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue'
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
export default {
  components: {
    SelectMediaWrapper,
    LabelWrapper,
    QuillEditor
  },
  data(){
    return {
      stopId: null,
      locationOptions: [],


      form: {
        _id: `${new Date().getTime()}TEST`,
        name: 'WABABA',
        locations: [],
        audio_files: [],
        image_files: [],
        transcript: null,
        sources: null
      },
    }
  },
  methods: {
    submit(){
      const path = this.stopId === 'NEW'? `/management/stops`
        : `/management/stops/${this.stopId}`

      this.$api.post(path, this.form)
      .then(v => this.$router.go(-1))
      .catch(err => this.$root.$error(err))        
    },
    remove(){
      this.$api.delete(`/management/stops/${this.stopId}`)
      .then(v => this.$router.go(-1) )
      .catch(err => this.$root.$error(err))      
    }
  },
  mounted(){
    this.stopId = this.$route.params.stop_id

    // Select options
    this.$api.get(`/management/locations`)
      .then(v => this.locationOptions = v.data)
      .catch(err => this.$root.$error(err))

    // Editing View
    if(this.stopId === 'NEW') return;
    this.$api.get(`/management/stops/${this.stopId}`)
      .then(v => this.form = v.data)
      .catch(err => this.$root.$error(err))
  }
}


function _unpackFiles(files){
  const formData = new FormData()

  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      formData.append('files[' + i + ']', files[i])
    }
  }

  return formData
}
</script>

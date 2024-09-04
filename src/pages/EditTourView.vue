<template>
<q-page>
  <EditMenuBar pageName="Edit Tour" :returnto="{ name: 'home' }" />

  <div class="q-pa-lg">
    <LabelWrapper name="Title">
      <q-input class="col" filled v-model="form.title" />
    </LabelWrapper>
    <LabelWrapper name="Active Tour">
      <q-toggle v-model="form.active" :true-value="1" :false-value="0" label="Active" />
    </LabelWrapper>
    <LabelWrapper name="Cover Image">
      <SelectMediaWrapper 
        image 
        one-only
        class="col"
        v-model="form.image_files"
        uploadTarget="/management/images" />
    </LabelWrapper>
    <LabelWrapper name="Brief">
      <q-input class="col" filled v-model="form.brief" />
    </LabelWrapper>
    <LabelWrapper name="Tags">
      <q-input class="col" filled v-model="form.tags" />
    </LabelWrapper>
    <LabelWrapper name="Description" style="height: 350px;">
      <div class="col">
        <TextEditor v-model:content="form.description" />
      </div>
    </LabelWrapper>
    <LabelWrapper name="Stops">
      <PickerBlock 
        v-model="form.stops"
        :stopOptionList="stopOptionList"
        :addRoute="{ name: 'edit_stop', params: { stop_id: 'NEW' } }" />
    </LabelWrapper>

    <LabelWrapper name="Preview">
      {{form}}
    </LabelWrapper>
  </div>
</q-page>
</template>

<script>
  import {db} from 'src/db/db.js'
  import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue'
  import PickerBlock from 'src/components/forms/PickerBlock.vue'
  import SelectMediaWrapper from 'components/SelectMediaWrapper.vue'
  import TextEditor from 'src/components/forms/TextEditor.vue'
  import EditMenuBar from 'src/components/bars/EditMenuBar.vue'
  
export default {
  components: {
    LabelWrapper,
    PickerBlock,
    SelectMediaWrapper,
    TextEditor,
    EditMenuBar
  },
  data(){
    return {
      locationId: null,
      form: {
        _id: null,
        title: '',
        active: 0,
        image_files: [], // Savedas string
        brief: '',
        description: '',
        stops: [],
        tags: []
      },

      pendingStop: null,
      stopOptionList: []
    }
  },
  computed: {
    displayOptionList(){
      return this.stopOptionList.filter(item => {
        return !this.form.stops.includes(item._id)
      })
    },
    displayStopList(){
      return this.form.stops.map(key => {
        return this.stopOptionList.find(v => key === v._id)
      })
    }
  },
  methods: {
    remove(){
      this.$api.delete(`/management/tours/${this.tourId}`)
      .then(v => this.$router.push({ name: 'home' }))
      .catch(err => this.$root.$error(err))          
    },
    submit(){
      const blob = {
        ...this.form,
        imgsrc: this.form.imgsrc[0]
      }

      if(this.tourId === 'NEW'){
        this.$api.post(`/management/tours`, blob)
        .then(v => this.$router.push({ name: 'home' }))
        .catch(err => this.$root.$error(err))    
        return;
      }

      this.$api.post(`/management/tours/${this.tourId}`, blob)
      .then(v => this.$router.push({ name: 'home' }))
      .catch(err => this.$root.$error(err))        
    }
  },
  mounted(){
    this.tourId = this.$route.params.tour_id

    // Select options
    this.$api.get(`/management/stops`)
      .then(v => this.stopOptionList = v.data)
      .catch(err => this.$root.$error(err))

    // Editing View
    if(this.tourId === 'NEW') return;
    this.$api.get(`/management/tours/${this.tourId}`)
      .then(v => this.form = {
        ...v.data,
        imgsrc: v.data.imgsrc? [v.data.imgsrc] : []
      })
      .catch(err => this.$root.$error(err))
  }
}
</script>

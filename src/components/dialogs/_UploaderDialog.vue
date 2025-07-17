<template>
<div class="q-pa-md q-gutter-sm">
  <q-btn label="Upload" color="primary" @click="dialog = true" />

  <q-dialog
    v-model="dialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-primary">
      <q-bar>
        <q-btn flat icon="close" color="white" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
        <q-space />
        <q-btn flat icon="close" label="Close" color="white" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <div class="row">
        <div class="col">
          <q-card-section>
            <SortList 
              :image="image"
              :modelValue="modelValue"
              :displayList="modelValue"
              @update:modelValue="v => $emit('update:modelValue', v)"
              />
          </q-card-section>
        </div>

        <div class="col">
          <q-card-section class="q-pt-none">
            <q-uploader
              :url="uploadUrl"
              label="Batch upload"
              multiple
              batch
              with-credentials
              class="full-width"
              @uploaded="fetchDirectoryContent"
            />
          </q-card-section>

          <q-card-section>
            <q-input filled bg-color="grey-1" v-model="filter">
              <template v-slot:prepend>
                <q-icon name="filter_alt" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-section>
            <q-card v-for="content in displayContent" :key="content" @click="add(content)">
              <q-card-section class="row">
                <q-img
                  v-if="image"
                  :src="getImageUrl(content)"
                  error-src="util_images/noimage.png"
                  spinner-color="white"
                  style="height: 140px; max-width: 150px"
                  class="q-mr-md"
                  />
                <div class="text-subtitle2">{{content}}</div>
              </q-card-section>
            </q-card>
          </q-card-section>
        </div>
      </div>      
    </q-card>
  </q-dialog>
</div>
</template>

<script>
  import SortList from './lists/SortList.vue'
export default {
  props: {
    modelValue: Array,
    uploadTarget: String,
    image: Boolean
  },
  components: {
    SortList
  },
  data(){
    return {
      dialog: false,

      filter: '',
      directoryContent: []
    }
  },
  computed: {
    uploadUrl(){
      return `${this.$api.defaults.baseURL}${this.uploadTarget}`
    },
    displayContent(){
      return this.directoryContent.filter(filename => {
        if(!this.modelValue) return true
        return !this.modelValue.includes(filename) && filename.includes(this.filter)
      })
    }
  },
  methods: {
    getImageUrl(filename){
        return `${this.$api.defaults.baseURL}/public/images/${filename}`
      },
    add(item){
      this.$emit('update:modelValue', [...this.modelValue || [], item])
    },

    fetchDirectoryContent(){
      this.$api.get(this.uploadUrl)
        .then(v => this.directoryContent = v.data)
        .catch(err => this.$root.$error(err))
    }
  },
  mounted(){
    this.fetchDirectoryContent()
  }
}
</script>
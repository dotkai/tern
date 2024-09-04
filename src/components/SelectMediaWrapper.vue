<template>
<div class="q-pa-md row items-start">
  <div v-if="image" class="col row">
    <q-img
      v-for="img in modelValue" :key="img"
      :src="getImageUrl(img)"
      spinner-color="white"
      style="height: 140px; max-width: 150px"
    />
  </div>
  <div v-else class="col">
    <q-card v-for="item in modelValue" :key="item">
      <q-card-section>
        <q-icon name="music_note" />
        <span>{{item}}</span>
      </q-card-section>
    </q-card>
  </div>
  <UploaderDialog
    :image="image"
    :uploadTarget="uploadTarget"
    :modelValue="modelValue"
    @update:modelValue="v => $emit('update:modelValue', v)" />
</div>
</template>

<script>
  import UploaderDialog from './_UploaderDialog.vue'
export default {
  props: {
    modelValue: Array,
    uploadTarget: String,
    image: Boolean
  },
  components: {
    UploaderDialog
  },
  methods: {
    getImageUrl(filename){
      return `${this.$api.defaults.baseURL}/public/images/${filename}`
    }
  }
}
</script>
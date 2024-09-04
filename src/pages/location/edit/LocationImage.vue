<template>
<section>
    <FindSelectImageButton />
</section>
</template>

<script setup>
import { ref } from 'vue'
import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue';
import FindSelectImageButton from 'src/modules/images/FindSelectImageButton.vue';

const image_files = ref([])
</script>
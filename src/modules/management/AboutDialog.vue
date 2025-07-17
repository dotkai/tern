<template>
<MaxMinDialog :modelValue="modelValue" @update:modelValue="v => $emit('update:modelValue', v)">
<q-card-section>
  <div class="text-h5 text-center">About</div>
  <p>Version: {{  pkg.version  }} </p>
  <p>Released: {{ new Date(buildDate).toLocaleString() }}</p>
  <p>Created by Kai Austin</p>
  <p>For bug reports or issues, please submit via <a href="https://github.com/dotkai">github.</a></p>
  <p>For other inquires, Kai can be contacted: <span class="text-bold">contact@dotkaiapps.net</span></p>

  <div class="text-h6">Description</div>
  <p>TourWizard helps you create, organize, and export multimedia tours for educational, cultural, or fieldwork purposes. Each tour can contain stops, text, images, audio, and geolocation data, and be exported as PDFs, web pages, or database content.</p>

  <div class="text-h6">Features</div>
  <ul>
    <li>Create and organize multi-stop tours</li>
    <li>Attach text, audio, images, and locations to each stop</li>
    <li>Export to PDF and HTML (Future: DOCX, JSON)</li>
    <li>Bundle tour stops, audio, and media into zip archives</li>
    <li>Map integration for geolocated stops</li>
    <li>Offline-friendly exports</li>
  </ul>

  <div class="text-h6">Credits</div>
  <p>Kai's <a href="https://github.com/dotkai">Github repo</a></p>
  <p>This software is built using:</p>
  <ul>
    <li><a href="https://vuejs.org/" target="_blank">Vue 3</a></li>
    <li><a href="https://quasar.dev/" target="_blank">Quasar Framework</a></li>
    <li><a href="https://dexie.org/" target="_blank">Dexie.js</a> for local database</li>
    <li><a href="https://github.com/taylorhakes/crunker" target="_blank">Crunker</a> for audio processing</li>
    <li><a href="https://stuk.github.io/jszip/" target="_blank">JSZip</a> for zip file creation</li>
    <li><a href="https://github.com/eKoopmans/html2pdf" target="_blank">html2pdf.js</a> for PDF generation</li>
  </ul>

  <div class="text-h6">License</div>
  <p>GNU GENERAL PUBLIC LICENSE, version 3 or later</p>
  <p>Copyright (c) 2015 Kai Austin</p>
  <p><a href="https://www.gnu.org/licenses/gpl-3.0-standalone.html">Full text of liscense here.</a></p>
  <p>Short: This software is open-source and can be freely used, modified, or distributed so long as original attribution remains intact. It may not be sold nor can modifications be sold (re: copyleft). The software is provided as-is and without warranty at discretion of the user. Copyright holder cannot be held liable for damages, loss of data, inability to use software, etc unless required by law (see limited liability clause).</p>

</q-card-section>  
</MaxMinDialog>
</template>

<script setup>
import MaxMinDialog from 'src/components/dialogs/MaxMinDialog.vue';
import pkg from '../../../package.json'


const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const buildDate = __BUILD_DATE__


</script>
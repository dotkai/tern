<template>
<div class="row q-mb-md">
    <BaseAudio
        :src="audioPath" />
    <!-- <div>
        <div class="text-center q-mx-md">
        <q-btn round v-if="!isLoading" :icon="isPlaying? 'pause' : 'play_arrow'" size="md"
            @click.stop="play" />
        <q-circular-progress v-if="isLoading" size="72px" indeterminate color="primary" />
        </div>

        <div class="text-center q-mt-sm">
        {{currentTime}} / {{duration}}
        </div>
    </div>

    <div class="wrapper col" part="wrapper">
        <div :id="audioId"></div>
    </div> -->
</div>
</template>

<script setup>
import BaseAudio from "src/components/wrappers/BaseAudio.vue";
import { computed, onMounted, ref } from "vue";
import WaveSurfer from "wavesurfer.js";

const props = defineProps({
    audioPath: String
})

const isPlaying = ref(false)
const isLoading = ref(false)
const wavesurfer = ref(null)
const currentTime = ref(0)
const duration = computed(_ => {
    if (!wavesurfer.value) return false;
    return _millisToMinutesAndSeconds(wavesurfer.value.getDuration())
})

const audioId = computed(() => {
    return 'waveform-'+ new Date().getTime()
})
const displayPath = ref('')

onMounted(async () => {
  if(!props.filename) return;
  displayPath.value = await window.electronFs.readAudioAsDataUrl(props.audioPath)

//   if (!wavesurfer.value) createWaveSurfer();
})

function play(){
    isPlaying.value = !isPlaying.value
    wavesurfer.value.playPause()
}

function createWaveSurfer() {
    wavesurfer.value = WaveSurfer.create({
        container: "#" + audioId.value,
        waveColor: "grey",
        progressColor: "hsla(200, 100%, 30%, 0.5)",
        cursorColor: "#ddd5e9",
        cursorWidth: 2,
        height: 50,
        // Bar stuff
        barWidth: null,
        barGap: null,
        barRadius: null,
        barHeight: null,
        barAlign: "",
        // minPxPerSec: 100,
        // fillParent: true,
        autoplay: false,
        interact: true,
        dragToSeek: false,
        hideScrollbar: false,
        audioRate: 1,
        // autoScroll: true,
        autoCenter: true
    });

    wavesurfer.value.load(displayPath.value);
    wavesurfer.value.on('timeupdate', (curr) => {
        currentTime.value = _millisToMinutesAndSeconds(curr)
    })
}

function _millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60);
    var seconds = ((millis % 60)).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
</script>
    
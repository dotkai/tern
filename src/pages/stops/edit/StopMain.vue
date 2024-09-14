<template>
<section>
    <LabelWrapper name="Name">
        <q-input class="col" filled v-model="store.name" />
    </LabelWrapper>
    <LabelWrapper name="Location">
        <LocationSelect v-model="store.location" />
    </LabelWrapper>
    <LabelWrapper name="Scripts">
        <ScriptSelect v-model="store.transcripts" />
    </LabelWrapper>
</section>
</template>

<script setup>
import { useStopStore } from 'src/modules/stops/StopStore';
import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue';
import LocationSelect from 'src/modules/location/LocationSelect.vue';
import ScriptSelect from 'src/modules/transcripts/ScriptSelect.vue';

const store = useStopStore()

</script>
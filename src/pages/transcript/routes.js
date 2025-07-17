export default [{ 
    path: '/scripts', 
    name: 'scripts', 
    component: () => import('src/pages/transcript/TranscriptView.vue') 
}, { 
    path: '/scripts/:script_id', 
    name: 'edit_script',
    component: () => import('src/pages/transcript/EditTranscriptView.vue'),
    // children: [{
    //     path: '',
    //     name: 'edit_script',
    //     components: {
    //         default: () => import('src/pages/transcript/edit/TranscriptMain.vue'),
    //         // helper: () => import('src/pages/transcript/edit/TranscriptNotes.vue')
    //     },
    //     children: [{
    //         path: '/scripts/:script_id/notes',
    //         name: 'edit_script_notes',
    //         components: {
    //             helper: () => import('src/pages/transcript/edit/TranscriptNotes.vue')
    //         }
    //     }, {
    //         path: 'sources',
    //         name: 'edit_script_sources',
    //         components: {
    //             helper: () => import('src/pages/transcript/edit/TranscriptSources.vue')
    //         }
    //     }, {
    //         path: 'images',
    //         name: 'edit_script_images',
    //         components: {
    //             helper: () => import('src/pages/transcript/edit/TranscriptImages.vue')
    //         }
    //     }, {
    //         path: 'audio',
    //         name: 'edit_script_audio',
    //         components: {
    //             helper: () => import('src/pages/transcript/edit/TranscriptAudio.vue')
    //         }
    //     }]
    // }]
}]
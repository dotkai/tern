export default [{ 
    path: '/scripts', 
    name: 'scripts', 
    component: () => import('src/pages/transcript/TranscriptView.vue') 
}, { 
    path: '/scripts/:script_id', 
    component: () => import('src/pages/transcript/EditTranscriptView.vue'),
    children: [{
        path: '',
        name: 'edit_script',
        component: () => import('src/pages/transcript/edit/TranscriptMain.vue')
    }, {
        path: '/scripts/:script_id/notes',
        name: 'edit_script_notes',
        component: () => import('src/pages/transcript/edit/TranscriptNotes.vue')
    }, {
        path: '/scripts/:script_id/sources',
        name: 'edit_script_sources',
        component: () => import('src/pages/transcript/edit/TranscriptSources.vue')
    }, {
        path: '/scripts/:script_id/images',
        name: 'edit_script_images',
        component: () => import('src/pages/transcript/edit/TranscriptImages.vue')
    }, {
        path: '/scripts/:script_id/audio',
        name: 'edit_script_audio',
        component: () => import('src/pages/transcript/edit/TranscriptAudio.vue')
    }]
}]
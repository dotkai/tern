export default [{ 
    path: '/stops', 
    name: 'stops', 
    component: () => import('src/pages/stops/StopsView.vue') 
}, { 
    path: '/stops/:stop_id', 
    component: () => import('src/pages/stops/EditStopView.vue'),
    children: [{
        path: '',
        name: 'edit_stop', 
        component: () => import('src/pages/stops/edit/StopMain.vue')
    }, {
        path: '/stops/:stop_id/images',
        name: 'edit_stop_images',
        component: () => import('src/pages/stops/edit/StopImages.vue')
    }]
}]
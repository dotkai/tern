export default [{ 
    path: '/stops', 
    name: 'stops', 
    component: () => import('src/pages/stops/StopsView.vue') 
}, { 
    path: '/stops/:stop_id', 
    name: 'edit_stop', 
    component: () => import('src/pages/stops/EditStopView.vue')
}]
export default [{ 
    path: '/location', 
    name: 'location', 
    component: () => import('src/pages/location/LocationView.vue') 
}, { 
    path: '/location/:location_id', 
    component: () => import('src/pages/location/EditLocationView.vue'),
    children: [{
        path: '',
        name: 'edit_location', 
        component: () => import('src/pages/location/edit/LocationMain.vue')
    }, {
        path: '/location/:location_id/images',
        name: 'edit_location_images',
        component: () => import('src/pages/location/edit/LocationImage.vue')
    }]
}]
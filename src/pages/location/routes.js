export default [{ 
    path: '/location', 
    name: 'location', 
    component: () => import('src/pages/location/LocationView.vue') 
}, { 
    path: '/location/:location_id', 
        name: 'edit_location', 
    component: () => import('src/pages/location/EditLocationView.vue'),
}]
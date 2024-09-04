export default [{
    path: '/groups',
    name: 'groups',
    component: () => import('./GrouppingView.vue')
}, {
    path: '/groups/:group_id',
    name: 'edit_group',
    component: () => import('./EditGroupView.vue')
}]
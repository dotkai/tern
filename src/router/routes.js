import LocationRoutes from 'src/pages/location/routes.js'
import ScriptRoutes from 'src/pages/transcript/routes'
import GrouppingRoutes from 'src/pages/groups/routes.js'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: '/tour/:tour_id', name: 'edit_tour', component: () => import('pages/EditTourView.vue') },
      { path: '/stops', name: 'stops', component: () => import('src/pages/stops/StopsView.vue') },
      { path: '/stops/:stop_id', name: 'edit_stop', component: () => import('src/pages/stops/EditStopView.vue') },
      { path: '/images', name: 'images', component: () => import('src/pages/images/ImageGalleryView.vue') },
      ...LocationRoutes,
      ...ScriptRoutes,
      ...GrouppingRoutes
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

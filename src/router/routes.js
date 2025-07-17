import StopRoutes from 'src/pages/stops/routes'
import AudioRoutes from 'src/pages/audio/routes'
import ImageRoutes from 'src/pages/images/routes'
import LocationRoutes from 'src/pages/location/routes.js'
import ScriptRoutes from 'src/pages/transcript/routes'
import GrouppingRoutes from 'src/pages/groups/routes.js'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { 
        path: '/tour/:tour_id', 
        component: () => import('src/pages/tours/EditTourView.vue'),
        children: [{
          path: '',
          name: 'edit_tour',
          component: () => import('src/pages/tours/edit/TourMain.vue')
        }, {
          path: '/tour/:tour_id/stops',
          name: 'edit_tour_stops',
          component: () => import('src/pages/tours/edit/TourStops.vue')
        }]
      },
      ...AudioRoutes,
      ...StopRoutes,
      ...ImageRoutes,
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

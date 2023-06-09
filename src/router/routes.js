
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Auth/LoginPage.vue') },
      { path: 'register', component: () => import('pages/Auth/RegisterPage.vue') }
    ]
  },
  {
    path: '/training',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Training/NewTrainingPage.vue') },
      { path: 'ongoing/:id', component: () => import('pages/Training/OnGoingTrainingPage.vue'), props: true },
      { path: 'ongoing/:id/exercise/:id', component: () => import('pages/Exercise/CurrentExercise.vue'), props: { exercise: true } },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

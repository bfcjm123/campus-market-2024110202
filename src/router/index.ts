import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '首页' },
    },
    {
      path: '/trade',
      name: 'trade',
      component: () => import('@/views/TradeView.vue'),
      meta: { title: '二手交易' },
    },
    {
      path: '/trade/:id',
      name: 'trade-detail',
      component: () => import('@/views/TradeDetail.vue'),
      meta: { title: '交易详情' },
    },
    {
      path: '/lost-found',
      name: 'lost-found',
      component: () => import('@/views/LostFoundView.vue'),
      meta: { title: '失物招领' },
    },
    {
      path: '/lost-found/:id',
      name: 'lost-found-detail',
      component: () => import('@/views/LostFoundDetail.vue'),
      meta: { title: '失物招领详情' },
    },
    {
      path: '/group-buy',
      name: 'group-buy',
      component: () => import('@/views/GroupBuyView.vue'),
      meta: { title: '拼单搭子' },
    },
    {
      path: '/group-buy/:id',
      name: 'group-buy-detail',
      component: () => import('@/views/GroupBuyDetail.vue'),
      meta: { title: '拼单详情' },
    },
    {
      path: '/errand',
      name: 'errand',
      component: () => import('@/views/ErrandView.vue'),
      meta: { title: '跑腿委托' },
    },
    {
      path: '/errand/:id',
      name: 'errand-detail',
      component: () => import('@/views/ErrandDetail.vue'),
      meta: { title: '委托详情' },
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('@/views/PublishView.vue'),
      meta: { title: '发布信息' },
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('@/views/MessageView.vue'),
      meta: { title: '消息中心' },
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/UserCenterView.vue'),
      meta: { title: '个人中心' },
    },
  ],
})

export default router

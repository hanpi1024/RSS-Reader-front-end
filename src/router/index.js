import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import MainView from "@/views/MainView.vue";
import TestView from "@/views/TestView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loginPage',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'home',
      component:MainView,
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      component:TestView,
    }
  ],
})

export default router

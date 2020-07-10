import Vue from 'vue'
import VueRouter from 'vue-router'
import {isAuthenticated} from "../apollo/LocalState";
import Feed from "../views/Feed";
import Auth from "../views/Auth";
import Search from "../views/Search";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: () => isAuthenticated() ? '/feed' : '/auth'
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    props: (route) => ({
      searchTerm: route.query.term
    })
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

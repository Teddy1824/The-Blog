import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signin",
    name: "signin",
    component: () =>
      import(/* webpackChunkName: "signin" */ "../views/SignIn.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import(/* webpackChunkName: "signup" */ "../views/SignUp"),
  },
  {
    path: "/gamingblogs",
    name: "gamingblogs",
    component: () =>
      import(/* webpackChunkName: "gamingblogs" */ "../views/GamingBlogs.vue"),
  },
  {
    path: "/lifestyleblogs",
    name: "lifestyleblogs",
    component: () =>
      import(
        /* webpackChunkName: "lifestyleblogs" */ "../views/LifestyleBlogs.vue"
      ),
  },
  {
    path: "/musicblogs",
    name: "musicblogs",
    component: () =>
      import(/* webpackChunkName: "musicblogs" */ "../views/MusicBlogs.vue"),
  },
  {
    path: "/techblogs",
    name: "techblogs",
    component: () =>
      import(/* webpackChunkName: "techblogs" */ "../views/TechBlogs.vue"),
  },
  {
    path: "/gamingblogs/:id",
    name: "gamingdetails",
    component: () =>
      import(
        /* webpackChunkName: "gamingdetails" */ "../views/GamingDetails.vue"
      ),
    props: true,
  },
  {
    path: "/lifestyleblogs/:id",
    name: "lifestyledetails",
    component: () =>
      import(
        /* webpackChunkName: "lifestyledetails" */ "../views/LifestyleDetails.vue"
      ),
    props: true,
  },
  {
    path: "/musicblogs/:id",
    name: "musicdetails",
    component: () =>
      import(
        /* webpackChunkName: "musicdetails" */ "../views/MusicDetails.vue"
      ),
    props: true,
  },
  {
    path: "/techblogs/:id",
    name: "techdetails",
    component: () =>
      import(/* webpackChunkName: "techdetails" */ "../views/TechDetails.vue"),
    props: true,
  },
  {
    path: "/profilepage",
    name: "profilepage",
    component: () =>
      import(/* webpackChunkName: "profilepage" */ "../views/ProfilePage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

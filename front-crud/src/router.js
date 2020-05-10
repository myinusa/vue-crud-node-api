import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    // {
    //   path: "/",
    //   alias: "/posts",
    //   name: "posts",
    //   component: () => import("./components/PostsList")
    // },
    {
      path: "/",
      alias: "/posts-table",
      name: "posts-table",
      component: () => import("./components/PostsTable")
    }
  ]
});

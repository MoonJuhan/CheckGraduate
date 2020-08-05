import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Overview = () => import("@/pages/Dashboard.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/overview",
    children: [
      {
        path: "overview",
        name: "overview",
        component: Overview
      },
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;

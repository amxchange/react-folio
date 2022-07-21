import { lazy } from "react";

const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard" */ "@d-app/modules/Dashboard"));
const TemplateEditor = lazy(() => import(/* webpackChunkName: "template-editor" */ "@d-app/modules/TemplateEditor"));
const I18 = lazy(() => import(/* webpackChunkName: "i18" */ "@d-app/modules/I18"));
const Profile = lazy(() => import(/* webpackChunkName: "profile" */ "@d-app/modules/Profile"));

const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: Dashboard,
        layout: "/admin"
    },
    {
        path: "/template-editor",
        name: "Template Editor",
        icon: "ni ni-tv-2 text-primary",
        component: TemplateEditor,
        layout: "/admin"
    },
    {
        path: "/i18",
        name: "I18",
        icon: "ni ni-tv-2 text-primary",
        component: I18,
        layout: "/admin"
    },
    {
        path: "/user-profile",
        name: "User Profile",
        icon: "ni ni-single-02 text-yellow",
        component: Profile,
        layout: "/admin",
        sidebar: false
    }
];

export const routesMap = {};
routes.forEach(route => {
    routesMap[route.name.toLowerCase()] = { ...route };
});

export default routes;

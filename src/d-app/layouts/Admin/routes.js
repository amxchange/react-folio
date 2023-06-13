import { lazy } from "react";

const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard" */ "@d-app/modules/Dashboard"));
const TemplateEditor = lazy(() => import(/* webpackChunkName: "template-editor" */ "@d-app/modules/TemplateEditor"));
const TemplateSearch = lazy(() => import(/* webpackChunkName: "template-search" */ "@d-app/modules/TemplateSearch"));
const DataGridTablePdf = lazy(() =>
    import(/* webpackChunkName: "data-grid-table-pdf" */ "@d-app/modules/DataGridTablePdf")
);
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
        path: "/template-search",
        name: "Template Search",
        icon: "ni ni-tv-2 text-primary",
        component: TemplateSearch,
        layout: "/admin"
    },
    {
        path: "/data-grid-table-pdf",
        name: "Data-Grid Table PDF",
        icon: "ni ni-tv-2 text-primary",
        component: DataGridTablePdf,
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

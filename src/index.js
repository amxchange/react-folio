import React, { lazy, Suspense } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch, withRouter } from "react-router-dom";

/* Argon-ui theme css */
import "@argon-ui/assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@argon-ui/assets/scss/argon-dashboard-react.scss";

import "@shared/styles/index.scss"; // shared styles are temporarily imported here in root index, later need to ship them with their respected modules. #TODO
import "./index.css";

import { isMobi, dAppUrlPrefix, mAppUrlPrefix } from "@shared/constants";
import { store } from "./store";
import DataService from "@shared/services/DataService";
import DataStore from "@shared/services/DataStore";

const argonUi = lazy(() => import(/* webpackChunkName: "argonUi" */ "@argon-ui"));
const dApp = lazy(() => import(/* webpackChunkName: "dApp" */ "@d-app")); // lazy(() => import("@d-app")); for unnamed chunks.
const mApp = lazy(() => import(/* webpackChunkName: "mApp" */ "@m-app"));

__webpack_public_path__ = `${window.CONST?.remoteJsUrl || "http://localhost:9009"}/dist/`;

const Root = () => (
    <Provider store={store}>
        <BrowserRouter>
            <RootRoutes />
        </BrowserRouter>
    </Provider>
);

const RootRoutes = withRouter(({ location, ...rest }) => {
    if (location.pathname.includes(`${mAppUrlPrefix}/`) && !isMobi)
        return <Redirect to={location.pathname.replace(`${mAppUrlPrefix}/`, `${dAppUrlPrefix}/`)} />;
    if (location.pathname.includes(`${dAppUrlPrefix}/`) && isMobi)
        return <Redirect to={location.pathname.replace(`${dAppUrlPrefix}/`, `${mAppUrlPrefix}/`)} />;
    return (
        <Suspense fallback={<span>Loading App...</span>}>
            <Switch>
                <Route path={"/argon-ui"} component={argonUi} />
                <Route path={dAppUrlPrefix} component={dApp} />
                <Route path={mAppUrlPrefix} component={mApp} />

                <Route path="/" render={() => <Redirect to={!isMobi ? dAppUrlPrefix : mAppUrlPrefix} />} />
            </Switch>
        </Suspense>
    );
});

Promise.all([DataService.init(), DataStore.init()])
    .then(() => {
        render(<Root />, document.getElementById("app"));
    })
    .catch(() => console.error("App initiation failed!"));

if (module["hot"]) {
    module["hot"].accept();
}

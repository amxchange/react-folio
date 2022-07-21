import React, { lazy, Suspense } from "react";
import { Redirect, Route, withRouter, Switch, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardExample = lazy(() =>
    import(/* webpackChunkName: "dashboard-example" */ "@d-app/modules/Dashboard-Example")
); // https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules
const CounterExample = lazy(() => import(/* webpackChunkName: "counter-example" */ "@shared/modules/Counter-Example"));
const Auth = lazy(() => import(/* webpackChunkName: "auth" */ "@d-app/layouts/Auth"));
const Admin = lazy(() => import(/* webpackChunkName: "admin" */ "@d-app/layouts/Admin"));

const Routes = props => {
    const match = useRouteMatch();
    const user = useSelector(state => state.user);

    const isLoggedIn = () => {
        return true;
    };

    return (
        <Suspense fallback={<span>Loading route...</span>}>
            <Switch>
                <Route path={`${match.path}/dashboard-example`} component={DashboardExample} />
                <Route path={`${match.path}/counter-example`} component={CounterExample} />

                <Route path={`${match.path}/auth`} component={Auth} />
                <Route path={`${match.path}/admin`} component={Admin} />

                <Route path="/" render={() => <Redirect to={`${match.path}/admin`} />} />
            </Switch>
        </Suspense>
    );
};

export default withRouter(Routes);

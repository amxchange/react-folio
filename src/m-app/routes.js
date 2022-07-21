import React, { lazy, Suspense } from "react";
import { Redirect, Route, withRouter, Switch } from "react-router-dom";

const DashboardExample = lazy(() =>
    import(/* webpackChunkName: "m-dashboard-example" */ "@m-app/modules/Dashboard-Example")
); // https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules
const CounterExample = lazy(() => import(/* webpackChunkName: "counter-example" */ "@shared/modules/Counter-Example"));

const Routes = props => {
    return (
        <Suspense fallback={<span>Loading route...</span>}>
            <Switch>
                <Route exact path={`${props.match.path}/dashboard-example`} component={DashboardExample} />
                <Route exact path={`${props.match.path}/counter-example`} component={CounterExample} />

                <Route path="/" render={() => <Redirect to={`${props.match.path}/dashboard-example`} />} />
            </Switch>
        </Suspense>
    );
};

export default withRouter(Routes);

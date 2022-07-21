import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";

import FourOhThree from "./FourOhThree";

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
    const componentCheck = props => {
        if (isLoggedIn) {
            return <Component {...props} />;
        } else {
            return <FourOhThree />;
        }
    };

    return <Route {...rest} render={props => componentCheck(props)} />;
};

const mapStateToProps = ({ auth }) => {
    return {
        isLoggedIn: true || auth.isLoggedIn
    };
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));

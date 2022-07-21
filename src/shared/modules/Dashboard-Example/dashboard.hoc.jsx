/**
 * EXAMPLE FILE
 */

import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useScreenWidth } from "./dashboard.hooks";
import { setMeta } from "./dashboard.redux";

const Dashboard = Component =>
    class extends React.Component {
        state = {};

        /**
         * @description: Dummy auth func.
         * @param {object} request
         * @param {object} options
         * @return {Promise}
         */
        authenticate = ({ request = {}, options = {} } = {}) => {
            return new Promise(async (resolve, reject) => {
                try {
                    resolve("data");
                } catch (error) {
                    reject(error);
                }
            });
        };

        render() {
            return <Component {...this.props} {...this.state} screenWidth={999} authenticate={this.authenticate} />;
        }
    };

const mapStateToProps = (state, ownProps) => {
    return {
        dashboardExample: state.dashboardExample
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setMeta: payload => dispatch(setMeta(payload))
    };
};

/**
 * @description:
 * Standard hoc example for class based components.
 * Note - prefer to connect to your global state from hoc and keep your components light and clean.
 */
export const withDashboard = compose(connect(mapStateToProps, mapDispatchToProps), Dashboard);

/**
 * @description:
 * Workaround to use custom hooks in your class based components.
 * Simply create a hoc that accepts a Component and returns a new Component with hooks in action.
 * Note - prefer to connect to your global state from hoc and keep your components light and clean.
 */
export const withDashboardHooks = Component =>
    (props) => {
        const meta = useSelector(state => state.dashboardExample.meta);
        const screenWidth = useScreenWidth();
        return (
            <Component
                screenWidth={screenWidth}
                meta={meta}
                {...props}
            />
        );
    };

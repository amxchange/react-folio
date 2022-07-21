/**
 * EXAMPLE FILE
 */

import React from "react";
import { withRouter } from "react-router-dom";

import EventService from "@shared/services/EventService";
import TypicalPopup from "@shared/modules/utils/TypicalPopup";
import { withDashboard, withDashboardHooks } from "@shared/modules/Dashboard-Example/dashboard.hoc";
import { useScreenWidth } from "@shared/modules/Dashboard-Example/dashboard.hooks";
import { mAppUrlPrefix, dAppUrlPrefix } from "@shared/constants";

/**
 * Function Component
 */
const DashboardF = props => {
    const screenWidth = useScreenWidth();
    return (
        <div style={{ textAlign: "center", background: "#8fbc8f" }}>
            <button
                onClick={() => {
                    props.history.push(mAppUrlPrefix);
                }}
                disabled
            >
                switch to M-app
            </button>
            <h1>D-app Dashboard</h1>
            <p>screen width - {screenWidth}</p>
            <button
                onClick={() => {
                    EventService.publish("globalModal.show", {
                        data: { text: "D Login confirmation", noButtons: true },
                        component: TypicalPopup,
                        events: {
                            onClickNo: () => {
                                EventService.publish("globalModal.hide", {});
                            }
                        }
                    });
                }}
            >
                go to details
            </button>
            <button
                onClick={() => {
                    props.history.push(`${dAppUrlPrefix}/counter-example`);
                }}
            >
                go to counter
            </button>
        </div>
    );
};

export default withRouter(DashboardF);

/**
 * Class Component
 */
class DashboardC extends React.Component {
    render() {
        return (
            <div style={{ textAlign: "center", background: "#8fbc8f" }}>
                <button
                    onClick={() => {
                        this.props.history.push(`/m`);
                    }}
                >
                    switch to M-app
                </button>
                <h1>D-app Dashboard</h1>
                <p>screen width - {this.props.screenWidth}</p>
                <button
                    onClick={() => {
                        EventService.publish("globalModal.show", {
                            data: { text: "D Login confirmation", noButtons: true },
                            component: TypicalPopup,
                            events: {
                                onClickNo: () => {
                                    EventService.publish("globalModal.hide", {});
                                }
                            }
                        });
                    }}
                >
                    go to details
                </button>
                <button
                    onClick={() => {
                        this.props.history.push(`/d/counter`);
                    }}
                >
                    go to counter
                </button>
            </div>
        );
    }
}
// export default withRouter(withDashboard(DashboardC));
// export default withRouter(withDashboardHooks(DashboardC));

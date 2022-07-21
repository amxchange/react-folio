/**
 * EXAMPLE FILE
 */

import React from "react";
import { withRouter } from "react-router-dom";

import EventService from "@shared/services/EventService";
import { TypicalPopup } from "@shared/modules/utils";
import { mAppUrlPrefix, dAppUrlPrefix } from "@shared/constants";

const Dashboard = props => {
    return (
        <div style={{ textAlign: "center", background: "#5f9ea0" }}>
            <button
                onClick={() => {
                    props.history.push(dAppUrlPrefix);
                }}
                disabled
            >
                switch to D-app
            </button>
            <h1>M-app Dashboard</h1>
            <button
                onClick={() => {
                    EventService.publish("globalModal.show", {
                        data: { text: "M Login confirmation", noButtons: true },
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
                    props.history.push(`${mAppUrlPrefix}/counter-example`);
                }}
            >
                go to counter
            </button>
        </div>
    );
};

export default withRouter(Dashboard);

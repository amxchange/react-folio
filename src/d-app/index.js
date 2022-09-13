import React from "react";

import "@d-app/styles/index.scss";
import Routes from "@d-app/routes";
import { ErrorBoundary, ToastUtil, GlobalModal } from "@shared/modules/utils";

console.log(`
    ################################# CDN DETAILS #################################
    FILE :: /dist/main.bundle.js
    FROM :: ${window.CONST?.remoteJsUrl}
    VERSION :: ${_process.env.version || "-"}
    BUILD TIME :: ${_process.env.timestamp ? new Date(_process.env.timestamp) : "-"}
    SERVER :: ${window.CONST?.remoteServerUrl}
    ENV :: ${_process.env.NODE_ENV}
    ###############################################################################
`);

export default function App() {
    return (
        <ErrorBoundary>
            <div className="app">
                <Routes />
                <GlobalModal />
                <ToastUtil.init />
            </div>
        </ErrorBoundary>
    );
}

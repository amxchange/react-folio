import React from "react";

import "@m-app/styles/index.scss";
import Routes from "@m-app/routes";
import { ErrorBoundary, ToastUtil, GlobalModal } from "@shared/modules/utils";

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

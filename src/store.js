import { configureStore } from "@reduxjs/toolkit";

import counterReducerExample from "@shared/modules/Counter-Example/counter.slice";
import dashboardReducerExample from "@shared/modules/Dashboard-Example/dashboard.redux";

export const store = configureStore({
    reducer: {
        counterExample: counterReducerExample,
        dashboardExample: dashboardReducerExample
    }
});
/**
 * creates a Redux store, and also automatically configures the Redux DevTools extension so that you can inspect the store while developing.
 */

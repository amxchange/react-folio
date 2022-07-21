import React from "react";
import { cssTransition, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Slide = cssTransition({
    enter: "slide-enter",
    exit: "slide-exit",
    collapse: false
});

const ToastUtil = (function () {
    let currentToastId = "";
    let prevToastMsg = "";

    return {
        init: function () {
            return (
                <ToastContainer
                    transition={Slide}
                    position="bottom-right"
                    autoClose={8000}
                    hideProgressBar={true}
                    icon={true}
                    closeButton={true}
                    pauseOnHover
                />
            );
        },
        dismiss: function (id) {
            console.log("dismiss", { id });
            toast.dismiss(id);
        },
        notify: function ({ type = "info", msg = "", options = {} }) {
            let isActive = toast.isActive(currentToastId); /* works only after the toast is rendered */
            console.log("notify", { type, msg, currentToastId, prevToastMsg, isActive });
            if (currentToastId && isActive) {
                /* active toast */ console.log("active toast flow - update");
                toast.update(currentToastId, {
                    render: msg,
                    type: toast.TYPE[type.toUpperCase()],
                    autoClose: 8000
                });
                prevToastMsg = msg;
            } else {
                /* no active toast */ console.log("no active toast flow");
                currentToastId = toast[type](msg, {
                    onOpen: function () {
                        // window.alert("Called when I open");
                    },
                    onClose: function () {
                        // window.alert("Called when I close");
                        currentToastId = "";
                    },
                    toastId: "customId",
                    ...options
                });
                prevToastMsg = msg;
            }
        },
        info: function (msg) {
            this.notify({ type: "info", msg });
        },
        success: function (msg) {
            this.notify({ type: "success", msg });
        },
        warn: function (msg) {
            this.notify({ type: "warn", msg });
        },
        error: function (msg) {
            this.notify({ type: "error", msg });
        }
    };
})();

export default ToastUtil;

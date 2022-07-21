import axios from "axios";
import getValue from "lodash/get";

import { ToastUtil } from "@shared/modules/utils";
import { is } from "@shared/utils";

const qs = require("qs");

const CDN_PREFIX = window.CONST?.remoteJsUrl;

let proxy = false; // TODO - make it dynamic | setting it to false currently since we achieved same using MODHEADER ext.
let SERVER = proxy ? "http://localhost:8010/proxy" : ""; // https://www.npmjs.com/package/local-cors-proxy | had to use local proxy server since api server was giving cors error.
let PREFIX = `${SERVER}/api/v1`;

if (window.CONST?.dummyApi) {
    if (window.location.hostname === "localhost") {
        PREFIX = "/stubs/";
    }
    if (window.CONST?.remoteServerUrl) {
        PREFIX = window.CONST?.remoteServerUrl;
    }
}

const DataService = {
    urlMap: {},

    async init() {
        this.source = axios.CancelToken.source();
        return "done";
    },

    get(url, data, _config) {
        let config = _config || {};
        let finalUrl;

        config = {
            ...config,
            headers: {
                Accept: "application/json",
                "api-key": "3a457a74be76d6c3603059b559f6addf",
                ...config.headers
            }
        };
        finalUrl = (_config?.ignorePrefix ? "" : PREFIX) + this.prepare(url, config);

        return axios
            .request({
                url: finalUrl,
                method: "get",
                // responseType: config.responseType,
                headers: config.headers,
                params: data,
                cancelToken: config.cancelToken || this.source.token
            })
            .then(resp => {
                // this.interceptResponse(resp, url, config, data);
                return resp.data;
            })
            .catch(resp => {
                console.log(resp);
                if (!config.noToast && getValue(resp, "response.data.error", undefined))
                    ToastUtil.error(resp.response.data.error);
                if (resp.data) return resp.data;
                else resp;
            });
    },

    post(url, data, _config) {
        let config = _config || {};
        let finalUrl;

        config = {
            ...config,
            headers: {
                Accept: "application/json",
                "api-key": "3a457a74be76d6c3603059b559f6addf",
                ...config.headers
            }
        };

        finalUrl = (_config?.ignorePrefix ? "" : PREFIX) + this.prepare(url, config);
        return axios
            .request({
                url: finalUrl,
                data: data instanceof FormData ? data : qs.stringify(data),
                method: "post",
                responseType: config.responseType,
                headers: config.headers,
                cancelToken: config.cancelToken || this.source.token
            })
            .then(resp => {
                this.interceptResponse(resp, url, config, data);
                return resp.data;
            })
            .catch(resp => {
                if (!config.noToast && getValue(resp, "response.data.error", undefined))
                    ToastUtil.error(resp.response.data.error);
                if (resp.data) return resp.data;
                else resp;
            });
    },

    abortRequests() {
        this.source.cancel();
        this.source = axios.CancelToken.source();
    },

    interceptResponse(resp, url, config) {
        if (is.Array(resp.data.errors) && resp.data.errors.indexOf(-1) > -1) {
            ToastUtil.error("You are being timed out due to inactivity. Please log in again");
            window.setTimeout(() => {
                window.location.href = "/login";
            }, 1200);
        }

        if (resp.data.redirectUrl) {
            window.location.href = resp.data.redirectUrl;
        }

        this.checkDownload(resp);
        this.updateStubs(url, resp, config);
    },

    checkDownload(resp) {
        if (!resp || !resp.headers["content-disposition"]) return;
        let fileName = (resp.headers["content-disposition"] || "attachment; filename=report.pdf")
            .split(" ")[1]
            .split("=")[1];
        const url = window.URL.createObjectURL(new Blob([resp.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    updateStubs(url, resp, config) {
        if (
            // process.env.DEV &&
            window.CONST?.updateStubs
        ) {
            //Make port dynamic
            axios.request({
                url: "http://localhost:4000/update-stub" + this.prepare(url, config),
                data: resp.data,
                method: "post"
            });
        }
    },

    getFromCDN(url) {
        return axios.get(CDN_PREFIX + url);
    },

    prepare(url, config) {
        url = this.urlMap[url] || url;
        for (var i in config) {
            url = url.replace("{" + i + "}", config[i]);
        }
        return url;
    },

    openPopup(url) {
        return window.open(
            url,
            "Login with ",
            `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no`
        );
    },

    linkAccount(name) {
        let url = `${PREFIX}/${name}/linksocial`;
        this.openPopup(url);
        return new Promise((resolve, reject) => {
            window.onAuthenticated = resp => {
                resolve(resp);
            };
        });
    }
};

export default DataService;

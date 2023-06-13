import axios from "axios";
import { serializeParams } from "@shared/utils";

export class ApiService {
    constructor({ prefix = "", responseBuilder = res => res } = {}) {
        this.prefix = prefix;
        this.responseBuilder = responseBuilder;
        this.initInterceptors();
    }

    get = (url, data, options) => this.request({ url, method: "get", data, options });

    post = (url, data, options) => this.request({ url, method: "post", data, options });

    put = (url, data, options) => this.request({ url, method: "put", data, options });

    delete = (url, data, options) => this.request({ url, method: "delete", data, options });

    postFormData = (url, data, options) => {
        data = serializeParams(data);
        return this.post(url, data, {
            ...options,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                ...options.headers
            }
        });
    };

    request = async ({ url, method, data, options = {} }) => {
        url = this.getUrl({ url, options });
        let axiosArgs = this.getAxiosArgs({ url, method, data, options });
        try {
            let response = await axios.request(axiosArgs);
            if (
                response.status !== 200
                // || (response.data.statusKey !== "SUCCESS" && !(response.data instanceof Blob))
            ) {
                console.log(
                    `%c ApiService request: ${url} (${method}) status non success: ${response}`,
                    "background: #701414; color: #bada55"
                );
                console.log(`%c throwing`, "background: #701414; color: #bada55");
                throw response;
            }
            return this.responseBuilder(response);
        } catch (thrown) {
            if (axios.isCancel(thrown)) {
                console.log("Request canceled", thrown.message);
            } else {
                if (
                    false // add condition for need of custom interceptor in case of failure
                ) {
                    let interceptorResp = await this.errorResponseInterceptor({
                        method,
                        url,
                        axiosArgs,
                        response: thrown.response
                    });
                    return this.responseBuilder(interceptorResp);
                }
                console.log(
                    `%c ApiService request: ${url} (${method}) catch: ${thrown.response}`,
                    "background: #701414; color: #bada55"
                );
            }
            throw thrown;
        }
    };

    initInterceptors() {
        axios.interceptors.response.use(
            async response => {
                this.checkDownload(response);
                return Promise.resolve(response);
            },
            error => {
                if (axios.isCancel(error)) {
                    console.log("Request canceled", error.message);
                } else {
                    let errorData = error.response.data;
                    let errorMessages = [errorData.message, errorData.messageKey, errorData.error, errorData.errorKey];
                    error.errorMsg = errorMessages.find(v => !!v);
                    if (error.request.responseType === "blob") {
                        let reader = new FileReader();
                        reader.onload = function () {
                            let errResp = jsonutil.parse(reader.result);
                            if (errResp.message) ToastUtil.error(errResp.message);
                        };
                        reader.readAsText(error.response.data);
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    errorResponseInterceptor = ({ url, method, axiosArgs, response }) => {
        return new Promise.resolve();
    };

    checkDownload = resp => {
        if (!resp || !resp.headers["content-disposition"]) return;
        let suppressDownload = resp.config.headers["suppress-download"];
        let fileName = (resp.headers["content-disposition"] || "attachment; filename=table.pdf")
            .split(" ")[1]
            .split("=")[1];
        const url = this.getUrlFromBlob(resp.data);
        if (suppressDownload) return url;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
    };

    getUrlFromBlob = data => {
        return window.URL.createObjectURL(new Blob([data]));
    };

    getUrl = ({ url, options = {} }) => {
        let result = "";
        let urlType =
            options && options.urlType && typeof options.urlType === "string" ? options.urlType.toLowerCase() : "";
        switch (urlType) {
            case "absolute":
                result = url;
                break;
            case "relative":
                result = this.prefix + url;
                break;
            default:
                result = this.prefix + url;
        }
        return result;
    };

    getAxiosArgs = ({ url, method, data, options = {} }) => {
        let _options = {
            ...options,
            headers: {
                Accept: "application/json",
                ...options.headers
            }
        };
        let axiosArgs = {
            url,
            method,
            responseType: _options.responseType,
            headers: _options.headers,
            cancelToken: _options.cancelToken
        };
        switch (method) {
            case "get":
                axiosArgs = { ...axiosArgs, params: data };
                break;
            case "post":
            case "put":
            case "delete":
                axiosArgs = { ...axiosArgs, data, params: _options.params };
                break;
            default:
                break;
        }
        return axiosArgs;
    };
}

export const Api = {
    root: new ApiService({
        prefix: (window.CONST?.remoteServerUrl || "") + "/api/v1",
        responseBuilder: res => res.data
    })
};

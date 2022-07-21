import { clone } from "@shared/utils";

const DataStore = {
    data: {
        user: {}
    },

    async init() {
        if (window.userMeta) {
            this.setUserMeta(window.userMeta);
        }
        if (window.hostType) this.setHostType(window.hostType);

        this.dataStr = JSON.stringify(this.data);

        return "done";
    },

    reset() {
        this.data = JSON.parse(this.dataStr);
    },

    setData(data) {
        this.data = clone(data);
    },

    getData() {
        return this.data;
    },

    setUserMeta(data) {
        this.data.user = data || this.data.user;
    },

    getUserMeta() {
        return this.data.user || {};
    },

    setHostType(data) {
        this.data.hostType = data;
    },

    setConfig(data) {
        this.data.config = data || this.data.config;
    }
};

export default DataStore;

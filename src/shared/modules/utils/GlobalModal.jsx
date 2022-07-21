import React, { Component } from "react";
import Modal from "./Modal";
import EventService from "../../services/EventService";

class GlobalModal extends Component {
    state = {
        data: {},
        modalProps: {},
        component: null,
        componentProps: {}
    };

    componentDidMount() {
        this.eventShow = EventService.subscribe("globalModal.show", async ({ data, modalProps, component, componentProps }) => {
            this.setState({ data, modalProps, component, componentProps }, () => {
                try {
                    this.globalModal.show({ data });
                } catch (error) {
                    console.error("could not hide global modal!!");
                }
            });
        });

        this.eventHide = EventService.subscribe("globalModal.hide", ({ data, reject }) => {
            try {
                this.globalModal.hide({ data, reject });
            } catch (error) {
                console.error("could not hide global modal!!");
            } finally {
                this.setState({ data: {}, modalProps: {}, component: null, componentProps: {} });
            }
        });
    }

    componentWillUnmount() {
        this.eventShow.remove();
        this.eventHide.remove();
    }

    render() {
        let { modalProps, component: ModalComponent, componentProps } = this.state;
        return (
            <Modal onRef={ref => (this.globalModal = ref)} {...modalProps}>
                {ModalComponent ? <ModalComponent {...componentProps} /> : ""}
            </Modal>
        );
    }
}

export default GlobalModal;

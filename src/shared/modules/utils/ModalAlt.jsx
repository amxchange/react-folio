import React, { useImperativeHandle } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const ModalAlt = React.forwardRef((props, ref) => {
    const [state, setState] = React.useState({
        mount: false,
        data: {}
    });

    const show = ({ data = {} } = {}) => {
        setState(prev => ({ ...prev, mount: true, data }));
    };
    const hide = () => {
        setState(prev => ({ ...prev, mount: false, data: {} }));
    };

    useImperativeHandle(ref, () => ({
        show,
        hide
    }));

    const childrenWithProps = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { data: state.data, close: props.onClose || hide });
        }
        return child;
    });
    return (
        <div>
            <Dialog
                onClose={props.onClose || hide}
                aria-labelledby="customized-dialog-title"
                open={state.mount}
                maxWidth={"lg"}
            >
                {props.children ? (
                    childrenWithProps
                ) : (
                    <>
                        {/* Header */}
                        {props.header && <DialogTitle sx={{ m: 0, p: 2 }}>{props.header}</DialogTitle>}

                        {/* Close icon */}
                        {props.closeIcon && (
                            <IconButton
                                aria-label="close"
                                onClick={hide}
                                style={{
                                    position: "absolute",
                                    right: 8,
                                    top: 8,
                                    color: theme => theme.palette.grey[500]
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        )}

                        {/* Content */}
                        {props.content && <DialogContent dividers={props.dividers}>{props.content}</DialogContent>}

                        {/* Footer */}
                        {props.footer && <DialogActions>{props.footer}</DialogActions>}
                    </>
                )}
            </Dialog>
        </div>
    );
});

export default ModalAlt;

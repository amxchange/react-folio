import React, { useEffect, useRef, useState } from "react";
import { ToastUtil } from "@shared/modules/utils";

function EditorPreview(props) {
    const { isViewed, value, data = {} } = props;

    const iframeRef = useRef();

    useEffect(() => {
        if (isViewed && value) {
            let previewValue = value;

            try {
                const template = Handlebars.compile(value);
                previewValue = template(data);
            } catch (error) {
                ToastUtil.error(`${error.message}`);
            }

            console.log("EditorPreview writing..");
            iframeRef.current.contentWindow.document.open();
            iframeRef.current.contentWindow.document.write(previewValue);
            iframeRef.current.contentWindow.document.close();
        }
    });

    return (
        <>
            <iframe ref={iframeRef} />
        </>
    );
}

export default EditorPreview;

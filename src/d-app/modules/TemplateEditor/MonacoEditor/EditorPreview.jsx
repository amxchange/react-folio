import React, { useEffect, useRef, useState } from "react";

function EditorPreview(props) {
    const { isViewed, value } = props;

    const iframeRef = useRef();

    useEffect(() => {
        if (isViewed) {
            console.log("EditorPreview");
            iframeRef.current.contentWindow.document.open();
            iframeRef.current.contentWindow.document.write(value);
            iframeRef.current.contentWindow.document.close();
        }
    }, [value]);

    return (
        <>
            <iframe ref={iframeRef} />
        </>
    );
}

export default EditorPreview;

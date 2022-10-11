import React, { useEffect, useRef, useState } from "react";
import { ToastUtil } from "@shared/modules/utils";

const replaceVariables = (result, __properties) => {
    let variables = result.match(/\${[a-zA-Z0-9.\-_]*}/g);
    if (!variables) return result;
    let variableValues = __properties.__variables || {};
    for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];
        const variableValue = variableValues[variable.slice(2, -1)];
        result = result.replace(variable, variableValue || fallback);
    }
    if (result.includes("${")) {
        return replaceVariables(result, __properties);
    }
    return result;
};

Handlebars.registerHelper("_prop", (key, options) => {
    let fallback = "__";

    if (typeof key !== "string") return fallback;

    let { __properties = {} } = options.data?.root || {};
    let result = `${__properties[key] || fallback}`;

    if (result.includes("@")) {
        let env = "default";
        result = result.replaceAll("@env", env);
    }

    if (result.includes("${")) {
        result = replaceVariables(result, __properties);
    }

    return result;
});

function EditorPreview(props) {
    const { isViewed, value, data = {}, properties = {} } = props;

    const iframeRef = useRef();

    useEffect(() => {
        if (isViewed && value) {
            let previewValue = value;

            try {
                const template = Handlebars.compile(value);
                previewValue = template({ ...data, __properties: properties });
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

import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Button } from "reactstrap";
import Editor from "@monaco-editor/react";
import { ToastUtil } from "@shared/modules/utils";

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function EditorContext(props) {
    const { completetionItemsJsonStr, setCompletetionItemsJsonStr } = props;
    const [value, setValue] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        if (completetionItemsJsonStr && !value) {
            setValue(completetionItemsJsonStr);
        }
    }, [completetionItemsJsonStr]);

    const handleRegister = () => {
        if (!value) return ToastUtil.info("Please enter value or '{}' to proceed");
        if (isJsonString(value)) {
            setIsRegistered(true);
            setCompletetionItemsJsonStr(value);
        } else {
            ToastUtil.error("Invalid input value");
        }
    };

    function handleValidation(markers) {
        // model markers
        markers.forEach(marker => console.log("onValidate:", marker.message));
    }

    return (
        <Row>
            <Col xs="12">
                <h4>Data</h4>
                <div>
                    <Editor
                        height={"50vh"}
                        theme={"light"}
                        beforeMount={() => {}}
                        onMount={() => {}}
                        language={"json"}
                        value={value}
                        onChange={newVal => setValue(newVal)}
                        onValidate={handleValidation}
                        options={{
                            minimap: { enabled: false },
                            readOnly: isRegistered
                        }}
                    />
                </div>
                <div className="mt-4">
                    <Button
                        color="primary"
                        onClick={e => {
                            if (value) {
                                if (isJsonString(value)) {
                                    setValue(JSON.stringify(JSON.parse(value), undefined, 4));
                                } else {
                                    ToastUtil.error("Invalid input value");
                                }
                            } else {
                                ToastUtil.info("Please enter value or '{}' to proceed");
                            }
                        }}
                        size="sm"
                    >
                        validate json
                    </Button>
                    <Button color="default" onClick={e => setValue("")} size="sm">
                        clear
                    </Button>
                    <Button
                        color="primary"
                        onClick={e => (isRegistered ? setIsRegistered(false) : handleRegister())}
                        size="sm"
                    >
                        {isRegistered ? "modify" : "register"}
                    </Button>
                </div>
            </Col>
        </Row>
    );
}

export default EditorContext;

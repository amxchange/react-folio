import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import ContentWrapper from "@d-app/modules/utils/ContentWrapper";
import Editor from "@monaco-editor/react";
import { ToastUtil } from "@shared/modules/utils";
import { Api } from "@shared/services/ApiService";

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const DataGridTablePdf = props => {
    const [loading, setLoading] = useState(false);

    const [value, setValue] = useState(`{
    "headers":[],
    "data": [],
    "options": {}
}`);

    const handleValidation = markers => {
        markers.forEach(marker => console.log("onValidate:", marker.message));
    };

    const getPdf = async () => {
        if (!value) return ToastUtil.info("Please enter value or '{}' to proceed");
        if (isJsonString(value)) {
            try {
                let req = JSON.parse(value);
                setLoading(true);
                await Api.root.post("/grid/data-grid-table-pdf", req, {
                    responseType: "blob",
                    headers: {
                        Accept: "application/pdf"
                    }
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        } else {
            ToastUtil.error("Invalid input value");
        }
    };

    return (
        <ContentWrapper>
            <Row>
                <Col className="mb-5 mb-xl-0" xl="12">
                    <Card className="shadow">
                        <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                                <div className="col">
                                    <h2 className="mb-0">Convert Data-Grid Table to PDF</h2>
                                </div>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <div className="px-4 mb-4">
                                <h3>Request JSON</h3>
                                <Row>
                                    <Col xs="12">
                                        <Editor
                                            height={"48vh"}
                                            theme={"light"}
                                            beforeMount={() => {}}
                                            onMount={() => {}}
                                            language={"json"}
                                            value={value}
                                            onChange={newVal => setValue(newVal)}
                                            onValidate={handleValidation}
                                            options={{
                                                minimap: { enabled: false },
                                                readOnly: false
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <Button color="primary" onClick={() => getPdf()}>
                                            {loading ? "loading..." : "Get PDF"}
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default DataGridTablePdf;

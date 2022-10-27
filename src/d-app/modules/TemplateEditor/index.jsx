import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardHeader, CardBody, Row, Col, FormGroup, Form } from "reactstrap";
import ContentWrapper from "@d-app/modules/utils/ContentWrapper";
import FormField from "@d-app/modules/utils/FormField";
import EditorWrapper from "@d-app/modules/TemplateEditor/EditorWrapper";
import { Api } from "@shared/services/ApiService";
import { ToastUtil } from "@shared/modules/utils";

const TemplateEditor = props => {
    const [loading, setLoading] = useState(false);

    const [meta, setMeta] = useState({});

    const [editorMode, setEditorMode] = useState(null);

    const tenantRef = useRef();
    const [tenantVal, setTenantVal] = useState(null);

    const channelRef = useRef();
    const [channelVal, setChannelVal] = useState("");

    const languageRef = useRef();
    const [languageVal, setLanguageVal] = useState("");

    const templateNameRef = useRef();
    const [templateNameVal, setTemplateNameVal] = useState("");

    const templateNameSelectRef = useRef();
    const [templateNameSelectVal, setTemplateNameSelectVal] = useState("");
    const [templateNameSelectOpts, setTemplateNameSelectOpts] = useState([]);

    const [templateData, setTemplateData] = useState("");

    const [showEditor, setShowEditor] = useState(false);
    const [editorCollapse, setEditorCollapse] = useState(false);

    useEffect(() => {
        const init = async () => {
            let _meta = await fetchMeta();
            setMeta(_meta);
            setEditorMode(_meta.editorModeOptions[0]);
            setTenantVal(_meta.tenantOptions[0]);

            fetchTemplates();
        };

        init();
    }, []);

    const fetchMeta = async () => {
        let meta = {};
        try {
            let res = await Api.root.get("/pub/meta");
            meta = res.data;
        } catch (error) {
            console.error(error);
        }
        return meta;
    };

    const fetchTemplates = async ({ tenant, channel, language } = {}) => {
        if (editorMode?.value === "CREATE") return;

        let req = {
            tenant: tenant === undefined ? tenantVal?.value : tenant,
            channel: channel === undefined ? channelVal?.value : channel,
            language: language === undefined ? languageVal?.value : language,
            per_page: 100 //TODO
        };
        try {
            setLoading(true);
            let res = await Api.root.get("/template", req);
            let _templateNameSelectOpts = res.data.map(t => ({ label: t.name, value: t.name, path: t.path }));
            setTemplateNameSelectOpts(_templateNameSelectOpts);
            if (!_templateNameSelectOpts.length) {
                setTemplateNameSelectVal("");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTemplate = async () => {
        if (!templateNameSelectRef.current.isValid()) return;
        let req = {
            templatePath: templateNameSelectVal.path
        };
        try {
            setLoading(true);
            let res = await Api.root.get(`/template/${templateNameSelectVal.value}`, req);
            let { content, content_data, properties } = res.data;
            setTemplateData({ ...content, content_data, properties: properties[tenantVal.value] });
            setShowEditor(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProperties = async () => {
        try {
            let res = await Api.root.get(`/template/properties`, { tenant: tenantVal.value });
            setTemplateData(prev => ({ ...prev, properties: res.data.properties }));
        } catch (error) {
            console.error(error);
        }
    };

    const onProceed = () => {
        if (editorMode?.value === "CREATE") {
            if (!templateNameRef.current.isValid()) return;
            fetchProperties();
            setShowEditor(true);
        } else {
            fetchTemplate();
        }
    };

    const onAction = async (req, type) => {
        if (type === "CREATE") {
            req.tenant = tenantVal?.value;
            req.channel = channelVal?.value;
            req.language = languageVal?.value;
        }
        req.templatePath = templateNameSelectVal.path;
        let actionTypeMeta = {
            CREATE: { label: "Create", method: "post" },
            UPDATE: { label: "Update", method: "put" },
            DELETE: { label: "Delete", method: "delete" }
        };
        try {
            await Api.root[actionTypeMeta[type].method](
                `/template/${type === "CREATE" ? templateNameVal : templateNameSelectVal.value}`,
                req
            );
            ToastUtil.success(actionTypeMeta[type].label + " successful");
            return "success";
        } catch (error) {
            ToastUtil.error(actionTypeMeta[type].label + " failed");
            throw error;
        }
    };

    const reset = ({ avoidResetTemplates } = {}) => {
        setShowEditor(false);
        setTenantVal(meta.tenantOptions[0]);
        setChannelVal("");
        setLanguageVal("");
        setTemplateNameVal("");
        setTemplateNameSelectVal("");
        setTemplateData("");
        if (!avoidResetTemplates) fetchTemplates({ channel: null, language: null });
    };

    return (
        <ContentWrapper>
            <Row>
                <Col className="order-xl-1" xl="12">
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <Row className="align-items-center">
                                        <Col xs="2">
                                            <h3 className="mb-0">Editor mode</h3>
                                        </Col>
                                        <Col xs="4">
                                            <FormField
                                                controlled={true}
                                                type={"select"}
                                                value={editorMode}
                                                onChange={newVal => {
                                                    setEditorMode(newVal);
                                                    reset({ avoidResetTemplates: true });
                                                }}
                                                options={meta.editorModeOptions}
                                                containerClass={"mb-0"}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className="text-right" xs="4">
                                    <Button color="primary" onClick={e => reset()} size="sm">
                                        Reset
                                    </Button>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                {meta.repoUrl && meta.branchName && (
                                    <>
                                        <h6 className="heading-small text-muted mb-0">Gitlab details</h6>
                                        <p style={{ opacity: "0.5" }}>
                                            &#62;&#62; {meta.repoUrl} &nbsp;&nbsp;&#62;&#62; {meta.branchName}
                                        </p>
                                    </>
                                )}
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="2">
                                            <FormField
                                                ref={tenantRef}
                                                controlled={true}
                                                type={"select"}
                                                label={"Tenant"}
                                                value={tenantVal}
                                                onChange={newVal => {
                                                    setTenantVal(newVal);
                                                    fetchTemplates({ tenant: newVal?.value || null });
                                                }}
                                                options={meta.tenantOptions}
                                                disabled={showEditor}
                                            />
                                        </Col>
                                        <Col lg="2">
                                            <FormField
                                                ref={channelRef}
                                                controlled={true}
                                                type={"select"}
                                                label={"Channel"}
                                                value={channelVal}
                                                onChange={newVal => {
                                                    setChannelVal(newVal);
                                                    fetchTemplates({ channel: newVal?.value || null });
                                                }}
                                                options={meta.channelOptions}
                                                isClearable={true}
                                                disabled={showEditor}
                                            />
                                        </Col>
                                        <Col lg="2">
                                            <FormField
                                                ref={languageRef}
                                                controlled={true}
                                                type={"select"}
                                                label={"Language"}
                                                value={languageVal}
                                                onChange={newVal => {
                                                    setLanguageVal(newVal);
                                                    fetchTemplates({ language: newVal?.value || null });
                                                }}
                                                options={meta.languageOptions}
                                                isClearable={true}
                                                disabled={showEditor}
                                            />
                                        </Col>
                                        <Col lg="3">
                                            {editorMode?.value == "CREATE" ? (
                                                <FormField
                                                    ref={templateNameRef}
                                                    controlled={true}
                                                    type={"text"}
                                                    label={"Template Name"}
                                                    value={templateNameVal}
                                                    onChange={newVal => {
                                                        if (/^[a-zA-Z0-9]*$/.test(newVal)) setTemplateNameVal(newVal);
                                                    }}
                                                    disabled={showEditor}
                                                />
                                            ) : (
                                                <FormField
                                                    ref={templateNameSelectRef}
                                                    controlled={true}
                                                    type={"select"}
                                                    label={"Template Name"}
                                                    value={templateNameSelectVal}
                                                    onChange={newVal => {
                                                        setTemplateNameSelectVal(newVal);
                                                    }}
                                                    options={templateNameSelectOpts}
                                                    disabled={showEditor}
                                                />
                                            )}
                                        </Col>
                                        <Col lg="1">
                                            <FormGroup style={{ marginTop: "30px" }}>
                                                <Button
                                                    color="primary"
                                                    onClick={e => (loading ? () => {} : onProceed())}
                                                    size="md"
                                                    disabled={showEditor}
                                                >
                                                    {loading ? "loading..." : "Proceed"}
                                                </Button>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <hr className="my-4" />
                            </Form>
                            {/* Editor */}
                            {showEditor ? (
                                <Row className="mt-4">
                                    <div className="col">
                                        <EditorWrapper
                                            title={`Editor`}
                                            mode={editorMode?.value}
                                            collapse={editorCollapse}
                                            setCollapse={setEditorCollapse}
                                            data={templateData}
                                            onAction={onAction}
                                            reset={reset}
                                        />
                                    </div>
                                </Row>
                            ) : null}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default TemplateEditor;

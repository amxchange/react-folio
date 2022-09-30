import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Button, Card, CardHeader, CardFooter, Collapse } from "reactstrap";
import Tabs, { TabPane } from "rc-tabs";
import "rc-tabs/assets/index.css";
import FormField from "@d-app/modules/utils/FormField";
import { ToastUtil } from "@shared/modules/utils";
import {
    convertStringToNode,
    // convertNodeToString,
    toJSON,
    // toDOM,
    maskThymeleafExpressions
    // unmaskThymeleafExpressions
} from "@shared/utils";
import MonacoEditor from "@d-app/modules/TemplateEditor/MonacoEditor";
import EditorPreview from "@d-app/modules/TemplateEditor/MonacoEditor/EditorPreview";
import EditorContext from "@d-app/modules/TemplateEditor/MonacoEditor/EditorContext";

const EDITOR_LANGUAGE_OPTIONS = [
    { label: "handlebars", value: "handlebars" },
    { label: "html", value: "html" }
    // { label: "javascript", value: "javascript" }
];
const EDITOR_THEME_OPTIONS = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "vs-dark" }
];

const EditorWrapper = props => {
    const { title = "", mode, collapse = false, setCollapse, data = {}, onAction, reset } = props;

    const [value, setValue] = useState("");
    const [completetionItemsJsonStr, setCompletetionItemsJsonStr] = useState("");

    const emailRef = useRef();
    const [emailVal, setEmailVal] = useState("");

    const commitMsgRef = useRef();
    const [commitMsgVal, setCommitMsgVal] = useState("");

    const [editorLanguage, setEditorLanguage] = useState(EDITOR_LANGUAGE_OPTIONS[0]);
    const [editorTheme, setEditorTheme] = useState(EDITOR_THEME_OPTIONS[0]);

    const [activeTab, setActiveTab] = useState("editor");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (mode === "UPDATE") {
            const content = atob(data.content);
            setValue(content);
            if (data.content_data) {
                setTimeout(() => {
                    setCompletetionItemsJsonStr(JSON.stringify(data.content_data, null, 4));
                }, 1000);
            }
        }
    }, [data.content]);

    const _onAction = async type => {
        if (type === "CREATE" && !value) return ToastUtil.error(`Template content cannot be empty`);
        if ([commitMsgRef.current.isValid(), emailRef.current.isValid()].includes(false)) return;

        let content_json = "";
        try {
            let value_without_th_expressions = maskThymeleafExpressions(value);
            let content_dom = convertStringToNode(value_without_th_expressions);
            content_json = toJSON(content_dom);

            // let content_dom_again = toDOM(content_json);
            // let value_again = convertNodeToString(content_dom_again);
            // let value_with_th_expressions = unmaskThymeleafExpressions(value_again);
        } catch (error) {
            console.error("error while converting template string to json object ", error);
        }

        let payload = {
            email: emailVal,
            commitMessage: commitMsgVal,
            ...(type !== "DELETE"
                ? {
                      content: btoa(value),
                      content_json,
                      content_data: completetionItemsJsonStr ? JSON.parse(completetionItemsJsonStr) : {}
                  }
                : {})
        };

        try {
            setLoading(true);
            if (onAction) await onAction(payload, type);
            setTimeout(() => {
                reset && reset();
            }, 500);
        } catch (error) {
            console.log("Action failed - ", type);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="shadow">
            {/* <CardHeader>
                <Row className="align-items-center">
                    <Col xs="8">{title && <h3 className="mb-0">{title}</h3>}</Col>
                    <Col className="text-right" xs="4">
                        <Button color="primary" onClick={e => {}} size="sm">
                            Preview
                        </Button>
                        <Button color="primary" onClick={e => setCollapse && setCollapse(prev => !prev)} size="sm">
                            {collapse ? "Expand" : "Hide"}
                        </Button>
                    </Col>
                </Row>
            </CardHeader> */}
            <Collapse isOpen={!collapse}>
                <div className="px-4 mb-4">
                    <Row>
                        <Col xs="12">
                            <Tabs onChange={key => setActiveTab(key)} tabBarGutter={30}>
                                <TabPane tab="Editor" key="editor">
                                    <div className={"tab-content"}>
                                        <Row className="tab-content-header">
                                            <Col xs="2">
                                                <FormField
                                                    controlled={true}
                                                    type={"select"}
                                                    label={"Input Language"}
                                                    value={editorLanguage}
                                                    onChange={newVal => {
                                                        setEditorLanguage(newVal);
                                                    }}
                                                    options={EDITOR_LANGUAGE_OPTIONS}
                                                />
                                            </Col>
                                            <Col xs="2">
                                                <FormField
                                                    controlled={true}
                                                    type={"select"}
                                                    label={"Theme"}
                                                    value={editorTheme}
                                                    onChange={newVal => {
                                                        setEditorTheme(newVal);
                                                    }}
                                                    options={EDITOR_THEME_OPTIONS}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="tab-content-body">
                                            <Col>
                                                <MonacoEditor
                                                    theme={editorTheme.value}
                                                    language={editorLanguage.value}
                                                    value={value}
                                                    setValue={setValue}
                                                    completetionItemsJsonStr={completetionItemsJsonStr}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </TabPane>
                                <TabPane tab="Context" key="context">
                                    <div className={"tab-content"}>
                                        <EditorContext
                                            completetionItemsJsonStr={completetionItemsJsonStr}
                                            setCompletetionItemsJsonStr={setCompletetionItemsJsonStr}
                                        />
                                    </div>
                                </TabPane>
                                <TabPane tab="Preview" key="preview">
                                    <div className={"tab-content"}>
                                        <EditorPreview
                                            isViewed={activeTab === "preview"}
                                            value={value}
                                            data={
                                                completetionItemsJsonStr
                                                    ? JSON.parse(completetionItemsJsonStr)
                                                    : undefined
                                            }
                                        />
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
                <CardFooter className="py-4">
                    <Row>
                        <Col lg="4">
                            <FormField
                                ref={commitMsgRef}
                                controlled={true}
                                type={"text"}
                                placeholder={"Commit message"}
                                value={commitMsgVal}
                                onChange={newVal => setCommitMsgVal(newVal)}
                            />
                        </Col>
                        <Col lg="4">
                            <FormField
                                ref={emailRef}
                                controlled={true}
                                type={"text"}
                                placeholder={"Commit email"}
                                value={emailVal}
                                onChange={newVal => setEmailVal(newVal)}
                            />
                        </Col>
                        <Col className="text-right">
                            {mode == "UPDATE" ? (
                                <>
                                    <Button
                                        color="primary"
                                        onClick={e => (loading ? () => {} : _onAction("UPDATE"))}
                                        size="md"
                                    >
                                        {loading ? "loading..." : "Update"}
                                    </Button>
                                    <Button
                                        color="danger"
                                        onClick={e => (loading ? () => {} : _onAction("DELETE"))}
                                        size="md"
                                    >
                                        {loading ? "loading..." : "Delete"}
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    color="primary"
                                    onClick={e => (loading ? () => {} : _onAction("CREATE"))}
                                    size="md"
                                >
                                    {loading ? "loading..." : "Create"}
                                </Button>
                            )}
                            <Button color="default" onClick={e => reset && reset()} size="md">
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </CardFooter>
            </Collapse>
        </Card>
    );
};

export default EditorWrapper;

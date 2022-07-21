import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardHeader, CardBody, Row, Col, FormGroup, Form } from "reactstrap";
import ContentWrapper from "@d-app/modules/utils/ContentWrapper";
import FormField from "@d-app/modules/utils/FormField";
import EditorWrapper from "@d-app/modules/TemplateEditor/EditorWrapper";
import { Api } from "@shared/services/ApiService";
import { ToastUtil } from "@shared/modules/utils";

const REPO_URL = `https://gitlab.com/almullagroup/amx/amx-jax.git`;
const BRANCH_NAME = `fs_template_editor_dev`;
const EDITOR_MODE_OPTIONS = [
    { label: "Update", value: "UPDATE" },
    { label: "Create", value: "CREATE" }
];
const CHANNEL_OPTIONS = [
    { label: "Sms", value: "sms" },
    { label: "Email", value: "email" },
    { label: "Whatsapp", value: "wa" }
];
const LANGUAGE_OPTIONS = [
    { label: "English", value: "en" },
    { label: "Arabic", value: "ar" }
];

const TemplateEditor = props => {
    const [loading, setLoading] = useState(false);

    const [editorMode, setEditorMode] = useState(EDITOR_MODE_OPTIONS[0]);

    const channelRef = useRef();
    const [channelVal, setChannelVal] = useState("");

    const languageRef = useRef();
    const [languageVal, setLanguageVal] = useState("");
    const [languageOpts, setLanguageOpts] = useState(LANGUAGE_OPTIONS);

    const templateNameRef = useRef();
    const [templateNameVal, setTemplateNameVal] = useState("");

    const templateNameSelectRef = useRef();
    const [templateNameSelectVal, setTemplateNameSelectVal] = useState("");
    const [templateNameSelectOpts, setTemplateNameSelectOpts] = useState([]);

    const [templateData, setTemplateData] = useState("");

    const [showEditor, setShowEditor] = useState(false);
    const [editorCollapse, setEditorCollapse] = useState(false);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async ({ channel, language } = {}) => {
        let req = {
            channel: channel === undefined ? channelVal?.value : channel,
            language: language === undefined ? languageVal?.value : language,
            per_page: 100 //TODO
        };
        try {
            setLoading(true);
            let res = await Api.root.get("/template", req);
            // let res = {
            //     success: true,
            //     data: [
            //         {
            //             id: "1ae3d82d3773e7dc24042d47e107fe4db9da02ed",
            //             name: "BeneCreationSuccess.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/BeneCreationSuccess.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "5dfe9b2e04091836f87a619db2e608d7d1d0beb2",
            //             name: "BirthdayWish.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/BirthdayWish.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "6d348dbfff0ce4985741531a7b53cb0cac24da7f",
            //             name: "EkycAccepted.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/EkycAccepted.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "0e18b115cb2e01f3fc5f6be4d22d7a483a25cfb0",
            //             name: "EkycAccountVerified.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/EkycAccountVerified.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "4383d2caa5f54f89412240b7a0436b185051f179",
            //             name: "EkycDocumentRejected.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/EkycDocumentRejected.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "4383d2caa5f54f89412240b7a0436b185051f179",
            //             name: "EkycRejected.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/EkycRejected.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "7959afd7179dc9a5954d0cc734a9d867c6c491d7",
            //             name: "FcOutOfStockCustomer.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/FcOutOfStockCustomer.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "452612a30071ed77eb5ae93d47a31829784c8631",
            //             name: "PaymentLink.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/PaymentLink.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "9ec6f46057745630be3d6c8268dd2285654e01cd",
            //             name: "PlaceOrderConfirm.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/PlaceOrderConfirm.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "a587eed6faa11f740ddb97e72b637b2aca66ec9f",
            //             name: "PolicyConfirmation.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/PolicyConfirmation.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "f30efb0497107680cd99b2fd0dec95877b113057",
            //             name: "PolicyExpired.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/PolicyExpired.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "256985ffc0944973f34cf4ff73d1eb59894899c3",
            //             name: "PolicyExpiryReminder.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/PolicyExpiryReminder.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "d29f17b08be0b9fd32b8b4bfee5eab300c7044e7",
            //             name: "PolicyOptoutCustomer.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/PolicyOptoutCustomer.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "9e7043612f9970f063806737cdd0f6d0300c25d0",
            //             name: "PolicyOptoutSystem.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/PolicyOptoutSystem.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "75249e0b82ce6a144104ff8eb011edb6140d2fc9",
            //             name: "PolicyPendingTrnx.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/PolicyPendingTrnx.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "d26b22ea8e4e7f0b3b0e6e64f5f17b5592be6ca0",
            //             name: "WUCancelReminder.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/WUCancelReminder.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "8aab59989a60191f26eabe862d334b80dee468e8",
            //             name: "WUPickupReminder.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/WUPickupReminder.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "9773c6d02da977ac7ef2db0381745e4070966389",
            //             name: "WUTrnxCancelled.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/WUTrnxCancelled.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "c25e585130a82ede9b3690e7ec7583975b920467",
            //             name: "WUTrnxSuccess.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/WUTrnxSuccess.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "3bd4749965935b78f04564a040e64ef35b8041d7",
            //             name: "bene-success-sms.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/bene-success-sms.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "89f0db031c66390d0eff45f1b2eb78b12f477b96",
            //             name: "cash.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/cash.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "d1a48dba7d97627888682c711cb9e49a67c44a37",
            //             name: "cash_AR.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/cash_AR.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "8afd2124dfd934a2485a887e49c5e7adc1654b37",
            //             name: "civilexpired.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/civilexpired.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "abba713407157c6b8f419f832fab4b835f7787ce",
            //             name: "civilexpiry.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/civilexpiry.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "3315065234f520323a6aa0d3bee95064ef85fc51",
            //             name: "eft.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/eft.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "52cbed179887aada744082d13fef6162d1a4d4ff",
            //             name: "eft_AR.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/eft_AR.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "8110626c44f3d61552eaf89c16709af9323c69c0",
            //             name: "order-success.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/order-success.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "a4de1ca7a788106cb063e0865ee5443b281abc53",
            //             name: "place-order.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/place-order.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "957ff8cbafae9fef3973e6be1d017e07f091cc3b",
            //             name: "resend-verification.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/resend-verification.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "293e0ca942c76a96e11d56c724df2903338c6d46",
            //             name: "reset-otp-sms.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/reset-otp-sms.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "6981da00ff8296c8fc1af366f27de6c69ae31cd9",
            //             name: "trnx-feedback.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/trnx-feedback.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "f208c2b2e11abe83cc1c8cd53bb5536d9a2ae7f2",
            //             name: "tt.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/tt.html",
            //             mode: "100644"
            //         },
            //         {
            //             id: "0702737ef9886d10c32db9f730106181f9a6ea8e",
            //             name: "tt_AR.html",
            //             type: "blob",
            //             path: "ms-postman/src/main/resources/templates/html/wa/tt_AR.html",
            //             mode: "100644"
            //         }
            //     ]
            // };
            let _templateNameSelectOpts = res.data.map(t => ({ label: t.name, value: t.name, path: t.path }));
            setTemplateNameSelectOpts(_templateNameSelectOpts);
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
            // let res = {
            //     success: true,
            //     data: {
            //         file_name: "BirthdayWish.html",
            //         file_path: "ms-postman/src/main/resources/templates/html/wa/BirthdayWish.html",
            //         size: 140,
            //         encoding: "base64",
            //         content_sha256: "a6654f5d4a4e67b9da8f9b10cbbd75839dbdaa19359ec9a2ed866c6c66165ba2",
            //         ref: "fs_template_editor_dev",
            //         blob_id: "5dfe9b2e04091836f87a619db2e608d7d1d0beb2",
            //         commit_id: "379d6a9d10a4340ebfdad1e785340af541b10ea6",
            //         last_commit_id: "d40e5a548a3bfdbffc03c3e43a9aa62e78bb9e69",
            //         execute_filemode: false,
            //         content:
            //             "PGh0bWwgdGg6aW5saW5lPSJ0ZXh0IiB0aDpyZW1vdmU9InRhZyI+W1ske190dS5wcm9wKCdjb21wYW55Lm5hbWUnKX1dXSB3aXNoZXMgeW91IGEgVmVyeSBIYXBweSBCaXJ0aGRheSBhbmQgYSBwcm9zcGVyb3VzIHllYXIgYWhlYWQhPC9odG1sPgo="
            //     }
            // };
            setTemplateData(res.data);
            setShowEditor(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onProceed = () => {
        if (editorMode.value === "CREATE") {
            if (!templateNameRef.current.isValid()) return;
            setShowEditor(true);
        } else {
            fetchTemplate();
        }
    };

    const onAction = async (req, type) => {
        req.channel = channelRef.value;
        req.language = languageRef.value;
        req.templatePath = templateNameSelectVal.path;
        let actionTypeMeta = {
            CREATE: { label: "Create", method: "post" },
            UPDATE: { label: "Update", method: "put" },
            DELETE: { label: "DELETE", method: "delete" }
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
        setChannelVal("");
        setLanguageVal("");
        setTemplateNameVal("");
        setTemplateNameSelectVal("");
        setTemplateData("");
        if (!avoidResetTemplates) fetchTemplates();
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
                                                options={EDITOR_MODE_OPTIONS}
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
                                <h6 className="heading-small text-muted mb-0">Gitlab details</h6>
                                <p style={{ opacity: "0.5" }}>
                                    &#62;&#62; {REPO_URL} &nbsp;&nbsp;&#62;&#62; {BRANCH_NAME}
                                </p>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="3">
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
                                                options={CHANNEL_OPTIONS}
                                                isClearable={true}
                                                disabled={showEditor}
                                            />
                                        </Col>
                                        <Col lg="3">
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
                                                options={languageOpts}
                                                isClearable={true}
                                                disabled={showEditor}
                                            />
                                        </Col>
                                        <Col lg="3">
                                            {editorMode.value == "CREATE" ? (
                                                <FormField
                                                    ref={templateNameRef}
                                                    controlled={true}
                                                    type={"text"}
                                                    label={"Template Name"}
                                                    value={templateNameVal}
                                                    onChange={newVal => {
                                                        setTemplateNameVal(newVal);
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
                                        <Col>
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
                                            mode={editorMode.value}
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

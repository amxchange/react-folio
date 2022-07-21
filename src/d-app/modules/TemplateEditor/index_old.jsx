import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    FormGroup,
    Form,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle
} from "reactstrap";
import ContentWrapper from "@d-app/modules/utils/ContentWrapper";
import DataTable from "@d-app/modules/utils/DataTable";
import FormField from "@d-app/modules/utils/FormField";
import EditorWrapper from "@d-app/modules/TemplateEditor/EditorWrapper";
import { Api } from "@shared/services/ApiService";
import { ToastUtil } from "@shared/modules/utils";

const TemplateEditor = props => {
    const branchNameRef = useRef();

    const [loading, setLoading] = useState(false);

    const templateTypeRef = useRef();
    const [templateTypeVal, setTemplateTypeVal] = useState("");
    const [templateTypeOpts, setTemplateTypeOpts] = useState([]);

    const templateRef = useRef();
    const [templateVal, setTemplateVal] = useState("");
    const [templateOpts, setTemplateOpts] = useState([]);

    const [templateData, setTemplateData] = useState("");

    const [tableCollapse, setTableCollapse] = useState(true);
    const [editorCollapse, setEditorCollapse] = useState(false);

    useEffect(() => {
        fetchTemplateTypeOpts();
    }, []);

    const fetchTemplateTypeOpts = async () => {
        let req = {
            branchName: branchNameRef.current.val()
        };
        try {
            setLoading(true);
            let res = await Api.root.get("/template/types", req);
            /*
            let res = {
                success: true,
                data: [
                    {
                        id: "659138c1ca369ba9cd12faa672f043ab9e1dcf06",
                        name: "email",
                        type: "tree",
                        path: "promo/templates/html/email",
                        mode: "040000"
                    },
                    {
                        id: "44b5572fab2c86c876811a7a44b936c73512e853",
                        name: "sms",
                        type: "tree",
                        path: "promo/templates/html/sms",
                        mode: "040000"
                    },
                    {
                        id: "a6bb6f7582336a865c8b8365b86533cc2a67742e",
                        name: ".DS_Store",
                        type: "blob",
                        path: "promo/templates/html/.DS_Store",
                        mode: "100644"
                    }
                ]
            };
            */
            let _templateTypeOpts = res.data
                .filter(t => t.type === "tree")
                .map(t => ({ label: t.name, value: t.name, path: t.path }));
            setTemplateTypeOpts(_templateTypeOpts);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTemplates = async () => {
        if (!templateTypeRef.current.isValid()) return;
        let req = {
            branchName: branchNameRef.current.val(),
            templateType: templateTypeVal?.value?.toUpperCase() || ""
        };
        try {
            setLoading(true);
            let res = await Api.root.get("/template", req);
            /*
            let res = {
                success: true,
                data: [
                    {
                        id: "1b22af38f2af2a27becb908635a1f34b9b70648c",
                        name: "ADD_BENE_CONFIRMATION.html",
                        type: "blob",
                        path: "promo/templates/html/email/ADD_BENE_CONFIRMATION.html",
                        mode: "100644"
                    },
                    {
                        id: "7b08854f5d2840f86dfe7149196a78c2c9969272",
                        name: "PROMOTION_APPLEWATCH.html",
                        type: "blob",
                        path: "promo/templates/html/email/PROMOTION_APPLEWATCH.html",
                        mode: "100644"
                    },
                    {
                        id: "d620348a39329f22e3fca7c37dc1237afb4dda7a",
                        name: "PROMOTION_APPLEWATCH_IPHONE11.html",
                        type: "blob",
                        path: "promo/templates/html/email/PROMOTION_APPLEWATCH_IPHONE11.html",
                        mode: "100644"
                    },
                    {
                        id: "21db9ceab1b71b684adabf29c90196abf847c565",
                        name: "PROMOTION_EGYPTPRO.html",
                        type: "blob",
                        path: "promo/templates/html/email/PROMOTION_EGYPTPRO.html",
                        mode: "100644"
                    },
                    {
                        id: "b361f6b70678ec43d7bdc35eb655b3700e7e3f02",
                        name: "PROMOTION_IPHONE11.html",
                        type: "blob",
                        path: "promo/templates/html/email/PROMOTION_IPHONE11.html",
                        mode: "100644"
                    },
                    {
                        id: "85f75ba1a2c193dd365f27c589400651933b6585",
                        name: "PROMOTION_ONFIRSTTRX.html",
                        type: "blob",
                        path: "promo/templates/html/email/PROMOTION_ONFIRSTTRX.html",
                        mode: "100644"
                    },
                    {
                        id: "ca9a33b60d02a1145869decdef7f5d732182ac75",
                        name: "PROMOTION_PAKTRNX.html",
                        type: "blob",
                        path: "promo/templates/html/email/PROMOTION_PAKTRNX.html",
                        mode: "100644"
                    },
                    {
                        id: "10e20fc1c6016895f98c13103badcba23216decd",
                        name: "PROMOTION_PHILIPPINE.html",
                        type: "blob",
                        path: "promo/templates/html/email/PROMOTION_PHILIPPINE.html",
                        mode: "100644"
                    },
                    {
                        id: "cf1ddeaa5b38652b5fe5e740dc949a89987256b1",
                        name: "WIN_IPHONE.html",
                        type: "blob",
                        path: "promo/templates/html/email/WIN_IPHONE.html",
                        mode: "100644"
                    }
                ]
            };
            */
            let _templateOpts = res.data
                .filter(t => t.type === "blob")
                .map(t => ({ ...t, label: t.name, value: t.name }));
            setTemplateOpts(_templateOpts);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTemplate = async () => {
        if (!templateRef.current.isValid()) return;
        let req = {
            branchName: branchNameRef.current.val(),
            templateType: templateTypeVal?.value?.toUpperCase()
        };
        let templateName = templateVal?.value;
        templateName = templateName.split("/").pop();
        try {
            setLoading(true);
            let res = await Api.root.get(`/template/${templateName}`, req);
            /*
            let resStr = '{"success":true,"data":{"file_name":"WIN_IPHONE.html","file_path":"promo/templates/html/email/WIN_IPHONE.html","size":4915,"encoding":"base64","content_sha256":"f7bf9c68e10e3200efd4d63510f3fe2691fd1508524c911977b0416c18cbcdbb","ref":"fs-template-editor","blob_id":"cf1ddeaa5b38652b5fe5e740dc949a89987256b1","commit_id":"0fe50d885230d6dbc1dcf32cb4385cada7e84daa","last_commit_id":"76f1532b89db51014296231319c6d0038593b027","execute_filemode":false,"content":"PCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgVHJhbnNpdGlvbmFsLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXRyYW5zaXRpb25hbC5kdGQiPgo8aHRtbCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIKCXhtbG5zOnRoPSJodHRwOi8vd3d3LnRoeW1lbGVhZi5vcmciIGxhbmc9ImFyIj4KPGhlYWQ+CjxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgiIC8+CjxtZXRhIGh0dHAtZXF1aXY9IkNvbnRlbnQtVHlwZSIgY29udGVudD0idGV4dC9odG1sOyBjaGFyc2V0PVVURi04IiAvPgo8dGl0bGU+WW91ciB0cmFuc2FjdGlvbiBtYXkganVzdCBnZXQgeW91IGFuIGlQaG9uZSAxMSBQcm8gTWF4PC90aXRsZT4KPHN0eWxlPgoqIHsJCgltYXJnaW46IDA7Cglmb250LWZhbWlseTogIkhlbHZldGljYSBOZXVlIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjsKCWJveC1zaXppbmc6IGJvcmRlci1ib3g7Cglmb250LXNpemU6IDE2cHg7Cn0KCmltZyB7CgltYXgtd2lkdGg6IDEwMCU7Cn0KCmJvZHkgewoJLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7Cgktd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7Cgl3aWR0aDogMTAwJSAhaW1wb3J0YW50OwoJaGVpZ2h0OiAxMDAlOwoJbGluZS1oZWlnaHQ6IDEuNmVtOwoJLyogMS42ZW0gKiAxNHB4ID0gMjIuNHB4LCB1c2UgcHggdG8gZ2V0IGFpcmllciBsaW5lLWhlaWdodCBhbHNvIGluIFRodW5kZXJiaXJkLCBhbmQgWWFob28hLCBPdXRsb29rLmNvbSwgQU9MIHdlYm1haWwgY2xpZW50cyAqLwoJLypsaW5lLWhlaWdodDogMjJweDsqLwp9Cgp0YWJsZSB0ZCB7Cgl2ZXJ0aWNhbC1hbGlnbjogdG9wOwp9Cgpib2R5IHsKCWJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7Cn0KCi5ib2R5LXdyYXAgewoJYmFja2dyb3VuZC1jb2xvcjogI2Y2ZjZmNjsKCXdpZHRoOiAxMDAlOwp9CgouY29udGFpbmVyIHsKCWRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7CgltYXgtd2lkdGg6IDYwMHB4ICFpbXBvcnRhbnQ7CgltYXJnaW46IDAgYXV0byAhaW1wb3J0YW50OwoJLyogbWFrZXMgaXQgY2VudGVyZWQgKi8KCWNsZWFyOiBib3RoICFpbXBvcnRhbnQ7Cn0KCi5jb250ZW50IHsKCW1heC13aWR0aDogNjAwcHg7CgltYXJnaW46IDAgYXV0bzsKCWRpc3BsYXk6IGJsb2NrOwoJcGFkZGluZzogMjBweDsKfQoKLm1haW4gewoJYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsKCWJvcmRlcjogMXB4IHNvbGlkICNlOWU5ZTk7Cglib3JkZXItcmFkaXVzOiAzcHg7Cn0KCi5jb250ZW50LXdyYXAgewoJcGFkZGluZzogMjBweDsKfQoKLmNvbnRlbnQtYmxvY2sgewoJcGFkZGluZzoyMHB4OwogICAgY29sb3I6I2ZmZjsKfQoKLmhlYWRlciB7Cgl3aWR0aDogMTAwJTsKCW1hcmdpbi1ib3R0b206IDIwcHg7Cn0KCi5mb290ZXIgewoJd2lkdGg6IDEwMCU7CgljbGVhcjogYm90aDsKCWNvbG9yOiAjOTk5OwoJcGFkZGluZzogMjBweDsKfQoKLmZvb3RlciBwLCAuZm9vdGVyIGEsIC5mb290ZXIgdGQgewoJY29sb3I6ICM5OTk7Cglmb250LXNpemU6IDEycHg7Cn0KCmgxLCBoMiwgaDMgewoJZm9udC1mYW1pbHk6ICJIZWx2ZXRpY2EgTmV1ZSIsIEhlbHZldGljYSwgQXJpYWwsICJMdWNpZGEgR3JhbmRlIiwKCQlzYW5zLXNlcmlmOwoJY29sb3I6ICMwMDA7CgltYXJnaW46IDQwcHggMCAwOwoJbGluZS1oZWlnaHQ6IDEuMmVtOwoJZm9udC13ZWlnaHQ6IDQwMDsKfQoKaDEgewoJZm9udC1zaXplOiAzMnB4OwoJZm9udC13ZWlnaHQ6IDUwMDsKCS8qIDEuMmVtICogMzJweCA9IDM4LjRweCwgdXNlIHB4IHRvIGdldCBhaXJpZXIgbGluZS1oZWlnaHQgYWxzbyBpbiBUaHVuZGVyYmlyZCwgYW5kIFlhaG9vISwgT3V0bG9vay5jb20sIEFPTCB3ZWJtYWlsIGNsaWVudHMgKi8KCS8qbGluZS1oZWlnaHQ6IDM4cHg7Ki8KfQoKaDIgewoJZm9udC1zaXplOiAyNHB4OwoJLyogMS4yZW0gKiAyNHB4ID0gMjguOHB4LCB1c2UgcHggdG8gZ2V0IGFpcmllciBsaW5lLWhlaWdodCBhbHNvIGluIFRodW5kZXJiaXJkLCBhbmQgWWFob28hLCBPdXRsb29rLmNvbSwgQU9MIHdlYm1haWwgY2xpZW50cyAqLwoJLypsaW5lLWhlaWdodDogMjlweDsqLwp9CgpoMyB7Cglmb250LXNpemU6IDE4cHg7CgkvKiAxLjJlbSAqIDE4cHggPSAyMS42cHgsIHVzZSBweCB0byBnZXQgYWlyaWVyIGxpbmUtaGVpZ2h0IGFsc28gaW4gVGh1bmRlcmJpcmQsIGFuZCBZYWhvbyEsIE91dGxvb2suY29tLCBBT0wgd2VibWFpbCBjbGllbnRzICovCgkvKmxpbmUtaGVpZ2h0OiAyMnB4OyovCn0KCmg0IHsKCWZvbnQtc2l6ZTogMTRweDsKCWZvbnQtd2VpZ2h0OiA2MDA7Cn0KCnAsIHVsLCBvbCB7CgltYXJnaW4tYm90dG9tOiAxMHB4OwoJZm9udC13ZWlnaHQ6IG5vcm1hbDsKfQoKcCBsaSwgdWwgbGksIG9sIGxpIHsKCW1hcmdpbi1sZWZ0OiA1cHg7CglsaXN0LXN0eWxlLXBvc2l0aW9uOiBpbnNpZGU7Cn0KCmEgewoJY29sb3I6ICMzNDhlZGE7Cgl0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsKfQoudGFibGV7Ym9yZGVyOjAgbm9uZTsgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7fQoudGFibGUgdGR7IGJvcmRlcjogMXB4IHNvbGlkICNlNmU2ZTY7IH0KCi5idG4tcHJpbWFyeSB7Cgl0ZXh0LWRlY29yYXRpb246IG5vbmU7Cgljb2xvcjogI0ZGRjsKCWJhY2tncm91bmQtY29sb3I6ICMzNDhlZGE7Cglib3JkZXI6IHNvbGlkICMzNDhlZGE7Cglib3JkZXItd2lkdGg6IDEwcHggMjBweDsKCWxpbmUtaGVpZ2h0OiAyZW07CgkvKiAyZW0gKiAxNHB4ID0gMjhweCwgdXNlIHB4IHRvIGdldCBhaXJpZXIgbGluZS1oZWlnaHQgYWxzbyBpbiBUaHVuZGVyYmlyZCwgYW5kIFlhaG9vISwgT3V0bG9vay5jb20sIEFPTCB3ZWJtYWlsIGNsaWVudHMgKi8KCS8qbGluZS1oZWlnaHQ6IDI4cHg7Ki8KCWZvbnQtd2VpZ2h0OiBib2xkOwoJdGV4dC1hbGlnbjogY2VudGVyOwoJY3Vyc29yOiBwb2ludGVyOwoJZGlzcGxheTogaW5saW5lLWJsb2NrOwoJYm9yZGVyLXJhZGl1czogNXB4OwoJdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7Cn0KCi5sYXN0IHsKCW1hcmdpbi1ib3R0b206IDA7Cn0KCi5maXJzdCB7CgltYXJnaW4tdG9wOiAwOwp9CgouYWxpZ25jZW50ZXIgewoJdGV4dC1hbGlnbjogY2VudGVyOwp9CgouYWxpZ25yaWdodCB7Cgl0ZXh0LWFsaWduOiByaWdodDsKfQoKLmFsaWdubGVmdCB7Cgl0ZXh0LWFsaWduOiBsZWZ0Owp9CgouY2xlYXIgewoJY2xlYXI6IGJvdGg7Cn0KCi5hbGVydCB7Cglmb250LXNpemU6IDE2cHg7Cgljb2xvcjogI2ZmZjsKCWZvbnQtd2VpZ2h0OiA1MDA7CglwYWRkaW5nOiAyMHB4OwoJdGV4dC1hbGlnbjogY2VudGVyOwoJYm9yZGVyLXJhZGl1czogM3B4IDNweCAwIDA7Cn0KCi5hbGVydCBhIHsKCWNvbG9yOiAjZmZmOwoJdGV4dC1kZWNvcmF0aW9uOiBub25lOwoJZm9udC13ZWlnaHQ6IDUwMDsKCWZvbnQtc2l6ZTogMTZweDsKfQoKLmFsZXJ0LmFsZXJ0LXdhcm5pbmcgewoJYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDsKfQoKLmFsZXJ0LmFsZXJ0LWJhZCB7CgliYWNrZ3JvdW5kLWNvbG9yOiAjRDAwMjFCOwp9CgouYWxlcnQuYWxlcnQtZ29vZCB7CgliYWNrZ3JvdW5kLWNvbG9yOiAjNjhCOTBGOwp9CgouaW52b2ljZSB7CgltYXJnaW46IDQwcHggYXV0bzsKCXRleHQtYWxpZ246IGxlZnQ7Cgl3aWR0aDogODAlOwp9CgouaW52b2ljZSB0ZCB7CglwYWRkaW5nOiA1cHggMDsKfQoKLmludm9pY2UgLmludm9pY2UtaXRlbXMgewoJd2lkdGg6IDEwMCU7Cn0KCi5pbnZvaWNlIC5pbnZvaWNlLWl0ZW1zIHRkIHsKCWJvcmRlci10b3A6ICNlZWUgMXB4IHNvbGlkOwp9CgouaW52b2ljZSAuaW52b2ljZS1pdGVtcyAudG90YWwgdGQgewoJYm9yZGVyLXRvcDogMnB4IHNvbGlkICMzMzM7Cglib3JkZXItYm90dG9tOiAycHggc29saWQgIzMzMzsKCWZvbnQtd2VpZ2h0OiA3MDA7Cn0KCkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjQwcHgpIHsKCWJvZHkgewoJCXBhZGRpbmc6IDAgIWltcG9ydGFudDsKCX0KCWgxLCBoMiwgaDMsIGg0IHsKCQlmb250LXdlaWdodDogODAwICFpbXBvcnRhbnQ7CgkJbWFyZ2luOiAyMHB4IDAgNXB4ICFpbXBvcnRhbnQ7Cgl9CgloMSB7CgkJZm9udC1zaXplOiAyMnB4ICFpbXBvcnRhbnQ7Cgl9CgloMiB7CgkJZm9udC1zaXplOiAxOHB4ICFpbXBvcnRhbnQ7Cgl9CgloMyB7CgkJZm9udC1zaXplOiAxNnB4ICFpbXBvcnRhbnQ7Cgl9CgkuY29udGFpbmVyIHsKCQlwYWRkaW5nOiAwICFpbXBvcnRhbnQ7CgkJd2lkdGg6IDEwMCUgIWltcG9ydGFudDsKCX0KCS5jb250ZW50IHsKCQlwYWRkaW5nOiAwICFpbXBvcnRhbnQ7Cgl9CgkuY29udGVudC13cmFwIHsKCQlwYWRkaW5nOiAxMHB4ICFpbXBvcnRhbnQ7Cgl9CgkuaW52b2ljZSB7CgkJd2lkdGg6IDEwMCUgIWltcG9ydGFudDsKCX0KfQo8L3N0eWxlPgo8L2hlYWQ+Cjxib2R5IGl0ZW10eXBlPSJodHRwOi8vc2NoZW1hLm9yZy9FbWFpbE1lc3NhZ2UiPgoKCgk8dGFibGUgY2xhc3M9ImJvZHktd3JhcCI+CgkJPHRyPgoJCQk8dGQ+PC90ZD4KCQkJPHRkIGNsYXNzPSJjb250YWluZXIiIHdpZHRoPSI2MDAiPgoJCQkJPGRpdiBjbGFzcz0iY29udGVudCI+CgkJCQkJPHRhYmxlIGNsYXNzPSJtYWluIiB3aWR0aD0iMTAwJSIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIj4KCQkJCQkJPHRyPgoJCQkJCQkJPHRkIGFsaWduPSJjZW50ZXIiIGJnY29sb3I9IiNGRkZGRkYiPjxpbWcgdGg6YXR0cj0ic3JjPSR7J2NpZDpvd2EtY29udGVudC9pbWFnZXMvSVBIT05FLmpwZyd9IiAvPjwvdGQ+CgkJCQkJCTwvdHI+CgkJCQkJPC90YWJsZT4KCQkJCTwvZGl2PgoJCQk8L3RkPgoJCQk8dGQ+PC90ZD4KCQk8L3RyPgoJPC90YWJsZT4KCjwvYm9keT4KPC9odG1sPg=="}}';
            let res = JSON.parse(resStr);
            */
            setTableCollapse(true);
            setTemplateData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onUpdateTemplate = async req => {
        req.branchName = branchNameRef.current.val();
        req.templateType = templateTypeVal?.value?.toUpperCase();
        let templateName = templateVal?.value;
        templateName = templateName.split("/").pop();
        console.log({ req, templateName });

        try {
            let res = await Api.root.put(`/template/${templateName}`, req);
            ToastUtil.success("Update successful");
            return "success";
        } catch (error) {
            ToastUtil.error("Update failed");
            throw error;
        }
    };

    const columns = [
        {
            accessor: "name",
            header: "NAME"
        },
        {
            accessor: "path",
            header: "PATH"
        },
        {
            accessor: "",
            header: "",
            cell: row => {
                return (
                    <div className="text-right">
                        <UncontrolledDropdown>
                            <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#"
                                role="button"
                                size="sm"
                                color=""
                                onClick={e => e.preventDefault()}
                            >
                                <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem
                                    href="#pablo"
                                    onClick={e => {
                                        e.preventDefault();
                                        setTemplateVal(row);
                                        setTimeout(() => {
                                            fetchTemplate();
                                        }, 200);
                                    }}
                                >
                                    Edit
                                </DropdownItem>
                                {/* <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                    Delete
                                </DropdownItem> */}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                );
            }
        }
    ];

    return (
        <ContentWrapper>
            <Row>
                <Col className="order-xl-1" xl="12">
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">View Templates</h3>
                                </Col>
                                <Col className="text-right" xs="4"></Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <h6 className="heading-small text-muted mb-3">Gitlab details</h6>
                                <p>&#62;&#62; https://gitlab.com/almullagroup/amx/promotion.git</p>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="3">
                                            <FormField
                                                ref={branchNameRef}
                                                controlled={true}
                                                type={"text"}
                                                label={"Branch Name"}
                                                value={"fs-template-editor"}
                                                onChange={newVal => {}}
                                                disabled={true}
                                            />
                                        </Col>
                                        <Col lg="3">
                                            <FormField
                                                ref={templateTypeRef}
                                                controlled={true}
                                                type={"select"}
                                                label={"Template type"}
                                                value={templateTypeVal}
                                                onChange={newVal => {
                                                    setTemplateOpts([]);
                                                    setTemplateVal("");
                                                    setTemplateTypeVal(newVal);
                                                }}
                                                options={templateTypeOpts}
                                            />
                                        </Col>
                                        {templateOpts?.length ? (
                                            <Col lg="3">
                                                <FormField
                                                    ref={templateRef}
                                                    controlled={true}
                                                    type={"select"}
                                                    label={"Template"}
                                                    value={templateVal}
                                                    onChange={newVal => setTemplateVal(newVal)}
                                                    options={templateOpts}
                                                />
                                            </Col>
                                        ) : null}
                                        <Col>
                                            <FormGroup style={{ marginTop: "30px" }}>
                                                <Button
                                                    color="primary"
                                                    onClick={e =>
                                                        loading
                                                            ? () => {}
                                                            : templateOpts?.length
                                                            ? fetchTemplate()
                                                            : fetchTemplates()
                                                    }
                                                    size="md"
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
                            {templateData ? (
                                <Row className="mt-4">
                                    <div className="col">
                                        <EditorWrapper
                                            title={`Editor`}
                                            data={templateData}
                                            onUpdate={onUpdateTemplate}
                                            collapse={editorCollapse}
                                            setCollapse={setEditorCollapse}
                                        />
                                    </div>
                                </Row>
                            ) : null}
                            {/* Table */}
                            {templateOpts?.length ? (
                                <Row className="mt-4">
                                    <div className="col">
                                        <DataTable
                                            title={`${templateTypeVal?.label?.toUpperCase() || ""} Templates Info`}
                                            columns={columns}
                                            data={templateOpts}
                                            collapse={tableCollapse}
                                            setCollapse={setTableCollapse}
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

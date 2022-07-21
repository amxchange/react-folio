import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useEffect } from "react";

const getCompletionItem = ({ path, key, value, kind, range }) => ({
    label: path,
    kind,
    documentation: `${path} = ${JSON.stringify(value)}`,
    insertText: key,
    range
});

const convertObjectIntoArrayOfKeys = (obj, rootKey, kind, range) => {
    let arr = [];
    for (const key in obj) {
        const value = obj[key];
        let type = Object.prototype.toString.call(value);
        let path = `${rootKey ? rootKey + "." : ""}${key}`;
        if (type === "[object Object]") {
            let subArr = convertObjectIntoArrayOfKeys(value, path, kind, range);
            arr = arr.concat(subArr);
        } else {
            arr.push(getCompletionItem({ path, key, value, kind, range }));
        }
    }
    return arr;
};

const MonacoEditor = props => {
    const { theme, language, value, setValue, completetionItemsJsonStr } = props;

    const editorRef = useRef(null);
    const monacoRef = useRef(null);

    useEffect(() => {
        if (completetionItemsJsonStr) {
            let completetionItemsObj = JSON.parse(completetionItemsJsonStr);
            console.log("registering completion items", completetionItemsObj);

            monacoRef.current.languages.registerCompletionItemProvider("html", {
                triggerCharacters: ["."],
                provideCompletionItems: function (model, position) {
                    var textUntilPosition = model.getValueInRange({
                        startLineNumber: position.lineNumber,
                        startColumn: 1,
                        endLineNumber: position.lineNumber,
                        endColumn: position.column
                    });
                    var match = textUntilPosition.match(/\$\{data.[\w.]*$/);
                    if (!match) {
                        return {
                            suggestions: []
                        };
                    }
                    var word = model.getWordUntilPosition(position);
                    var range = {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn
                    };
                    let suggestionKind = monacoRef.current.languages.CompletionItemKind.Function;
                    let suggestions = convertObjectIntoArrayOfKeys(completetionItemsObj, null, suggestionKind, range);
                    return {
                        suggestions
                    };
                }
            });
        }
    }, [completetionItemsJsonStr]);

    function handleEditorWillMount(monaco) {
        console.log("beforeMount: the monaco instance:", monaco);
    }

    function handleEditorDidMount(editor, monaco) {
        console.log("onMount: the editor instance:", editor);
        console.log("onMount: the monaco instance:", monaco);

        editorRef.current = editor;
        monacoRef.current = monaco;
    }

    function handleEditorChange(newValue, event) {
        setValue(newValue);
    }

    function handleEditorValidation(markers) {
        // model markers
        markers.forEach(marker => console.log("onValidate:", marker.message));
    }

    return (
        <Editor
            theme={theme}
            beforeMount={handleEditorWillMount}
            onMount={handleEditorDidMount}
            language={language}
            value={value}
            onChange={handleEditorChange}
            onValidate={handleEditorValidation}
            options={{}}
        />
    );
};

export default MonacoEditor;

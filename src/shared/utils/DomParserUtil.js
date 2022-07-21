export function toJSON(node) {
    let propFix = { for: "htmlFor", class: "className" };
    let specialGetters = {};
    let attrDefaultValues = {};
    let obj = {
        nodeType: node.nodeType
    };
    if (node.tagName) {
        obj.tagName = node.tagName.toLowerCase();
    } else if (node.nodeName) {
        obj.nodeName = node.nodeName;
    }
    if (node.nodeValue) {
        obj.nodeValue = node.nodeValue;
    }
    let attrs = node.attributes;
    if (attrs) {
        let defaultValues = new Map();
        for (let i = 0; i < attrs.length; i++) {
            let name = attrs[i].nodeName;
            let value = attrs[i].nodeValue;
            defaultValues.set(name, attrDefaultValues.hasOwnProperty(name) ? attrDefaultValues[name] : value);
        }

        // Add some special cases that might not be included by enumerating
        // attributes above. Note: this list is probably not exhaustive.
        switch (obj.tagName) {
            case "input": {
                if (node.type === "checkbox" || node.type === "radio") {
                    defaultValues.set("checked", false);
                } else if (node.type !== "file") {
                    // Don't store the value for a file input.
                    defaultValues.set("value", "");
                }
                break;
            }
            // case "option": {
            //     defaultValues.set("selected", false);
            //     break;
            // }
            case "textarea": {
                defaultValues.set("value", "");
                break;
            }
        }

        let arr = [];
        for (let [name, defaultValue] of defaultValues) {
            let propName = propFix[name] || name;
            let specialGetter = specialGetters[propName];
            let value = specialGetter ? specialGetter(node) : defaultValue;
            arr.push([name, value]);
        }

        if (arr.length) {
            obj.attributes = arr;
        }
    }
    let childNodes = node.childNodes;
    // Don't process children for a textarea since we used `value` above.
    if (obj.tagName !== "textarea" && childNodes && childNodes.length) {
        let arr = (obj.childNodes = []);
        for (let i = 0; i < childNodes.length; i++) {
            arr[i] = toJSON(childNodes[i]);
        }
    }
    return obj;
}

export function toDOM(input) {
    let obj = typeof input === "string" ? JSON.parse(input) : input;
    let propFix = { for: "htmlFor", class: "className" };
    let node;
    let nodeType = obj.nodeType;
    switch (nodeType) {
        // ELEMENT_NODE
        case 1: {
            node = document.createElement(obj.tagName);
            if (obj.attributes) {
                for (let [attrName, value] of obj.attributes) {
                    let propName = propFix[attrName] || attrName;
                    // Note: this will throw if setting the value of an input[type=file]
                    // node[propName] = value;
                    node.setAttribute(propName, value);
                }
            }
            break;
        }
        // TEXT_NODE
        case 3: {
            return document.createTextNode(obj.nodeValue);
        }
        // COMMENT_NODE
        case 8: {
            return document.createComment(obj.nodeValue);
        }
        // DOCUMENT_FRAGMENT_NODE
        case 11: {
            node = document.createDocumentFragment();
            break;
        }
        default: {
            // Default to an empty fragment node.
            return document.createDocumentFragment();
        }
    }
    if (obj.childNodes && obj.childNodes.length) {
        for (let childNode of obj.childNodes) {
            node.appendChild(toDOM(childNode));
        }
    }
    return node;
}

export function convertStringToNode(str) {
    let tmp = new DOMParser().parseFromString(str, "text/xml");
    return tmp.childNodes[0];
}

export function convertNodeToString(node) {
    var tmp = document.createElement("div");
    tmp.appendChild(node);
    return tmp.innerHTML;
}

export function maskThymeleafExpressions(str) {
    let th_expressions = str.match(/th:\w*="\w*"/g);
    let value_without_th_expressions = str;
    th_expressions?.map((el, i) => {
        value_without_th_expressions = value_without_th_expressions.replace(
            el,
            `data-th-${i}="${el.replaceAll('"', "'")}"`
        );
    });
    return value_without_th_expressions;
}

export function unmaskThymeleafExpressions(str) {
    let masked_th_expressions = str.match(/data-th-\d*="th:\w*='\w*'"/g);
    let value_with_th_expressions = str;
    masked_th_expressions?.map((el, i) => {
        let tempArr = el.split("=");
        tempArr.shift();
        let th_expression = tempArr.join("=").slice(1, -1);
        value_with_th_expressions = value_with_th_expressions.replace(el, `${th_expression}`);
    });
    return value_with_th_expressions;
}

// Usage -
// let dom_str = `<div class="glide af asdf" id="glide_1" style='width: 100px;' data-glide-el="track" aria-label="asdf">
//         <Text class="glide__track" data-glide-el="track">
//             <div class="hero__center">
//                 <div class="hero__left">
//                     <span class="">New Inspiration 2020</span>
//                     <label for="cars">Choose a car:</label>
//                     <select name="cars" id="cars">
//                     <option value="volvo">Volvo</option>
//                     <option  selected="true" value="saab">Saab</option>
//                     <option value="mercedes">Mercedes</option>
//                     <option value="audi">Audi</option>
//                     </select>
//                 </div>
//                 <div class="hero__right">
//                     <div class="hero__img-container">
//                         <img class="banner_01" src="./images/banner_01.jpg" alt="banner2" />
//                     </div>
//                 </div>
//             </div>
//         </Text>
//     </div>`;

// let dom = convertStringToNode(dom_str);
// let dom_json = toJSON(dom);

// let dom_again = toDOM(dom_json);
// let dom_str_again = convertNodeToString(dom_again);

// console.log("Parsing results ", { dom_str, dom, dom_json, dom_again, dom_str_again });

/*
    reference - https://gist.github.com/sstur/7379870

    function toJSON(node) {
        let propFix = { for: "htmlFor", class: "className" };
        let specialGetters = {
            style: node => node.style.cssText
        };
        let attrDefaultValues = { style: "" };
        let obj = {
            nodeType: node.nodeType
        };
        if (node.tagName) {
            obj.tagName = node.tagName.toLowerCase();
        } else if (node.nodeName) {
            obj.nodeName = node.nodeName;
        }
        if (node.nodeValue) {
            obj.nodeValue = node.nodeValue;
        }
        let attrs = node.attributes;
        if (attrs) {
            let defaultValues = new Map();
            for (let i = 0; i < attrs.length; i++) {
                let name = attrs[i].nodeName;
                defaultValues.set(name, attrDefaultValues[name]);
            }
            // Add some special cases that might not be included by enumerating
            // attributes above. Note: this list is probably not exhaustive.
            switch (obj.tagName) {
                case "input": {
                    if (node.type === "checkbox" || node.type === "radio") {
                        defaultValues.set("checked", false);
                    } else if (node.type !== "file") {
                        // Don't store the value for a file input.
                        defaultValues.set("value", "");
                    }
                    break;
                }
                case "option": {
                    defaultValues.set("selected", false);
                    break;
                }
                case "textarea": {
                    defaultValues.set("value", "");
                    break;
                }
            }
            let arr = [];
            for (let [name, defaultValue] of defaultValues) {
                let propName = propFix[name] || name;
                let specialGetter = specialGetters[propName];
                let value = specialGetter ? specialGetter(node) : node[propName];
                if (value !== defaultValue) {
                    arr.push([name, value]);
                }
            }
            if (arr.length) {
                obj.attributes = arr;
            }
        }
        let childNodes = node.childNodes;
        // Don't process children for a textarea since we used `value` above.
        if (obj.tagName !== "textarea" && childNodes && childNodes.length) {
            let arr = (obj.childNodes = []);
            for (let i = 0; i < childNodes.length; i++) {
                arr[i] = toJSON(childNodes[i]);
            }
        }
        return obj;
    }

    function toDOM(input) {
        let obj = typeof input === "string" ? JSON.parse(input) : input;
        let propFix = { for: "htmlFor", class: "className" };
        let node;
        let nodeType = obj.nodeType;
        switch (nodeType) {
            // ELEMENT_NODE
            case 1: {
                node = document.createElement(obj.tagName);
                if (obj.attributes) {
                    for (let [attrName, value] of obj.attributes) {
                        let propName = propFix[attrName] || attrName;
                        // Note: this will throw if setting the value of an input[type=file]
                        node[propName] = value;
                    }
                }
                break;
            }
            // TEXT_NODE
            case 3: {
                return document.createTextNode(obj.nodeValue);
            }
            // COMMENT_NODE
            case 8: {
                return document.createComment(obj.nodeValue);
            }
            // DOCUMENT_FRAGMENT_NODE
            case 11: {
                node = document.createDocumentFragment();
                break;
            }
            default: {
                // Default to an empty fragment node.
                return document.createDocumentFragment();
            }
        }
        if (obj.childNodes && obj.childNodes.length) {
            for (let childNode of obj.childNodes) {
                node.appendChild(toDOM(childNode));
            }
        }
        return node;
    }
*/

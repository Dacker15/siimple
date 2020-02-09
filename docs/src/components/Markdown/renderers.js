import React from "react";
import {If} from "@siimple/neutrine";
import {Heading, Paragraph, Blockquote} from "@siimple/neutrine";
import {Code, Pre} from "@siimple/neutrine";
import {Tip, Link, Rule} from "@siimple/neutrine";
import {Table, TableRow, TableCell} from "@siimple/neutrine";

import {redirect} from "../../utils.js";

//Generate a simple renderer
let simpleRenderer = function (tag) {
    return function (props) {
        return React.createElement(tag, {"key": props.key}, props.children);
    };
};

//Tip blocks levels
let tipLevels = {
    "info": {"color": "primary", "icon": "info"},
    "error": {"color": "error", "icon": "cross"},
    "warning": {"color": "warning", "icon": "exclamation"},
    "success": {"color": "success", "icon": "check"}
};

//Tip renderer
let tipRenderer = function (props) {
    let level = tipLevels[props.level];
    return (
        <Tip color={level.color} icon={level.icon} key={props.key}>
            <If condition={props.title.trim() !== ""}>
                <Heading type="h6">{props.title}</Heading>
            </If>
            <div>{props.children}</div>
        </Tip>
    );
};

//Export renderers
export const renderers = {
    "tip": tipRenderer,
    "heading": function (props) {
        return React.createElement(Heading, {
            "type": "h" + props.level,
            "key": props.key
        }, props.children);
    },
    "blockquote": function (props) {
        return React.createElement(Blockquote, {
            "key": props.key
        }, props.children);
    },
    "paragraph": function (props) {
        return React.createElement(Paragraph, {
            "key": props.key
        }, props.children);
    },
    "link": function (props) {
        return React.createElement(Link, {
            "onClick": function () {
                return redirect(props.href);
            },
            "key": props.key
        }, props.children);
    },
    "image": function (props) {
        return React.createElement("img", {
            "alt": props.alt,
            "src": props.src,
            "key": props.key
        });
    },
    "code": function (props) {
        return React.createElement(Pre, {
            "key": props.key
        }, props.value.join("\n"));
    },
    "inlineCode": function (props) {
        return React.createElement(Code, {
            "key": props.key
        }, props.value);
    },
    "html": function (props) {
        return React.createElement("div", {
            "dangerouslySetInnerHTML": {
                "__html": props.value.join("\n")
            },
            "key": props.key
        });
    },
    "text": function (props) {
        return props.value; //Return the text content
    },
    "strong": simpleRenderer("strong"),
    "emphasis": simpleRenderer("em"),
    "divider": simpleRenderer(Rule),
    "table": simpleRenderer(Table),
    "tableHeader": simpleRenderer(TableRow), //TODO
    "tableRow": simpleRenderer(TableRow),
    "tableCell": simpleRenderer(TableCell)
};


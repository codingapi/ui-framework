import {FormRule} from "./types";
import React from "react";

interface RuleMatcher {
    rules?: FormRule[];
    required?: boolean;
    label?: React.ReactNode;
}

export const loadRules = (props: RuleMatcher) => {
    if (props.rules && props.rules.length > 0) {
        return props.rules;
    }
    if (props.required) {
        if(typeof props.label === 'string') {
            return [
                {
                    required: true,
                    message: props.label ? `${props.label}不能为空` : "该字段不能为空"
                }
            ]
        }
    }
    return [];
}

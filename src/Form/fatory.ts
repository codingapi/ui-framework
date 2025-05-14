import React from "react";
import {FormField, FormItemProps} from "./types";

export class FormFactory {
    private readonly items = new Map<string, React.ComponentType<FormItemProps>>;

    private constructor() {

    }

    private static instance = new FormFactory();

    public static getInstance() {
        return this.instance;
    }

    public addItem(type: string, item: React.ComponentType<FormItemProps>): void {
        this.items.set(type, item);
    }

    public getItem(type: string): React.ComponentType<FormItemProps> | undefined {
        return this.items.get(type);
    }

    public create(filed:FormField){
        const type = filed.type;
        const props = filed.props;

        const item = this.getItem(type);
        if (item) {
            return React.createElement(item, {
                ...props,
                key: props.name as string
            });
        }
        return null;
    }

}

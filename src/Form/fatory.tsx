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

    public setItem(type: string, item: React.ComponentType<FormItemProps>): void {
        this.items.set(type, item);
    }

    public getItem(type: string): React.ComponentType<FormItemProps> | undefined {
        return this.items.get(type);
    }

    public removeItem(type: string): void {
        this.items.delete(type);
    }

    public create(field:FormField){
        const type = field.type;
        const props = field.props;

        const FormItem = this.getItem(type);
        if (FormItem) {
            return (
                <FormItem
                    {...props}
                    key={props.name as string}
                />
            )
        }
        return null;
    }

}

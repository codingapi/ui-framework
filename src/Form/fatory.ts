import React from "react";
import {FormItemProps} from "./types";

export class FormFactory {
    private readonly items = new Map<string, React.Component<FormItemProps>>;

    private constructor() {

    }

    private static instance = new FormFactory();

    public static getInstance() {
        return this.instance;
    }

    public addItem(type: string, item: React.Component<FormItemProps>): void {
        this.items.set(type, item);
    }

    public getItem(type: string): React.Component<FormItemProps> | undefined {
        return this.items.get(type);
    }

}

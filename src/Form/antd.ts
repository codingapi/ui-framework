import {FiledData, NamePath} from "./types";

export interface AntdFormInstance {
    submit: () => void;

    getFieldValue(name: NamePath): any;

    getFieldsValue(): any;

    setFieldValue(name: NamePath, value: any): void;

    setFieldsValue(values: any): void;

    setFields(fields: FiledData[]): void;

    resetFields(): void;
}

interface AntdFormHolder {
    useForm(): AntdFormInstance;
}

export class AntdForm {
    private formHolder: AntdFormHolder | undefined;

    private static instance: AntdForm = new AntdForm();

    private constructor() {
    }

    public static getInstance = (): AntdForm => {
        return AntdForm.instance;
    }

    public registerForm = (formHolder: AntdFormHolder) => {
        this.formHolder = formHolder;
    }

    useForm = (): AntdFormInstance | undefined => {
        return this.formHolder?.useForm();
    }
}

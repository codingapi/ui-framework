import {FormFieldOptionListenerContext, FormFieldReloadListenerContext} from "./listener";
import {FiledData, FormAction, FormField, NamePath} from "./types";
import React from "react";
import {AntdForm, AntdFormInstance} from "./antd";

export class FormInstance {
    // 重新加载上下文
    private readonly reloadContext: FormFieldReloadListenerContext;
    // 选项重新加载上下文
    private readonly optionContext: FormFieldOptionListenerContext;
    // 表单实例
    private readonly formInstance: AntdFormInstance | undefined;
    // 表单操作对象
    private readonly formAction: FormAction;
    // 动态表单字段
    private fields: FormField[];
    // 表单字段组件
    private formFields: FormField[];
    // 表单字段更新函数
    private fieldsUpdateDispatch: React.Dispatch<React.SetStateAction<FormField[]>> | undefined;

    /**
     * 表单字段更新函数
     * @param fieldsUpdateDispatch
     */
    public setFieldsUpdateDispatch = (fieldsUpdateDispatch: React.Dispatch<React.SetStateAction<FormField[]>>) => {
        this.fieldsUpdateDispatch = fieldsUpdateDispatch;
    }

    /**
     * 更新表单字段
     * @param resetFields
     */
    private updateFields = (resetFields: (prevState: FormField[]) => FormField[]) => {
        this.fields = resetFields(this.fields);
        if (this.fieldsUpdateDispatch) {
            this.fieldsUpdateDispatch(resetFields);
        }
    }

    /**
     * 添加表单字段
     * @param field
     */
    public addFormField = (field: FormField) => {
        const formFieldNames = this.formFields.map((item) => item.props.name);
        if (formFieldNames.indexOf(field.props.name) === -1) {
            this.formFields.push(field);
        }
    }

    private namePathEqual = (name1: NamePath, name2: NamePath) => {
        if (Array.isArray(name1) && Array.isArray(name2)) {
            if (name1.length !== name2.length) {
                return false;
            }
            for (let i = 0; i < name1.length; i++) {
                if (name1[i] !== name2[i]) {
                    return false;
                }
            }
            return true;
        }
        return name1 === name2;
    }

    public submit = () => {
        this.formInstance?.validateFields().then((result) => {
            this.formInstance?.submit();
        }).catch((err) => {
            console.error('Form validation failed:', err);
        });
    }

    public reset = (values?: any) => {
        this.formInstance?.resetFields();
        if (values) {
            this.formInstance?.setFieldsValue(values);
            this.reloadContext.notifyAll();
        }
    }

    public hidden = (name: NamePath) => {
        if (this.fields.length == 0) {
            return;
        }
        this.updateFields(prevFields => prevFields.map((field) => {
            if (field.props.name && this.namePathEqual(field.props.name, name)) {
                return {
                    ...field,
                    props: {
                        ...field.props,
                        hidden: true,
                        required: false
                    }
                }
            }
            return field;
        }));
    }

    public required = (name: NamePath, required: boolean) => {
        if (this.fields.length == 0) {
            return;
        }
        this.updateFields(prevFields => prevFields.map((field) => {
            if (field.props.name && this.namePathEqual(field.props.name, name)) {
                return {
                    ...field,
                    props: {
                        ...field.props,
                        required: required
                    }
                }
            }
            return field;
        }));
    }

    public show = (name: NamePath) => {
        if (this.fields.length == 0) {
            return;
        }
        this.updateFields(prevFields => prevFields.map((field) => {
            if (field.props.name && this.namePathEqual(field.props.name, name)) {
                return {
                    ...field,
                    props: {
                        ...field.props,
                        hidden: false
                    }
                }
            }
            return field;
        }));
    }

    public disable = (name: NamePath) => {
        if (this.fields.length == 0) {
            return;
        }
        this.updateFields(prevFields => prevFields.map((field) => {
            if (field.props.name && this.namePathEqual(field.props.name, name)) {
                return {
                    ...field,
                    props: {
                        ...field.props,
                        disabled: true
                    }
                }
            }
            return field;
        }));
    }

    public disableAll = () => {
        if (this.fields.length == 0) {
            return;
        }
        this.updateFields(prevFields => prevFields.map((field) => {
            return {
                ...field,
                props: {
                    ...field.props,
                    disabled: true
                }
            }
        }));
    }

    public enable = (name: NamePath) => {
        if (this.fields.length == 0) {
            return;
        }
        this.updateFields(prevFields => prevFields.map((field) => {
            if (field.props.name && this.namePathEqual(field.props.name, name)) {
                return {
                    ...field,
                    props: {
                        ...field.props,
                        disabled: false
                    }
                }
            }
            return field;
        }));
    }

    public enableAll = () => {
        if (this.fields.length == 0) {
            return;
        }
        this.updateFields(prevFields => prevFields.map((field) => {
            return {
                ...field,
                props: {
                    ...field.props,
                    disabled: false
                }
            }
        }));
    }

    public remove = (name: NamePath) => {
        if (this.fields.length == 0) {
            return;
        }
        this.updateFields(prevFields => prevFields.filter((field) => !(field.props.name && this.namePathEqual(field.props.name, name))));
    }

    public create = (field: FormField, index?: number) => {
        if (this.fields.length == 0) {
            return;
        }
        this.updateFields(prevFields => {
            const filteredFields = prevFields.filter((item) => item.props.name !== field.props.name);
            if (index === undefined || index < 0) {
                return [...filteredFields, field];
            } else {
                const newFields = [...filteredFields];
                newFields.splice(index, 0, field);
                return newFields;
            }
        });
    }

    public getFieldValue = (name: NamePath) => {
        return this.formInstance?.getFieldValue(name);
    }

    public getFieldsValue = () => {
        return this.formInstance?.getFieldsValue();
    }


    /**
     * 获取Form表单字段
     * @param name
     */
    public getFormFieldProps = (name: NamePath) => {
        for (const field of this.formFields) {
            if (field.props.name && this.namePathEqual(field.props.name, name)) {
                return field;
            }
        }
        return null;
    }

    /**
     * 获取动态表单字段
     * @param name
     */
    public getFieldProps = (name: NamePath) => {
        for (const field of this.fields) {
            if (field.props.name && this.namePathEqual(field.props.name, name)) {
                return field;
            }
        }
        return null;
    }

    public reloadOptions = (name: NamePath) => {
        this.optionContext.notify(name);
    }

    public reloadAllOptions = () => {
        this.optionContext.notifyAll();
    }

    public setFieldValue = (name: NamePath, value: any) => {
        this.formInstance?.setFieldValue(name, value);
        this.reloadContext.notify(name);
    }

    public setFieldsValue = (values: any) => {
        this.formInstance?.setFieldsValue(values);
        this.reloadContext.notifyAll();
    }

    public setFields = (fields: FiledData[]) => {
        this.formInstance?.setFields(fields);
    }

    public validate = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            this.formInstance?.validateFields()
                .then(result => {
                    resolve(true);
                })
                .catch(error => {
                    resolve(false);
                });
        });
    }

    public resetFields = (fields: FormField[]) => {
        this.fields = fields;
    }

    constructor() {
        this.reloadContext = new FormFieldReloadListenerContext();
        this.optionContext = new FormFieldOptionListenerContext();
        this.formInstance = AntdForm.getInstance().useForm();
        this.fields = [];
        this.formFields = [];
        this.formAction = {
            submit: this.submit,
            reset: this.reset,
            hidden: this.hidden,
            show: this.show,
            remove: this.remove,
            create: this.create,
            disable: this.disable,
            disableAll: this.disableAll,
            enable: this.enable,
            enableAll: this.enableAll,
            required: this.required,
            getFieldValue: this.getFieldValue,
            getFieldsValue: this.getFieldsValue,
            getFieldProps: this.getFieldProps,
            reloadOptions: this.reloadOptions,
            reloadAllOptions: this.reloadAllOptions,
            setFieldValue: this.setFieldValue,
            setFieldsValue: this.setFieldsValue,
            setFields: this.setFields,
            validate: this.validate,
        }
    }

    public getFormAction = () => {
        return this.formAction;
    }

    public getFormFieldReloadListenerContext = () => {
        return this.reloadContext;
    }

    public getFormFieldOptionListenerContext = () => {
        return this.optionContext;
    }

    public getFormControlInstance = (): AntdFormInstance | undefined => {
        return this.formInstance;
    }

}


import React from "react";
import {FormInstance} from "./instance";
import {FormValidateContent} from "./validate";


export type NamePath =  string | number | boolean | (string | number | boolean)[];


export interface FiledData {
    name: NamePath;
    errors?: string[];
}

export interface FormAction {
    // 提交表单，提取之前会先校验表单
    submit: () => void;
    // 重置表单，恢复表单项最初的状态
    reset: (values?: any) => void;
    // 隐藏表单项，隐藏后的表单项不会显示在表单中，但是值会被提交
    hidden: (name: NamePath) => void;
    // 展示表单项，展示后的表单项会显示在表单中，值也会被提交
    show: (name: NamePath) => void;
    // 删除表单项，删除后的表单项不会显示在表单中，值也不会被提交，在fields配置的情况下生效
    remove: (name: NamePath) => void;
    // 添加表单项，添加后的表单项会显示在表单中，值也会被提交，在fields配置的情况下生效
    create: (field: FormField, index?: number) => void;
    // 禁用表单项，禁用后的表单项还会被提交
    disable: (name: NamePath) => void;
    // 全部禁用，禁用后的表单项还会被提交
    disableAll: () => void;
    // 启用表单项，启用后的表单项还会被提交
    enable: (name: NamePath) => void;
    // 全部启用，启用后的表单项还会被提交
    enableAll: () => void;
    // 必填选项控制,true为必填false为非必填提示
    required: (name: NamePath, required: boolean) => void;
    // 获取字段的值
    getFieldValue: (name: NamePath) => any;
    // 重新加载选项
    reloadOptions: (name: NamePath) => any;
    // 重新加载所有选项
    reloadAllOptions: () => any;
    // 获取全部字段的值
    getFieldsValue: () => any;
    // 设置字段的值
    setFieldValue: (name: NamePath, value: any) => void;
    // 设置全部字段的值
    setFieldsValue: (values: any) => void;
    // 设置Field字段
    setFields: (fields: FiledData[]) => void;
    // 获取Field属性
    getFieldProps: (name: NamePath) => FormField | null;
    // 校验表单
    validate: () => Promise<boolean>;
}

// 代码编辑器操作对象
export interface CodeEditorAction {
    // 重置编辑器的值
    resetValue: (value: string) => void;
    // 获取选中的值
    getSelectedValue: () => string;
    // 获取编辑器的值
    getValue: () => string;
    // 获取编辑器实例
    getEditor:() => any;
}

// Form表单选项类型
export interface FormOption {
    label: string;
    value: string;
    disable?: boolean;
    children?: FormOption[];
}

// Form表单类型
type FormFieldType =
    "input" | "cascader" | "select" | "password" | "date" |
    "radio" | "textarea" | "checkbox" | "uploader" | "switch" |
    "stepper" | "slider" | "rate" | "selector" | "captcha" |
    "code" | "color";

// FormField
export interface FormField {
    // 表单字段类型
    type: FormFieldType;
    // 表单字段属性
    props: FormItemProps;
}

// 自定义Select组件选项维护视图
export interface SelectOptionFormEditProps {
    // 当前表单操作对象
    currentInstance?: FormInstance;
    // 父级表单操作对象
    formInstance?: FormInstance;
}

// Form表单字段属性
export interface FormItemProps {
    key?:string;
    // 是否隐藏字段
    hidden?: boolean;
    // 是否禁用
    disabled?: boolean;
    // 是否必填,当为true时会自动给rules添加required校验
    required?: boolean;
    // 表单字段名
    name: NamePath;
    // 表单字段标签
    label?: React.ReactNode;
    // 帮助提示信息,出现组件的底部
    help?: string;
    // 字段提示信息，出现在字段上
    tooltip?: string;
    // 组件内的前缀
    prefix?: React.ReactNode;
    // 组件内的后缀
    suffix?: React.ReactNode;
    // 组件前的前缀
    addonBefore?:React.ReactNode;
    // 组件后的后缀
    addonAfter?:React.ReactNode;
    // 表单值
    value?: any;
    // 输入提示
    placeholder?: string;
    // 变更事件
    onChange?: (value: any, form?: FormInstance) => void;
    // 静态选项，对应loadOptions的动态选项，仅限于select、radio等组件有效
    options?: FormOption[],
    // 动态加载选项,仅限于select、radio等组件有效
    loadOptions?: (form?: FormInstance) => Promise<FormOption[]>,
    // 动态校验函数,尽在fields模式下生效
    validateFunction?: (content: FormValidateContent) => Promise<string[]>,

    // 组件的默认属性
    itemProps?:any;

    /** 以下为表单字段的拓展熟悉，非公共属性 **/
    // 单选框方向
    radioDirection?: "vertical" | "horizontal",
    // 多选框方向
    checkboxDirection?: "vertical" | "horizontal",

    // TextArea输入行数
    textAreaRows?: number,
    // TextArea输入框最大值
    textAreaMaxLength?: number,
    // select组件是否支持多选
    selectMultiple?: boolean,
    // select组件添加的视图是否开启编辑
    selectOptionFormEditable?: boolean,
    // select组件添加的视图
    selectOptionFormEditView?: React.ComponentType<SelectOptionFormEditProps>,
    // select组件添加的视图title，默认添加选项
    selectOptionFormEditTitle?: string,
    // select组件添加的视图footer确定按钮文字，默认添加选项
    selectOptionFormEditFooterOkText?: string,
    // select组件添加的视图footer取消按钮文字，默认取消添加
    selectOptionFormEditFooterCancelText?: string,
    // Select组件添加数据事件
    onSelectOptionFormFinish?: (formInstance: FormInstance,
                                selectOptionFormEditFormInstance: FormInstance,
                                reloadOption?: () => void,
                                close?: () => void) => void;

    // 文件上传接受的文件类型，默认为 image/*
    uploaderAccept?: string,
    // 文件上传最大数量
    uploaderMaxCount?: number,
    // input输入框最大值
    inputMaxLength?: number,
    // input输入框类型，默认为text
    inputType?: "text" | "number",
    // date组件的日期格式，默认YYYY-MM-DD
    dateFormat?: string,
    // date组件的精度，默认为day
    datePrecision?: "year" | "month" | "day" | "hour" | "minute" | "second" | "week" | "week-day" | "quarter",
    // switch选择文本
    switchCheckText?: string,
    // switch未选择文本
    switchUnCheckText?: string,
    // stepper组件的最大值
    stepperMaxNumber?: number,
    // stepper组件的最小值
    stepperMinNumber?: number,
    // stepper组件的小数位
    stepperDecimalLength?: number,
    // slider组件的最大值
    sliderMaxNumber?: number,
    // slider组件的最小值
    sliderMinNumber?: number,
    // slider组件的拖动步距
    sliderStep?: number,
    // slider组件实现展示刻度
    sliderTicks?: boolean,
    // slider组件悬浮提示
    sliderPopover?: boolean,
    // slider组件是否双向滑动
    sliderRange?: boolean,
    // slider组件的刻度尺
    sliderMarks?: any,
    // rate的star总数
    rateCount?: number,
    // rate允许半选
    rateAllowHalf?: boolean,
    // selector组件是否多选
    selectorMultiple?: boolean,
    // selector组件每行展示数量
    selectorColumn?: number,
    // code组件的语言，默认为javascript
    codeLanguage?: string,
    // code组件的主题，默认为vs-dark
    codeTheme?: string,
    // code组件的字体大小，默认为14
    codeFontSize?: number,
    // code组件的操作Action
    codeActionRef?: React.RefObject<CodeEditorAction>,
    // code组件的样式
    codeStyle?: React.CSSProperties,
    // code组件的选中运行事件
    onCodeSelectedRun?: (value: string) => void,

    // Captcha组件切换验证码事件
    onCaptchaChange?: (value: string) => void;
    // Captcha组件刷新验证码事件
    onCaptchaRefresh?: () => Promise<{
        // 验证码标志
        code: string;
        // 验证码图片地址
        url: string;
    }|null>;

    // 文件上传事件
    onUploaderUpload?: (filename: string, base64: string) => Promise<{
        // 文件id
        id: string,
        // 文件名
        name: string
        // 文件地址
        url: string;
    }|null>
    // 文件加载事件
    onUploaderLoad?: (ids: string) => Promise<{
        // 文件id
        id: string,
        // 文件名
        name: string
        // 文件地址
        url: string;
    }[]>


}

// Form字段组件刷新控制监听上下文对象
import {NamePath} from "./types";

export class FormFieldReloadListenerContext {

    private readonly map:Map<string,()=>void>;

    constructor() {
        this.map = new Map();
    }

    public addListener(name:NamePath,listener:()=>void){
        const key = Array.isArray(name)?name.join("."):name;
        this.map.set(key as string, listener);
    }


    public notify(name:NamePath){
        const key = Array.isArray(name)?name.join("."):name;
        const listener = this.map.get(key as string);
        if(listener){
            listener();
        }
    }

    public notifyAll(){
        this.map.forEach(listener=>{
            listener();
        })
    }

}

// Form字段组件选项刷新控制监听上下文对象
export class FormFieldOptionListenerContext {

    private readonly map:Map<string,()=>void>;

    constructor() {
        this.map = new Map();
    }

    public addListener(name:NamePath,listener:()=>void){
        const key = Array.isArray(name)?name.join("."):name;
        this.map.set(key as string, listener);
    }


    public notify(name:NamePath){
        const key = Array.isArray(name)?name.join("."):name;
        const listener = this.map.get(key as string);
        if(listener){
            listener();
        }
    }

    public notifyAll(){
        this.map.forEach(listener=>{
            listener();
        })
    }

}


# UI-Framework

一个基于 React 和 TypeScript 构建的 UI 框架。

## 安装

```bash
npm install @codingapi/ui-framework
# 或者使用 yarn
yarn add @codingapi/ui-framework
```

## 使用

### 组件总线

```javascript
import React from "react";
import Space from "@/components/Space";
import {ComponentBus} from "@codingapi/ui-framework";


const MyComponent = () => {
    return (
        <div>
            my component
        </div>
    )
}

const ComponentBusTest = () => {

    const [pageVersion, setPageVersion] = React.useState(0);
    const COMPONENT_KEY = 'MyComponent';

    const MyComponentContent = ComponentBus.getInstance().getComponent(COMPONENT_KEY);

    const handlerAddComponent = () => {
        ComponentBus.getInstance().registerComponent(COMPONENT_KEY, MyComponent);
        setPageVersion(Math.random());
    }

    const handlerRemoveComponent = () => {
        ComponentBus.getInstance().removeComponent(COMPONENT_KEY);
        setPageVersion(Math.random());
    }

    return (
        <>
            <div
                style={{
                    textAlign: 'center'
                }}
            >
                <h1>ComponentBus Test </h1>
            </div>

            <Space>
                Component:
                {MyComponentContent && (
                    <MyComponentContent/>
                )}
                <button onClick={handlerAddComponent}>add component</button>

                <button onClick={handlerRemoveComponent}>remove component</button>
            </Space>

        </>
    )
}

export default ComponentBusTest;
```

### 事件总线使用

```javascript
import React from "react";
import Space from "@/components/Space";
import {EventBus} from "@codingapi/ui-framework";

const EventBusTest = () => {

    const handlerAddEvent = () => {
        EventBus.getInstance().on('test', (data: any) => {
            alert(data);
        });
    }

    const handlerRemoveEvent = () => {
        EventBus.getInstance().off('test');
    }

    const handlerEmitEvent = () => {
        EventBus.getInstance().emit('test', 'test event');
    }


    return (
        <>
            <div
                style={{
                    textAlign: 'center'
                }}
            >
                <h1>EventBus Test </h1>
            </div>

            <Space>
                <button onClick={handlerAddEvent}>add event</button>

                <button onClick={handlerEmitEvent}>emit event</button>

                <button onClick={handlerRemoveEvent}>remove event</button>
            </Space>
        </>
    )
}

export default EventBusTest;
```

### 访问控制

```javascript
import React from "react";
import {Access} from "@codingapi/ui-framework";
import Space from "./Space";

const AccessTest = () => {

    const [pageVersion, setPageVersion] = React.useState(Math.random());
    const handlerAddRole = (role: string) => {
        const authorities = localStorage.getItem('authorities');
        localStorage.setItem('authorities', JSON.stringify([...(authorities ? JSON.parse(authorities) : []), role]));
        setPageVersion(Math.random());
    }

    const handlerRemoveRole = (role: string) => {
        const authorities = localStorage.getItem('authorities') || '[]';
        localStorage.setItem('authorities', JSON.stringify(JSON.parse(authorities).filter((item: string) => item !== role)));
        setPageVersion(Math.random());
    }

    const handlerRemoveAllRole = () => {
        localStorage.removeItem('authorities');
        setPageVersion(Math.random());
    }

    return (
        <>
            <div
                style={{
                    textAlign: 'center'
                }}
            >
                <h1>Access Role Test </h1>
            </div>
            <Space>
                hasRoles['admin']：
                <Access hasRoles={['admin']}>
                    <div>has admin role</div>
                </Access>

                <button onClick={() => {
                    handlerAddRole('admin');
                }}>add admin role
                </button>

                <button onClick={() => {
                    handlerRemoveRole('admin');
                }}>remove admin role
                </button>
            </Space>

            <Space>
                HasAnyRoles['user']：
                <Access hasAnyRoles={['user']}>
                    <div>has user role</div>
                </Access>

                <button onClick={() => {
                    handlerAddRole('user');
                }}>add user role
                </button>

                <button onClick={() => {
                    handlerRemoveRole('user');
                }}>remove user role
                </button>
            </Space>


            <Space>
                noAnyRoles['user']：
                <Access noAnyRoles={['user']}>
                    <div>has user role</div>
                </Access>

                <button onClick={() => {
                    handlerAddRole('user');
                }}>add user role
                </button>

                <button onClick={() => {
                    handlerRemoveRole('user');
                }}>remove user role
                </button>
            </Space>

            <Space>
                isNotRoles：
                <Access isNotRoles={true}>
                    <div>no role</div>
                </Access>
                <button onClick={handlerRemoveAllRole}>remove all role</button>
            </Space>
        </>
    )
}

export default AccessTest;
```

### 微前端动态组件

```javascript
import React from "react";
import Space from "@/components/Space";
import {DynamicComponentUtils} from "@codingapi/ui-framework";


const MicroComponentTest = () => {

    const [url, setUrl] = React.useState('http://localhost:3000/remoteEntry.js');
    const [scope, setScope] = React.useState('MircoApp');
    const [module, setModule] = React.useState('./Header');

    const [RemoteComponent, setRemoteComponent] = React.useState<React.ComponentType | null>(null);

    const handlerAddComponent = () => {
        DynamicComponentUtils.loadRemoteScript(url)
            .then(() => {
                DynamicComponentUtils.loadRemoteComponent(scope, module)
                    .then((ComponentModule:any) => {
                        const Component = ComponentModule.default || ComponentModule;
                        setRemoteComponent(() => Component);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            })
            .catch(e => {
                console.log(e);
            });
    }

    const handlerRemoveComponent = () => {
        setRemoteComponent(() => null);
    }

    return (
        <>
            <div
                style={{
                    textAlign: 'center'
                }}
            >
                <h1>Load Micro Component Test </h1>
            </div>
            <Space>
                <div>
                    url:
                    <input
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                        }}/>
                </div>
                <div>
                    scope:
                    <input
                        value={scope}
                        onChange={(e) => {
                            setScope(e.target.value);
                        }}/>
                </div>
                <div>
                    module:
                    <input
                        value={module}
                        onChange={(e) => {
                            setModule(e.target.value);
                        }}/>
                </div>
            </Space>
            <Space>
                <button onClick={handlerAddComponent}>add remote component</button>
                <button onClick={handlerRemoveComponent}>remove remote component</button>
            </Space>
            {RemoteComponent && <RemoteComponent/>}
        </>
    )
}

export default MicroComponentTest;
```
更多实例参考: https://github.com/codingapi/ui-framework/tree/main/playground

## 主要特性

- 组件总线：用于管理和注册组件
- 事件总线：用于组件间通信
- 访问控制：用于权限管理
- 微前端动态组件：支持动态加载和卸载组件

## 开发

```bash
# 安装依赖
yarn install

# 构建
yarn build

# 发布
yarn push
```

## 许可证

Apache-2.0

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
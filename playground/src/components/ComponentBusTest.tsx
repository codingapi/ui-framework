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
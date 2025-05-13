import React from 'react';
import {Access, ComponentBus} from "@codingapi/ui-framework";


interface SpaceProps {
    children?: React.ReactNode;
}

const Space: React.FC<SpaceProps> = (props) => {
    return (
        <div style={{
            display: 'flex',
            gap: '10px',
            margin: '10px 0'
        }}>
            {props.children}
        </div>
    )
}

const MyComponent = () => {
    return (
        <div>
            my component
        </div>
    )
}

const App = () => {

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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <div>
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

            <div>
                <h1>ComponentBus Test </h1>
            </div>

            <Space>
                Component:
                {MyComponentContent && (
                    <MyComponentContent />
                )}
                <button onClick={handlerAddComponent}>add component</button>

                <button onClick={handlerRemoveComponent}>remove component</button>
            </Space>

        </div>
    );
}

export default App;

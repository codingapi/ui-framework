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
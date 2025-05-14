import React from "react";
import Space from "@/components/Space";
import {Base64Utils} from "@codingapi/ui-framework";

const Base64Test = () => {

    const [value, setValue] = React.useState('');

    const handlerEncode = () => {
        setValue(Base64Utils.stringToBase64(value));
    }

    const handlerDecode = () => {
        setValue(Base64Utils.base64ToString(value));
    }

    return (
        <>
            <div
                style={{
                    textAlign: 'center'
                }}
            >
                <h1>Base64 Test </h1>
            </div>
            <Space>
                <div>
                    value:
                    <input
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}/>
                </div>
            </Space>

            <Space>
                <button onClick={handlerEncode}>encode</button>
                <button onClick={handlerDecode}>decode</button>
            </Space>
        </>
    )
};


export default Base64Test;
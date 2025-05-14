import React from "react";
import Space from "@/components/Space";
import {HttpClient,Response} from "@codingapi/ui-framework";

const httpClient = new HttpClient(10000,{
    success:(msg:string)=>{
        console.log('success',msg);
    },
    error:(msg:string)=>{
        console.log('error',msg);
    },
});

const HttpTest = ()=>{

    const [url, setUrl] = React.useState('/api/products');

    const handlerGet = ()=>{
        httpClient.get(url).then((res:Response)=>{
            const json = JSON.stringify(res);
            console.log(json);
            alert(json);
        })
    }

    return (
        <>
            <div
                style={{
                    textAlign: 'center'
                }}
            >
                <h1>Http Test </h1>
            </div>
            <Space>
                url:
                <input
                    value={url}
                    onChange={(e) => {
                        setUrl(e.target.value);
                    }}/>
                <button onClick={handlerGet}>get</button>
            </Space>
        </>
    )
}

export default HttpTest;

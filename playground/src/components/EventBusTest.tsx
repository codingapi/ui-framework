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
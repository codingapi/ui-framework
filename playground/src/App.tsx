import React from 'react';
import AccessTest from "@/components/AccessTest";
import ComponentBusTest from "@/components/ComponentBusTest";
import EventBusTest from "@/components/EventBusTest";
import MicroComponentTest from "@/components/MicroComponentTest";
import Base64Test from "@/components/Base64Test";

const App = () => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <AccessTest/>
            <ComponentBusTest/>
            <EventBusTest/>
            <MicroComponentTest/>
            <Base64Test/>
        </div>
    );
}

export default App;

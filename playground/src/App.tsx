import React from 'react';
import AccessTest from "@/components/AccessTest";
import ComponentBusTest from "@/components/ComponentBusTest";
import EventBusTest from "@/components/EventBusTest";
import MicroComponentTest from "@/components/MicroComponentTest";
import Base64Test from "@/components/Base64Test";
import HttpTest from "@/components/HttpTest";
import ThemeTest from "@/components/ThemeTest";

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
            <HttpTest/>
            <ThemeTest/>
        </div>
    );
}

export default App;

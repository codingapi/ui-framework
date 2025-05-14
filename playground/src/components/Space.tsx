import React from "react";

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

export default Space;
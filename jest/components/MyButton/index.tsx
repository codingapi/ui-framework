import * as React from "react";

export interface MyButtonProps {
    onClick?: () => void;
    text?: string;
}

const MyButton:React.FC<MyButtonProps> = (props)=>{
    return (
        <a
            href={"#"}
            role={'button'}
            aria-label={'my-button'}
            onClick={()=>{
                props.onClick && props.onClick();
            }}>{props.text}</a>
    )
}

export default MyButton;
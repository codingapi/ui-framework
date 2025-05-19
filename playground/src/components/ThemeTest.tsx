import React from "react";
import Space from "@/components/Space";
import {ThemeContext, ThemeProviderContext} from "../../../src";
import {EventBus} from "@codingapi/ui-framework";

const ThemeTest = () => {

    const themeContext = React.useContext(ThemeProviderContext);

    const [fontSize, setFontSize] = React.useState(themeContext?.getTheme().token.contentFontSize);

    React.useEffect(() => {
        EventBus.getInstance().on(ThemeContext.EVENT_CHANGE_CONTENT_FONT_SIZE, (data: string) => {
            setFontSize(data);
        });

        return () => {
            EventBus.getInstance().off(ThemeContext.EVENT_CHANGE_CONTENT_FONT_SIZE);
        }
    }, [])

    return (
        <>
            <div
                style={{
                    textAlign: 'center'
                }}
            >
                <h1>Theme Test </h1>
            </div>
            <Space>
                <div>
                    font size:{fontSize}
                </div>
                <button onClick={() => {
                    themeContext?.setSmallFontSize();
                }}>small font size
                </button>
                <button
                    onClick={() => {
                        themeContext?.setMiddleFontSize();
                    }}
                >middle font size
                </button>
                <button onClick={() => {
                    themeContext?.setLargeFontSize();
                }}>large font size
                </button>
            </Space>
        </>
    )
}

export default ThemeTest;
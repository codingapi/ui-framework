import React from "react";
import {ThemeContext} from "./content";
import {ThemeConfig} from "./types";

interface ThemeProviderProps {
    children: React.ReactNode;
    theme: ThemeConfig
}

export const ThemeProviderContext = React.createContext<ThemeContext | null>(null);

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {

    const currentTheme = React.useContext(ThemeProviderContext) || {};

    const [theme, dispatch] = React.useState<ThemeConfig>({
        ...currentTheme,
        ...props.theme
    });

    const themeContextRef = React.useRef<ThemeContext | null>(null);

    if (!themeContextRef.current) {
        themeContextRef.current = new ThemeContext(theme, dispatch);
    }

    React.useEffect(() => {
        themeContextRef.current?.syncTheme(theme);
    }, [theme]);

    return (
        <ThemeProviderContext.Provider value={themeContextRef.current}>
            {props.children}
        </ThemeProviderContext.Provider>
    )
}
import {ThemeConfig} from "./types";
import {Dispatch} from "../Dispatch";
import {CSSUtils} from "../utils";
import {EventBus} from "../EventBus";

export class ThemeContext{

    public static EVENT_CHANGE_CONTENT_FONT_SIZE = 'theme-changeContentFontSize';
    public static EVENT_CHANGE_THEME = 'theme-changeTheme';

    private theme: ThemeConfig;
    private readonly dispatch: Dispatch<ThemeConfig>;

    constructor(theme: ThemeConfig,dispatch: Dispatch<ThemeConfig>) {
        this.theme = theme;
        this.dispatch = dispatch;
    }

    public getTheme = () => {
        return this.theme;
    }

    // 更新状态数据
    public syncTheme = (theme: ThemeConfig) => {
        this.theme = theme;
    }

    public setLargeFontSize = () => {
        const fontSize = CSSUtils.getRootVariable('--content-font-size-large');
        CSSUtils.setRootVariable('--content-font-size', fontSize);
        this.setFontSize(fontSize);
    }

    public setMiddleFontSize = ()=>{
        const fontSize = CSSUtils.getRootVariable('--content-font-size-middle');
        CSSUtils.setRootVariable('--content-font-size', fontSize);
        this.setFontSize(fontSize);
    }

    public setSmallFontSize = ()=>{
        const fontSize = CSSUtils.getRootVariable('--content-font-size-small');
        CSSUtils.setRootVariable('--content-font-size', fontSize);
        this.setFontSize(fontSize);
    }

    /**
     * 设置字体大小
     * @param fontSize
     */
    public setFontSize = (fontSize: string) => {
        this.dispatch((prevState) => {
            return {
                ...prevState,
                token: {
                    ...prevState.token,
                    contentFontSize: fontSize
                }
            }
        });
        EventBus.getInstance().emit(ThemeContext.EVENT_CHANGE_CONTENT_FONT_SIZE, fontSize);
    }

    /**
     * 设置主题
     * @param theme
     */
    public changeTheme = (theme: ThemeConfig) => {
        this.dispatch((prevState) => {
            return {
                ...prevState,
                ...theme
            }
        });
        EventBus.getInstance().emit(ThemeContext.EVENT_CHANGE_THEME, theme);
    }
}
export class CSSUtils {
    /**
     * 获取 :root 下的 CSS 变量
     */
    public static getRootVariable(name: string, defaultValue = ''): string {
        const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        return value || defaultValue;
    }

    public static setRootVariable(name: string, value: string) {
        document.documentElement.style.setProperty(name, value);
    }

    /**
     * 获取指定 selector 第一个匹配元素的 CSS 变量值
     */
    public static getElementVariable(selector: string, name: string, defaultValue = ''): string {
        const el = document.querySelector(selector);
        if (!el) return defaultValue;
        const value = getComputedStyle(el).getPropertyValue(name).trim();
        return value || defaultValue;
    }

    /**
     * 获取指定 selector 所有匹配元素的 CSS 变量值（批量）
     */
    public static getElementVariables(selector: string, name: string, defaultValue = ''): string[] {
        const elements = document.querySelectorAll(selector);
        return Array.from(elements).map(el =>
            getComputedStyle(el).getPropertyValue(name).trim() || defaultValue
        );
    }

    /**
     * 获取单个元素的所有 computed 样式属性（返回对象）
     */
    public static getAllStyles(selector: string): Record<string, string> | null {
        const el = document.querySelector(selector);
        if (!el) return null;
        const styles = getComputedStyle(el);
        const result: Record<string, string> = {};
        for (let i = 0; i < styles.length; i++) {
            const prop = styles[i];
            result[prop] = styles.getPropertyValue(prop).trim();
        }
        return result;
    }

    /**
     * 获取嵌套结构中的目标元素样式
     */
    public static getNestedStyles(
        rootSelector: string,
        nestedSelector: string
    ): Record<string, string> | null {
        const root = document.querySelector(rootSelector);
        if (!root) return null;

        const target = root.querySelector(nestedSelector);
        if (!target) return null;

        const styles = getComputedStyle(target);
        const result: Record<string, string> = {};
        for (let i = 0; i < styles.length; i++) {
            const prop = styles[i];
            result[prop] = styles.getPropertyValue(prop).trim();
        }
        return result;
    }

    /**
     * 批量获取多个元素的完整样式（返回数组）
     */
    public static getMultipleElementsStyles(selector: string): Record<string, string>[] {
        const elements = document.querySelectorAll(selector);
        const results: Record<string, string>[] = [];

        elements.forEach(el => {
            const styles = getComputedStyle(el);
            const record: Record<string, string> = {};
            for (let i = 0; i < styles.length; i++) {
                const prop = styles[i];
                record[prop] = styles.getPropertyValue(prop).trim();
            }
            results.push(record);
        });

        return results;
    }
}
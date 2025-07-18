import JSZip from "jszip";
import {Base64Utils} from "./base64";


export class DynamicComponentUtils {

    public static loadRemoteComponent = (scope: string, module: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Initialize the sharing scope (shared modules like react, etc.)
                //@ts-ignore
                await __webpack_init_sharing__('default');
                //@ts-ignore
                const container = window[scope]; // Get the container loaded on the window object
                if (!container) {
                    reject(new Error(`Remote scope ${scope} not found on window.`));
                    return;
                }

                //@ts-ignore
                await container.init(__webpack_share_scopes__.default); // Initialize the container
                const factory = await container.get(module); // Get the module factory
                resolve(factory()); // Get the actual module
            } catch (e) {
                reject(e);
            }
        });
    };

    public static loadRemoteScript = (url: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                const script = document.createElement('script');
                script.src = url;
                script.onload = (e) => {
                    resolve();
                };
                script.onerror = reject;
                document.head.appendChild(script);
            } catch (e) {
                reject(e);
            }
        });
    };


    public static loadFileScript = (content: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                try {
                    eval(content);
                } catch (e) {
                    resolve();
                    return;
                }
                const encoder = new TextEncoder();
                const encodedContent = encoder.encode(content);
                const blob = new Blob([encodedContent], {type: 'application/javascript'});
                const url = URL.createObjectURL(blob);
                const script = document.createElement('script');
                script.src = url;
                script.onload = () => {
                    resolve();
                };
                script.onerror = (e) => {
                    reject(e);
                };
                document.head.appendChild(script);
            } catch (e) {
                reject(e);
            }
        });
    };


    public static loadZipJsFileScript = async (base64: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            const file = Base64Utils.base64ToBlob(base64, 'application/zip');
            if (file) {
                const zip = new JSZip();
                const content = file.arrayBuffer();
                zip.loadAsync(content).then((unzipped) => {
                    const jsFiles: { relativePath: string, content: string }[] = [];
                    const cssFiles: { relativePath: string, content: string }[] = [];

                    const blobUrlMap = new Map<string, string>();
                    const filePromises: Promise<void>[] = [];
                    unzipped.forEach((relativePath, file) => {
                        if (relativePath.endsWith(".js")) {
                            const filePromise = file.async('text').then((text) => {
                                jsFiles.push({relativePath, content: text});
                            });
                            filePromises.push(filePromise);
                        }

                        // CSS 文件
                        if (relativePath.endsWith('.css')) {
                            const p = file.async('text').then((text) => {
                                cssFiles.push({ relativePath, content: text });
                            });
                            filePromises.push(p);
                        }

                    });

                    Promise.all(filePromises).then(() => {

                        // 插入 CSS
                        cssFiles.forEach(({ relativePath, content }) => {
                            let patchedCss = content;

                            // 替换 CSS 中的图片路径为 blob URL
                            // @ts-ignore
                            for (const [originalPath, blobUrl] of blobUrlMap.entries()) {
                                const safePath = originalPath.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // escape regex
                                const regex = new RegExp(safePath, 'g');
                                patchedCss = patchedCss.replace(regex, blobUrl);
                            }

                            const styleEl = document.createElement('style');
                            styleEl.innerHTML = patchedCss;
                            document.head.appendChild(styleEl);
                            console.log('Load success style:', relativePath);
                        });


                        jsFiles.reduce((prevPromise: any, jsFile) => {
                            return prevPromise.then(() => {
                                return DynamicComponentUtils.loadFileScript(jsFile.content).then(() => {
                                    console.log('Load success file:', jsFile.relativePath);
                                });
                            });
                        }, Promise.resolve()).then(() => {
                            resolve();
                        }).catch(reject);
                    }).catch(reject);
                }).catch(reject);
            } else {
                reject(new Error('Failed to convert base64 to Blob.'));
            }
        });
    };
}

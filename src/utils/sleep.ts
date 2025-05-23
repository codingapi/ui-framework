export const sleep = async (time: number) => {
    return new Promise((resolve:any) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
}

import '@testing-library/jest-dom';
import {Base64Utils} from '../src';


test('Base64Utils Test 1 ', () => {
    const data =  Base64Utils.base64ToString('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==');
    expect(data).toEqual('Hello, World!');
});


test('Base64Utils Test 2 ', () => {
    const data =  Base64Utils.stringToBase64('Hello, World!');
    expect(data).toEqual('SGVsbG8sIFdvcmxkIQ==');
});
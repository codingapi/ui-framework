import '@testing-library/jest-dom';
import {FormField, FormInstance} from '../src';


test('Form getFieldProps Test', () => {
    const formInstance = new FormInstance();

    const input = {
        type: 'input',
        props: {
            name: 'test',
            label: 'test',
        }
    } as FormField;

    formInstance.resetFields([input]);

    const field = formInstance.getFieldProps('test');
    expect(field).toEqual(input);

});
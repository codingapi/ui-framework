import '@testing-library/jest-dom';
import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Access} from '../src';
import MyButton from './components/MyButton';

test('Access Component Not Exist', () => {
    localStorage.removeItem('authorities');

    const mockOnClick = jest.fn();
    render(
        <Access hasRoles={["admin"]}>
            <MyButton text="Click me" onClick={mockOnClick}/>
        </Access>
    );

    // 断言按钮文本
    const button = screen.queryByRole('button', {name: 'my-button'});
    // 断言按钮不存在
    expect(button).not.toBeInTheDocument();
});


test('Access hasRoles Test', () => {
    const mockOnClick = jest.fn();

    localStorage.setItem('authorities', JSON.stringify(['admin']));

    render(
        <Access hasRoles={["admin"]}>
            <MyButton text="Click me" onClick={mockOnClick}/>
        </Access>
    );

    // 断言按钮文本
    const button = screen.getByRole('button', {name: 'my-button'});
    expect(button).toBeInTheDocument();

    // 断言按钮点击事件
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
});



test('Access hasAnyRoles Test', () => {
    const mockOnClick = jest.fn();

    localStorage.setItem('authorities', JSON.stringify(['admin','user']));

    render(
        <Access hasAnyRoles={["admin"]}>
            <MyButton text="Click me" onClick={mockOnClick}/>
        </Access>
    );

    // 断言按钮文本
    const button = screen.getByRole('button', {name: 'my-button'});
    expect(button).toBeInTheDocument();

    // 断言按钮点击事件
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
});


test('Access noRoles Test 1', () => {
    const mockOnClick = jest.fn();

    localStorage.setItem('authorities', JSON.stringify(['admin']));

    render(
        <Access noRoles={["user"]}>
            <MyButton text="Click me" onClick={mockOnClick}/>
        </Access>
    );

    // 断言按钮文本
    const button = screen.getByRole('button', {name: 'my-button'});
    expect(button).toBeInTheDocument();

    // 断言按钮点击事件
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
});

test('Access noRoles Test 2', () => {
    const mockOnClick = jest.fn();

    localStorage.setItem('authorities', JSON.stringify(['admin']));

    render(
        <Access noRoles={["admin"]}>
            <MyButton text="Click me" onClick={mockOnClick}/>
        </Access>
    );

    // 断言按钮文本
    const button = screen.queryByRole('button', {name: 'my-button'});
    expect(button).not.toBeInTheDocument();

});


test('Access noAnyRoles Test 1', () => {
    const mockOnClick = jest.fn();

    localStorage.setItem('authorities', JSON.stringify(['admin','user']));

    render(
        <Access noAnyRoles={["system"]}>
            <MyButton text="Click me" onClick={mockOnClick}/>
        </Access>
    );

    // 断言按钮文本
    const button = screen.getByRole('button', {name: 'my-button'});
    expect(button).toBeInTheDocument();

    // 断言按钮点击事件
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);

});

test('Access noAnyRoles Test 2', () => {
    const mockOnClick = jest.fn();

    localStorage.setItem('authorities', JSON.stringify(['admin','user']));

    render(
        <Access noAnyRoles={["user"]}>
            <MyButton text="Click me" onClick={mockOnClick}/>
        </Access>
    );

    // 断言按钮文本
    const button = screen.queryByRole('button', {name: 'my-button'});
    expect(button).not.toBeInTheDocument();

});


test('Access isNotRoles Test 1', () => {
    const mockOnClick = jest.fn();

    localStorage.setItem('authorities', JSON.stringify(['admin','user']));

    render(
        <Access isNotRoles={true}>
            <MyButton text="Click me" onClick={mockOnClick}/>
        </Access>
    );

    // 断言按钮文本
    const button = screen.queryByRole('button', {name: 'my-button'});
    expect(button).not.toBeInTheDocument();

});


test('Access isNotRoles Test 2', () => {
    const mockOnClick = jest.fn();

    localStorage.removeItem('authorities');

    render(
        <Access isNotRoles={true}>
            <MyButton text="Click me" onClick={mockOnClick}/>
        </Access>
    );

    // 断言按钮文本
    const button = screen.getByRole('button', {name: 'my-button'});
    expect(button).toBeInTheDocument();

    // 断言按钮点击事件
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);

});
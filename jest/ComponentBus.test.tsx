import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentBus } from '../src';
import MyButton, { MyButtonProps } from './components/MyButton';

test('ComponentBus Test 1 ', () => {
    ComponentBus.getInstance().removeAllComponent();
    const mockOnClick = jest.fn();
    ComponentBus.getInstance().registerComponent('Button', MyButton);
    const Button = ComponentBus.getInstance().getComponent('Button') as React.ComponentType<MyButtonProps>;
    expect(Button).toEqual(MyButton);
    render(<Button text="Click me" onClick={mockOnClick} />);

    // 断言按钮文本
    const button = screen.getByRole('button', { name: 'my-button' });

    // 断言按钮存在
    expect(button).toBeInTheDocument();

    // 模拟点击按钮
    fireEvent.click(button);

    // 断言点击事件被调用
    expect(mockOnClick).toHaveBeenCalledTimes(1);
});


test('ComponentBus Test 2 ', () => {
    const mockOnClick = jest.fn();
    ComponentBus.getInstance().removeAllComponent();
    const Button = ComponentBus.getInstance().getComponent('Button') as React.ComponentType<MyButtonProps>;
    console.log(Button)
    //断言按钮不存在
    expect(Button).toBeUndefined();
});
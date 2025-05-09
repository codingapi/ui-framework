import '@testing-library/jest-dom';
import {EventBus} from '../src';


test('EventBus Test 1 ', () => {
    const mockOnEventHandler = jest.fn();
    EventBus.getInstance().on('test',mockOnEventHandler);

    EventBus.getInstance().emit('test','test');
    expect(mockOnEventHandler).toHaveBeenCalledTimes(1);

    EventBus.getInstance().off('test',mockOnEventHandler);
    EventBus.getInstance().emit('test','test');

    expect(mockOnEventHandler).toHaveBeenCalledTimes(1);
});


test('EventBus Test 2 ', () => {
    const mockOnEventHandler = jest.fn();
    EventBus.getInstance().on('test',mockOnEventHandler);

    EventBus.getInstance().emit('test','test');
    expect(mockOnEventHandler).toHaveBeenCalledTimes(1);

    EventBus.getInstance().emit('test','test');

    expect(mockOnEventHandler).toHaveBeenCalledTimes(2);
});
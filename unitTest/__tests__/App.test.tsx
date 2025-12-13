/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {fireEvent, render} from '@testing-library/react-native';
import {it, describe, expect} from '@jest/globals';

describe('App Component', () => {
  it('renders correctly and shows initial count', () => {
    const {getByText} = render(<App />);
    expect(getByText('Count: 0')).toBeTruthy();
  });

  it('increments count on button press', () => {
    const {getByText} = render(<App />);
    const incrementButton = getByText('Increment');

    fireEvent.press(incrementButton);
    expect(getByText('Count: 1')).toBeTruthy();
  });

  it('decrements count on button press', () => {
    const {getByText} = render(<App />);
    const decrementButton = getByText('Decrement');

    fireEvent.press(decrementButton);
    expect(getByText('Count: -1')).toBeTruthy();
  });

  it('resets count on button press', () => {
    const {getByText} = render(<App />);
    const incrementButton = getByText('Increment');
    const resetButton = getByText('Reset');

    fireEvent.press(incrementButton);
    fireEvent.press(incrementButton);
    expect(getByText('Count: 2')).toBeTruthy();

    fireEvent.press(resetButton);
    expect(getByText('Count: 0')).toBeTruthy();
  });

  it('handles multiple increments and decrements correctly', () => {
    const {getByText} = render(<App />);
    const incrementButton = getByText('Increment');
    const decrementButton = getByText('Decrement');

    fireEvent.press(incrementButton);
    fireEvent.press(incrementButton);
    fireEvent.press(incrementButton);
    expect(getByText('Count: 3')).toBeTruthy();

    fireEvent.press(decrementButton);
    expect(getByText('Count: 2')).toBeTruthy();
  });
});

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { InputField } from '../InputField';
import { DEFAULT_CITY } from '../../constants/contants';

describe('InputField', () => {
  it('renders with the default placeholder', () => {
    render(<InputField location="" setLocation={jest.fn()} />);
    expect(screen.getByPlaceholderText(DEFAULT_CITY)).toBeTruthy();
  });

  it('displays the provided location value', () => {
    const testLocation = 'Test City';
    render(<InputField location={testLocation} setLocation={jest.fn()} />);
    expect(screen.getByDisplayValue(testLocation)).toBeTruthy();
  });

  it('calls setLocation with the new text when input changes', () => {
    const setLocationMock = jest.fn();
    render(<InputField location="" setLocation={setLocationMock} />);
    const input = screen.getByPlaceholderText(DEFAULT_CITY);

    fireEvent.changeText(input, 'New City');
    expect(setLocationMock).toHaveBeenCalledWith('New City');
  });

  it('applies the correct styles', () => {
    render(<InputField location="" setLocation={jest.fn()} />);
    const input = screen.getByPlaceholderText(DEFAULT_CITY);

    expect(input).toHaveStyle({
      height: 50,
      width: 200,
      backgroundColor: 'whitesmoke',
      borderColor: 'grey',
      borderWidth: 1,
    });
  });
});
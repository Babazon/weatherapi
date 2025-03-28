import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { SearchButton, SearchButtonWithLoading } from '../SearchButton';

describe('SearchButton', () => {
  it('renders with the correct title', () => {
    render(<SearchButton fetchWeatherData={jest.fn()} />);
    expect(screen.getByText('Fetch Weather')).toBeTruthy();
  });

  it('calls fetchWeatherData when pressed', () => {
    const fetchWeatherDataMock = jest.fn();
    render(<SearchButton fetchWeatherData={fetchWeatherDataMock} />);
    const button = screen.getByText('Fetch Weather');

    fireEvent.press(button);
    expect(fetchWeatherDataMock).toHaveBeenCalled();
  });
});

describe('SearchButtonWithLoading', () => {
  it('renders the wrapped component when not loading', () => {
    render(<SearchButtonWithLoading fetchWeatherData={jest.fn()} isLoading={false} />);
    expect(screen.getByText('Fetch Weather')).toBeTruthy();
  });

  it('renders the loading indicator when loading', () => {
    render(<SearchButtonWithLoading fetchWeatherData={jest.fn()} isLoading={true} />);
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('calls fetchWeatherData when pressed and not loading', () => {
    const fetchWeatherDataMock = jest.fn();
    render(<SearchButtonWithLoading fetchWeatherData={fetchWeatherDataMock} isLoading={false} />);
    const button = screen.getByText('Fetch Weather');

    fireEvent.press(button);
    expect(fetchWeatherDataMock).toHaveBeenCalled();
  });

  it('does not call fetchWeatherData when pressed and loading', () => {
    const fetchWeatherDataMock = jest.fn();
    render(<SearchButtonWithLoading fetchWeatherData={fetchWeatherDataMock} isLoading={true} />);
    const button = screen.getByText('Loading...');

    fireEvent.press(button);
    expect(fetchWeatherDataMock).not.toHaveBeenCalled();
  });
});
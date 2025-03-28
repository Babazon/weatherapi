import React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { WeatherApi } from '../../services/weatherApi/weatherApi';
import { useWeatherApiContext, WeatherContextProvider } from '../WeatherContext';

jest.mock('../../services/weatherApi/weatherApi', () => ({
  WeatherApi: jest.fn(),
}));

jest.mock('../../constants/contants', () => ({
  API_KEY: 'test-api-key',
  BASE_URL: 'http://test-base-url.com',
}));

describe('WeatherContextProvider', () => {
  const TestComponent = () => {
    const weatherApi = useWeatherApiContext();
    return <>{weatherApi ? <Text>Context Available</Text> : <Text>Context Unavailable</Text>}</>;
  };

  it('provides the WeatherApi context', () => {
    (WeatherApi as jest.Mock).mockImplementation(() => ({})); // Mock an empty WeatherApi instance
    render(
      <WeatherContextProvider>
        <TestComponent />
      </WeatherContextProvider>
    );

    expect(screen.getByText('Context Available')).toBeTruthy();
  });

  it('throws an error when used outside of WeatherContextProvider', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error

    const renderComponentOutsideProvider = () => {
        render(<TestComponent />);
    }
    expect(renderComponentOutsideProvider).toThrow('useWeather must be used within a WeatherProvider');
    consoleErrorSpy.mockRestore(); // Restore console.error
  });

  it('constructs WeatherApi with correct baseUrl and apiKey', () => {
    render(
      <WeatherContextProvider>
        <TestComponent />
      </WeatherContextProvider>
    );

    expect(WeatherApi).toHaveBeenCalledWith({
      baseUrl: 'http://test-base-url.com',
      apiKey: 'test-api-key',
    });
  });
});
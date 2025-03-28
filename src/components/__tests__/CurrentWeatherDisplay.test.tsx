import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { CurrentWeatherDisplay, CurrentWeatherDisplayWithError } from '../CurrentWeatherDisplay';
import { CurrentWeatherResponse } from '../../services/weatherApi/weatherTypes';

const mockWeatherData: CurrentWeatherResponse = {
  location: {
    name: 'London',
    region: 'England',
    country: 'UK',
    lat: 51.5,
    lon: -0.13,
    localtime: '2023-03-15 12:00',
  },
  current: {
    last_updated: '2023-03-15 12:00',
    temp_c: 15,
    temp_f: 59,
    condition: {
      text: 'Partly cloudy',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      code: 1003,
    },
    wind_mph: 10,
    wind_kph: 16,
    wind_degree: 250,
    wind_dir: 'WSW',
    pressure_mb: 1012,
    pressure_in: 29.88,
    humidity: 60,
    cloud: 25,
    feelslike_c: 14,
    feelslike_f: 57.2,
    vis_km: 10,
    vis_miles: 6,
    uv: 4,
    gust_mph: 15,
    gust_kph: 24,
  },
};

describe('CurrentWeatherDisplay', () => {
  it('renders weather data correctly', () => {
    render(<CurrentWeatherDisplay weatherData={mockWeatherData} />);

    expect(screen.getByText('London')).toBeTruthy();
    expect(screen.getByText('15°C')).toBeTruthy();
    expect(screen.getByText('Partly cloudy')).toBeTruthy();
  });

  it('renders null values gracefully', () => {
    render(<CurrentWeatherDisplay weatherData={null} />);

    expect(screen.queryByText('London')).toBeNull();
    expect(screen.queryByText('15°C')).toBeNull();
    expect(screen.queryByText('Partly cloudy')).toBeNull();
  });
});

describe('CurrentWeatherDisplayWithError', () => {
  it('renders the wrapped component when there is no error', () => {
    render(<CurrentWeatherDisplayWithError weatherData={mockWeatherData} isError={false} />);

    expect(screen.getByText('London')).toBeTruthy();
  });

  it('renders the error message when there is an error', () => {
    render(<CurrentWeatherDisplayWithError weatherData={mockWeatherData} isError={true} />);

    expect(screen.getByText('An error occurred.')).toBeTruthy();
  });
});
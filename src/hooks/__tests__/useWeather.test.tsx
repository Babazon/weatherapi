import { renderHook, act } from '@testing-library/react-hooks';
import { CurrentWeatherResponse } from '../../services/weatherApi/weatherTypes';
import { MAX_NETWORK_REQUEST_RETRIES } from '../../constants/contants';
import { useWeatherApiContext } from '../../context/WeatherContext';
import { useWeather } from '../useWeather';
// Mock useWeatherApiContext
jest.mock('../context/WeatherContext', () => ({
  useWeatherApiContext: jest.fn(),
}));

// Mock constants
jest.mock('../../constants/contants', () => ({
  MAX_NETWORK_REQUEST_RETRIES: 3,
}));

describe('useWeather Hook', () => {
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

  const mockWeatherApi = {
    getCurrentWeather: jest.fn(),
  };

  beforeEach(() => {
    (useWeatherApiContext as jest.Mock).mockReturnValue(mockWeatherApi);
    mockWeatherApi.getCurrentWeather.mockClear();
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useWeather());

    expect(result.current.weatherData).toBeNull();
    expect(result.current.location).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('fetches weather data successfully', async () => {
    mockWeatherApi.getCurrentWeather.mockResolvedValueOnce(mockWeatherData);

    const { result, waitForNextUpdate } = renderHook(() => useWeather());

    act(() => {
      result.current.setLocation('London');
      result.current.fetchWeatherDataWithRetry();
    });

    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.weatherData).toEqual(mockWeatherData);
    expect(result.current.isError).toBe(false);
  });

  it('handles network errors and retries', async () => {
    mockWeatherApi.getCurrentWeather.mockRejectedValueOnce(new Error('Network error'));
    mockWeatherApi.getCurrentWeather.mockResolvedValueOnce(mockWeatherData);

    const { result, waitForNextUpdate, waitFor } = renderHook(() => useWeather());

    act(() => {
      result.current.setLocation('London');
      result.current.fetchWeatherDataWithRetry();
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => result.current.isLoading === false);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.weatherData).toEqual(mockWeatherData);
    expect(result.current.isError).toBe(false);
    expect(mockWeatherApi.getCurrentWeather).toHaveBeenCalledTimes(2);
  });

  it('handles max retries and sets isError to true', async () => {
    mockWeatherApi.getCurrentWeather.mockRejectedValue(new Error('Network error'));

    const { result, waitFor } = renderHook(() => useWeather());

    act(() => {
      result.current.setLocation('London');
      result.current.fetchWeatherDataWithRetry();
    });

    await waitFor(() => result.current.isError === true);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(mockWeatherApi.getCurrentWeather).toHaveBeenCalledTimes(MAX_NETWORK_REQUEST_RETRIES);
  });
});
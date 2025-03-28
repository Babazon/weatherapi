import { HttpAdapter } from '../httpAdapter';
import { ENDPOINTS } from '../../constants/contants';
import { WeatherApi } from '../weatherApi/weatherApi';
import { CurrentWeatherResponse } from '../weatherApi/weatherTypes';

jest.mock('../httpAdapter', () => ({
  HttpAdapter: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
  })),
}));

jest.mock('../../constants/contants', () => ({
  ENDPOINTS: {
    CURRENT_WEATHER: '/current.json',
  },
}));

describe('WeatherApi', () => {
  const baseUrl = 'http://test.com/api';
  const apiKey = 'test-api-key';
  let weatherApi: WeatherApi;
  let httpAdapterMock: any;

  beforeEach(() => {
    weatherApi = new WeatherApi({ baseUrl, apiKey });
    httpAdapterMock = (HttpAdapter as jest.Mock).mock.instances[0];
  });

  it('constructs with correct baseUrl and apiKey', () => {
    expect(HttpAdapter).toHaveBeenCalledWith(baseUrl, apiKey);
  });

  it('calls HttpAdapter.get with correct endpoint and location', async () => {
    const location = 'London';
    const mockResponse: CurrentWeatherResponse = {
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

    httpAdapterMock.get.mockResolvedValueOnce(mockResponse);

    const result = await weatherApi.getCurrentWeather(location);

    expect(httpAdapterMock.get).toHaveBeenCalledWith(ENDPOINTS.CURRENT_WEATHER, { q: location });
    expect(result).toEqual(mockResponse);
  });

  it('handles errors from HttpAdapter.get', async () => {
    const location = 'London';
    const mockError = new Error('API error');

    httpAdapterMock.get.mockRejectedValueOnce(mockError);

    await expect(weatherApi.getCurrentWeather(location)).rejects.toThrow('API error');
  });
});
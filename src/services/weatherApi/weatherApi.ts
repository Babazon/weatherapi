import { ENDPOINTS } from "../../constants/contants";
import { HttpAdapter } from "../httpAdapter";
import { CurrentWeatherResponse } from "./weatherTypes";

export class WeatherApi extends HttpAdapter {
  constructor({ baseUrl, apiKey }: { baseUrl: string, apiKey: string }) {
    super(baseUrl, apiKey);
  }

  async getCurrentWeather(location: string) {
    return this.get<CurrentWeatherResponse>(ENDPOINTS.CURRENT_WEATHER, { q: location });
  }

}
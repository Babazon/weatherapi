
type Maybe<T> = T | null | undefined;

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface CurrentWeather {
  last_updated: string;
  temp_c: number;
  temp_f: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

interface CurrentWeatherResponse {
  location: Location;
  current: CurrentWeather;
}

export { CurrentWeatherResponse, CurrentWeather, Condition, Location, Maybe };
import { useState, useCallback } from "react";
import { Maybe, CurrentWeatherResponse } from "../services/weatherApi/weatherTypes";
import { WeatherApi } from "../services/weatherApi/weatherApi";

const baseUrl = 'https://api.weatherapi.com/v1';
const apiKey = 'e55f6730548449aab9370829241604';

const weatherApi = new WeatherApi({baseUrl, apiKey});

export const useWeather = () => {
        const [weatherData, setWeatherData] = useState<Maybe<CurrentWeatherResponse>>(null);
        const [location, setLocation] = useState<string>('');
    
        const fetchWeatherData = useCallback(async ()  => {
            try {
                const weatherData = await weatherApi.getCurrentWeather(location)
                console.log(weatherData);
            
                if(weatherData){
                    setWeatherData(weatherData);
                }
            } catch (error) {
                console.log(error);
            }
        },[location])

        return {weatherData, location, setLocation, fetchWeatherData};
    }
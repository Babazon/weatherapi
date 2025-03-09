import { useState, useCallback } from "react";
import { Maybe, CurrentWeatherResponse } from "../services/weatherApi/weatherTypes";
import { useWeatherApiContext } from "../context/WeatherContext";



export const useWeather = () => {
        const [weatherData, setWeatherData] = useState<Maybe<CurrentWeatherResponse>>(null);
        const [location, setLocation] = useState<string>('');
        const weatherApi = useWeatherApiContext();

        const [isLoading, setIsLoading] = useState(false);
        const [isError, setIsError] = useState(false);
    
        const fetchWeatherData = useCallback(async ()  => {
            setIsLoading(true);
            setIsError(false);
            try {
                const weatherData = await weatherApi.getCurrentWeather(location)
                console.log(weatherData);
            
                if(weatherData){
                    setWeatherData(weatherData);
                }
            } catch (error) {
                setIsError(true);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        },[location])

        return {weatherData, location, setLocation, fetchWeatherData, isLoading, isError};
    }
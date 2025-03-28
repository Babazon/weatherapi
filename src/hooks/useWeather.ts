import { useState, useCallback } from "react";
import { Maybe, CurrentWeatherResponse } from "../services/weatherApi/weatherTypes";
import { useWeatherApiContext } from "../context/WeatherContext";
import { MAX_NETWORK_REQUEST_RETRIES } from "../constants/contants";

export const useWeather = () => {
    const [weatherData, setWeatherData] = useState<Maybe<CurrentWeatherResponse>>(null);
    const [location, setLocation] = useState<string>('');
    const weatherApi = useWeatherApiContext();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [retries, setRetries] = useState(0);

    const fetchWeatherDataWithRetry = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);

        const attemptFetch = async () => {
            try {
                const fetchedWeatherData = await weatherApi.getCurrentWeather(location);
                setWeatherData(fetchedWeatherData);
                setIsLoading(false);
                setRetries(0);
            } catch (error) {
                if (retries < MAX_NETWORK_REQUEST_RETRIES) {
                    setRetries(prevRetries => prevRetries + 1);
                    const delay = Math.pow(2, retries + 1) * 1000;
                    setTimeout(attemptFetch, delay);
                } else {
                    setIsError(true);
                    setIsLoading(false);
                    setRetries(0);
                }
            }
        };

        attemptFetch();
    }, [location, weatherApi, retries]);

    return { weatherData, location, setLocation, fetchWeatherDataWithRetry, isLoading, isError };
};
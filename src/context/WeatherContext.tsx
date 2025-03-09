import { createContext, PropsWithChildren, useContext } from "react";
import {Text}   from "react-native";
import { WeatherApi } from "../services/weatherApi/weatherApi";
import { Maybe } from "../services/weatherApi/weatherTypes";

const baseUrl = 'https://api.weatherapi.com/v1';
const apiKey = 'e55f6730548449aab9370829241604';

const weatherApi = new WeatherApi({baseUrl, apiKey});

const WeatherApiContext = createContext(weatherApi);

export const useWeatherApiContext = () => {
    if(WeatherApiContext) {
        return useContext(WeatherApiContext);
    }
    throw new Error('useWeather must be used within a WeatherProvider');
}


export const WeatherContextProvider: React.FC<PropsWithChildren> = ({children}) => {

    return (
        <WeatherApiContext.Provider value={weatherApi}>
            {children}
        </WeatherApiContext.Provider>
    )

};

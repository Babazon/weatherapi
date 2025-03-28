import { createContext, PropsWithChildren, useContext } from "react";
import { API_KEY, BASE_URL } from "../constants/contants";
import { WeatherApi } from "../services/weatherApi/weatherApi";


const weatherApi = new WeatherApi({ baseUrl: BASE_URL, apiKey: API_KEY });

const WeatherApiContext = createContext(weatherApi);

export const useWeatherApiContext = () => {
    if (WeatherApiContext) {
        return useContext(WeatherApiContext);
    }
    throw new Error('useWeather must be used within a WeatherProvider');
}


export const WeatherContextProvider: React.FC<PropsWithChildren> = ({ children }) => {

    return (
        <WeatherApiContext.Provider value={weatherApi}>
            {children}
        </WeatherApiContext.Provider>
    )

};

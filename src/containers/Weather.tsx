import { StyleSheet, Text, View } from "react-native";
import { InputField } from "../components/InputField";
import {  SearchButtonWithLoading } from "../components/SearchButton";
import { useWeather } from "../hooks/useWeather";
import { CurrentWeatherDisplayWithError } from "../components/CurrentWeatherDisplay";



export const Weather:React.FC = () => {
    const  {fetchWeatherDataWithRetry, location, setLocation, weatherData, isLoading, isError} = useWeather()

    return (
        <View style={styles.container}>
            <Text>Weather</Text>
            <InputField location={location} setLocation={setLocation}/>
            <SearchButtonWithLoading fetchWeatherData={fetchWeatherDataWithRetry} isLoading={isLoading}/>
            <CurrentWeatherDisplayWithError weatherData={weatherData} isError={isError}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'space-around',
        alignItems: 'center',  
    },
});

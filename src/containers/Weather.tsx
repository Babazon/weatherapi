import { StyleSheet, Text, View } from "react-native";
import { CurrentWeatherDisplay } from "../components/CurrentWeatherDisplay";
import { InputField } from "../components/InputField";
import { SearchButton } from "../components/SearchButton";
import { useWeather } from "../hooks/useWeather";



export const Weather:React.FC = () => {
    const  {fetchWeatherData, location, setLocation, weatherData} = useWeather()

    return (
        <View style={styles.container}>
            <Text>Weather</Text>
            <InputField location={location} setLocation={setLocation}/>
            <SearchButton fetchWeatherData={fetchWeatherData}/>
            <CurrentWeatherDisplay weatherData={weatherData}/>
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

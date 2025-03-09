import { Button, StyleSheet, Text, View } from "react-native";
import { useWeather } from "../hooks/useWeather";
import { InputField } from "../components/InputField";



export const Weather:React.FC = () => {
    const  {fetchWeatherData, location, setLocation, weatherData} = useWeather()

    return (
        <View style={styles.container}>
        <Text>Weather</Text>
        <InputField location={location} setLocation={setLocation}/>
        <Button title="Fetch Weather" onPress={fetchWeatherData}/>
        <Text>{`The weather in ${weatherData?.location.name} is ${weatherData?.current.temp_c} C degrees.`}</Text>
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

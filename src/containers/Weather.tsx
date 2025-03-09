import { useCallback, useState } from "react";
import { View , Text, StyleSheet, Button} from "react-native";
import { CurrentWeatherResponse, Maybe } from "../services/weatherApi/weatherTypes";

export const Weather:React.FC = () => {

    const [weatherData, setWeatherData] = useState<Maybe<CurrentWeatherResponse>>(null);

    const fetchWeatherData = useCallback(async ()  => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${'e55f6730548449aab9370829241604'}&q=Berlin`);
            const weatherData = await response.json();
            console.log(weatherData);
            
            if(weatherData){
                setWeatherData(weatherData);
            }
        } catch (error) {
            console.log(error);
        }
    },[])

    return (
        <View style={styles.container}>
        <Text>Weather</Text>
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
    }
});

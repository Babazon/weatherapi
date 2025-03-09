import { View, Text } from "react-native";
import { CurrentWeatherResponse, Maybe } from "../services/weatherApi/weatherTypes";
import { WithError } from "./hoc/WithError";

interface Props {
    weatherData: Maybe<CurrentWeatherResponse>
}

export const CurrentWeatherDisplay:React.FC<Props> = ({weatherData}) => {
    return (
        <View>
            <Text>{weatherData?.location.name}</Text>
            <Text>{weatherData?.current.temp_c}</Text>
            <Text>{weatherData?.current.condition.text}</Text>
        </View>
    )
};


export const CurrentWeatherDisplayWithError = WithError(CurrentWeatherDisplay)
import { View, Text, Image,StyleSheet  } from "react-native";
import { CurrentWeatherResponse, Maybe } from "../services/weatherApi/weatherTypes";
import { WithError } from "./hoc/WithError";
import { formatTemp } from "../utils/formatTemp";
import { useMemo } from "react";
import { formatIconUrl } from "../utils/formattedIconUrl";

interface Props {
    weatherData: Maybe<CurrentWeatherResponse>
}

export const CurrentWeatherDisplay:React.FC<Props> = ({weatherData}) => {

    const formattedTemp = useMemo(()=>formatTemp(weatherData?.current.temp_c), [weatherData?.current.temp_c]);
    const formattedIconUrl = useMemo(()=>formatIconUrl(weatherData?.current.condition.icon), [weatherData?.current.condition.icon]);

    return (
        <View>
            <Text>{weatherData?.location.name}</Text>
            <Text>{formattedTemp}</Text>
            <Text>{weatherData?.current.condition.text}</Text>
            <Image source={{uri: formattedIconUrl}} style={styles.icon}/>
        </View>
    )
};

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
    }
});


export const CurrentWeatherDisplayWithError = WithError(CurrentWeatherDisplay)
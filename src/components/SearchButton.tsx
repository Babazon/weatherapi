import { Button } from "react-native"

interface Props {
    fetchWeatherData: () => Promise<void>
}

export const SearchButton:React.FC<Props> = ({fetchWeatherData}) => {
    return (
        <Button title="Fetch Weather" onPress={fetchWeatherData}/>

    )
}
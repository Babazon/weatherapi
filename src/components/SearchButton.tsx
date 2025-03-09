import { Button } from "react-native"
import { WithLoading } from "./hoc/WithLoading"

interface Props {
    fetchWeatherData: () => Promise<void>
}

export const SearchButton:React.FC<Props> = ({fetchWeatherData}) => {
    return (
        <Button title="Fetch Weather" onPress={fetchWeatherData}/>

    )
}

export const SearchButtonWithLoading = WithLoading(SearchButton)
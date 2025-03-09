import { TextInput, StyleSheet } from "react-native"

interface Props {
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>
}

export const InputField:React.FC<Props> = ({location, setLocation}) => {
    return (
        <TextInput placeholder="Enter city name" value={location} onChangeText={setLocation} style={styles.textInput}/>

    )
}

const styles = StyleSheet.create({
       textInput: {
        height: 50,
        width: 200,
        backgroundColor: 'whitesmoke',
        borderColor: 'grey',
        borderWidth: 1,
    }

})
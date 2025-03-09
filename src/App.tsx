import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Weather } from './containers/Weather';
import { WeatherContextProvider } from './context/WeatherContext';

export default function App() {
  return (
    <View style={styles.container}>
      <WeatherContextProvider>
        <Weather/>
        <StatusBar style="auto" />
      </WeatherContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

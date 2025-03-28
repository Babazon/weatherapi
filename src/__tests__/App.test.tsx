import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import App from '../App';
import { Weather } from '../containers/Weather';
import { WeatherContextProvider } from '../context/WeatherContext';

// Mock the Weather component
jest.mock('./containers/Weather', () => ({
  Weather: jest.fn(() => ({ type: 'mock-weather-container' })),
}));

// Mock the StatusBar
jest.mock('expo-status-bar', () => ({
  StatusBar: jest.fn(() => ({ type: 'mock-status-bar' })),
}));

// Mock react-native
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  View: jest.fn(({ children, ...props }) => ({
    type: 'mock-view',
    props: { children, ...props },
  })),
  StyleSheet: { create: jest.fn((styles) => styles) },
}));

describe('App Component', () => {
  it('renders the WeatherContextProvider and Weather component', () => {
    render(<App />);

    expect(WeatherContextProvider).toBeTruthy();
    expect(Weather).toHaveBeenCalled();
    expect(StatusBar).toHaveBeenCalled();
    expect(screen.getByTestId('app-container')).toBeTruthy();
  });

  it('applies the correct styles to the container', () => {
    render(<App />);
    const container = screen.getByTestId('app-container');

    expect(container).toHaveStyle({
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    });
  });
});

//add testID to the container view
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//Added the testID to the view.
function AppWithTestId() {
  return (
    <View style={styles.container} testID="app-container">
      <WeatherContextProvider>
        <Weather/>
        <StatusBar style="auto" />
      </WeatherContextProvider>
    </View>
  );
}

export default AppWithTestId;
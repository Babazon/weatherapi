# WeatherApp4 README

## Table of Contents

1. [Project Overview](#project-overview)
2. [Modularity and Composition](#modularity-and-composition)
3. [SOLID Principles](#solid-principles)
4. [Project Structure](#project-structure)
5. [Installation and Setup](#installation-and-setup)
6. [Running the App](#running-the-app)
7. [Testing](#testing)

## Project Overview

WeatherApp4 is a cross-platform mobile application built using React Native and TypeScript. The app allows users to search for current weather information by entering a city name. It fetches data from a weather API and displays the results in a user-friendly interface.

## Modularity and Composition

The project is designed with modularity and composition in mind. Here's how the code is organized:

- Components: Contains reusable UI components such as `CurrentWeatherDisplay`, `InputField`, `SearchButton`, and higher-order components like `WithError` and `WithLoading`.
- Constants: Contains constants like API endpoints and other configuration values.
- Containers: Contains the main container components that manage the state and logic for the app. In this case, there's only one container: `Weather`.
- Context: Contains the context provider and hooks for managing global state. In this case, there's only one context: `WeatherContext`.
- Hooks: Contains custom React hooks for fetching weather data. In this case, there's only one hook: `useWeather`.
- Services: Contains the HTTP adapter and the weather API service. The HTTP adapter is responsible for making HTTP requests, while the weather API service handles the specific API calls.
- Utils: Contains utility functions for formatting temperature and generating icon URLs.

## SOLID Principles

The project follows the SOLID principles, which are fundamental design principles for software development. Here's how they are applied:

- Single Responsibility Principle (SRP): Each file or class has a single responsibility, such as fetching weather data, displaying weather information, or managing global state.
- Open/Closed Principle (OCP): The code is open for extension but closed for modification. For example, if a new type of weather data needs to be displayed, a new component can be added without modifying existing components.
- Liskov Substitution Principle (LSP): The code should be able to be replaced with instances of its subtypes without altering the correctness of the program. For example, the `WithError` and `WithLoading` higher-order components can be used with any component to add error handling and loading indicators.
- Interface Segregation Principle (ISP): The interfaces are designed to be specific and focused, rather than providing a large, general interface. For example, the `WeatherApi` interface only includes methods related to fetching weather data.
- Dependency Inversion Principle (DIP): The code depends on abstractions, not concrete implementations. For example, the `Weather` container depends on the `useWeather` hook, not on the `WeatherApi` service directly.
  
## Project Structure  
  
The project structure is as follows:  


weatherapp4/  
├── app.json  
├── index.ts  
├── jest.config.js  
├── package-lock.json  
├── package.json  
├── tsconfig.json  
├── assets/  
│   ├── adaptive-icon.png  
│   ├── favicon.png  
│   ├── icon.png  
│   └── splash-icon.png  
├── coverage/  
│   ├── clover.xml  
│   ├── coverage-final.json  
│   ├── lcov.info  
│   └── lcov-report/  
│       └── ...  
├── src/  
│   ├── App.tsx  
│   ├── tests/  
│   │   └── App.test.tsx  
│   ├── components/  
│   │   ├── CurrentWeatherDisplay.tsx  
│   │   ├── InputField.tsx  
│   │   ├── SearchButton.tsx  
│   │   ├── tests/  
│   │   │   ├── CurrentWeatherDisplay.test.tsx  
│   │   │   ├── InputField.test.tsx  
│   │   │   ├── SearchButton.test.tsx  
│   │   │   ├── WithError.test.tsx  
│   │   │   └── WithLoading.test.tsx  
│   │   └── hoc/  
│   │       ├── WithError.tsx  
│   │       └── WithLoading.tsx  
│   ├── constants/  
│   │   └── constants.ts  
│   ├── containers/  
│   │   └── Weather.tsx  
│   ├── context/  
│   │   ├── WeatherContext.tsx  
│   │   └── tests/  
│   │       └── WeatherContext.test.tsx  
│   ├── hooks/  
│   │   ├── useWeather.ts  
│   │   └── tests/  
│   │       └── useWeather.test.tsx  
│   ├── services/  
│   │   ├── httpAdapter.ts  
│   │   ├── tests/  
│   │   │   ├── httpAdapter.test.tsx  
│   │   │   └── weatherApi.test.tsx  
│   │   └── weatherApi/  
│   │       ├── weatherApi.ts  
│   │       └── weatherTypes.ts  
│   └── utils/  
│       ├── formatTemp.ts  
│       ├── formattedIconUrl.ts  
│       └── tests/  
│           └── formatTemp.test.tsx  
└── ...  
  
  
import React from 'react';
import SearchCity from './SearchCity';
import WeatherForecast from './WeatherForecast';
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyles, Main } from "./Styles";
import { useWeatherData } from './WeatherData';

export default function App() {
  const { city, setCity, fetchWeather, weather, history, setHistory, error } = useWeatherData(); // Destructure setHistory from the hook

  const clearWeatherHistory = () => {
    // Clear the history state and localStorage
    setHistory([]);  // Use setHistory directly from the hook
    localStorage.removeItem('weatherHistory');
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles /> 
      <Main className="App">
        <SearchCity 
          city={city} 
          setCity={setCity} 
          fetchWeather={fetchWeather} 
          error={error}
          clearWeatherHistory={clearWeatherHistory} // Pass the function
        />
        <WeatherForecast 
          city={city} 
          weather={weather} 
          history={history} 
        />
      </Main>
    </ThemeProvider>
  );
}

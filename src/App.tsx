import React from 'react';
import SearchCity from './SearchCity';
import WeatherForecast from './WeatherForecast';
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyles, Main } from "./Styles";
import { useWeatherData } from './WeatherData';


export default function App() {
  const { city, setCity, fetchWeather, weather, error } = useWeatherData();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles /> 
      <Main className="App">
        <SearchCity city={city} setCity={setCity} fetchWeather={fetchWeather} error={error} />
        <WeatherForecast city={city} weather={weather} />
      </Main>
    </ThemeProvider>
  );
}

import React from 'react';
import SearchCity from './SearchCity';
import WeatherForecast from './WeatherForecast';
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyles, Main } from "./Styles";
import { useWeatherData } from './WeatherData';

export default function App() {
  const { city, setCity, fetchWeather, weather, history, setHistory, error } = useWeatherData(); 
  
  

  // Function to clear weather history
  const clearWeather = () => {
    setHistory([]); // Use setHistory directly from the hook
    localStorage.removeItem('weatherHistory');
  };

  // Function to remove a city from the weather history
  const removeCityFromHistory = (cityToRemove: string) => {
    const updatedHistory = history.filter((entry) => entry.city !== cityToRemove);
    setHistory(updatedHistory);
    // Optionally, update localStorage with the new history
    localStorage.setItem('weatherHistory', JSON.stringify(updatedHistory));
  };

  // Modify fetchWeather to clear the input field after fetching
  const handleFetchWeather = () => {
    fetchWeather();  // Call the existing fetchWeather function
    setCity('');     // Clear the input field by setting city to an empty string
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles /> 
      <Main className="App">
        <SearchCity 
          city={city} 
          setCity={setCity} 
          fetchWeather={handleFetchWeather}  // Use the new handleFetchWeather function
          error={error}
          clearWeather={clearWeather} // Pass the function
        />
        <WeatherForecast 
          city={city} 
          weather={weather} 
          history={history} 
          removeCityFromHistory={removeCityFromHistory} // Pass the removeCityFromHistory function
        />
      </Main>
    </ThemeProvider>
  );
}

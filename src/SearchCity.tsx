import React from 'react';
import { Header, Nav, Input, Button } from "./Styles";

interface SearchCityProps {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  fetchWeather: () => void;
  error: string | null;
  clearWeatherHistory: () => void; // Add a new function for clearing the history
}

export default function SearchCity({
  city,
  setCity,
  fetchWeather,
  error,
  clearWeatherHistory,
}: SearchCityProps) {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <>
      <Header>
        <h1>Weather App</h1>
        <h3>by BlackT</h3>
      </Header>
      <Nav>
        <Input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.currentTarget.value)} 
          onKeyPress={handleKeyPress}
          placeholder="Enter your city name"
        />
        <Button 
          onClick={fetchWeather}
        >
          Show Me
        </Button>
        <Button 
          onClick={clearWeatherHistory}
          style={{ backgroundColor: '#ff6347' }} // You can customize the color
        >
          Clear Weather
        </Button>
        {error && <p>{error}</p>}
      </Nav>
    </>
  );
}

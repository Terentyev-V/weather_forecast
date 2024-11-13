import React from 'react';
import { Header, Nav, Input, Button } from "./Styles";

interface SearchCityProps {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  fetchWeather: () => void;
  error: string | null;
}

export default function SearchCity({
  city,
  setCity,
  fetchWeather,
  error,
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
        {error && <p>{error}</p>}
      </Nav>
    </>
  );
}

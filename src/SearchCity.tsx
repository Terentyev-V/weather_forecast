import React, { useState } from 'react';
import { Header, Nav, Input, ButtonGroupe, Button, Button2 } from './Styles';
import { CitiesEN, CitiesUA, CitiesRU } from './citiesList';
import Fuse from 'fuse.js';
import { useWeatherData } from './WeatherData';

interface SearchCityProps {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  fetchWeather: () => void;
  clearWeather: () => void;
  error: string | null;
}

export default function SearchCity({
  city,
  setCity,
  fetchWeather,
  clearWeather,
  error,
}: SearchCityProps) {
  const [suggestedCities, setSuggestedCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { setError } = useWeatherData(); // Destructure setError from useWeatherData hook

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    setCity(userInput);

    if (userInput.length >= 3) {
      setLoading(true);

      try {
        const allCities = [...CitiesEN, ...CitiesUA, ...CitiesRU];
        const apiCities = await fetchCitiesFromAPI(userInput);

        const allCitiesWithAPI = [...allCities, ...apiCities];
        
        // Set up Fuse.js for fuzzy search
        const fuse = new Fuse(allCitiesWithAPI, {
          includeScore: true,
          threshold: 0.3,
        });

        // Get the cities that match the user's input
        const results = fuse.search(userInput);

        // Sort and set the suggested cities
        setSuggestedCities(results.map(result => result.item).sort());

        setLoading(false);
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
        setSuggestedCities([]);
        setLoading(false);
      }
    } else {
      setSuggestedCities([]);
    }
  };

  const fetchCitiesFromAPI = async (query: string) => {
    try {
      const API_KEY = '37717c9fd5ff815ce373659ae9777c5a';

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${API_KEY}&units=metric`
      );
      
      const data = await response.json();
      
      if (data.cod === '200') {
        return data.list.map((city: any) => city.name);
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching cities from OpenWeatherMap API:', error);
      return [];
    }
  };

  const handleSelectCity = (selectedCity: string) => {
    setCity(selectedCity); 
    fetchWeather(); 
    setSuggestedCities([]);
  };

  const handleClearInput = () => {
    clearWeather();
    setCity('');
    setSuggestedCities([]);
    setError(null);  // Clear any error when clearing the input
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
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              fetchWeather();
              setSuggestedCities([]); // Clear suggested cities
            }
          }}
          placeholder={loading ? 'Searching...' : 'Enter your city name'}
        /> 
        
        
        {suggestedCities.length > 0 && !loading && (
          <div>
            <ul>
              {suggestedCities.map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectCity(city)} // Select city and clear suggestions
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <ButtonGroupe>
          <Button onClick={fetchWeather}>Show ME</Button>
          <Button2 className="button2" onClick={handleClearInput}>Cut Them ALL</Button2>
        </ButtonGroupe>
        {error && <p>{error}</p>}
      </Nav>
    </>
  );
}

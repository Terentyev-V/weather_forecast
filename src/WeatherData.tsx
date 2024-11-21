import { useState, useEffect } from 'react';

// Define the WeatherData type
export interface WeatherData {
  dt: number;
  temp: number;
  feels_like: number;
  description: string;
  icon: string;
  visibility: number;
  wind_speed: number;
  rain: number;
  snow: number;
}

export function useWeatherData() {
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [history, setHistory] = useState<{ city: string; data: WeatherData }[]>([]);

  // Load history from localStorage on component mount
  useEffect(() => {
    const storedHistory = localStorage.getItem('weatherHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Save history to localStorage whenever history changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('weatherHistory', JSON.stringify(history));
    }
  }, [history]);

  const fetchWeather = () => {
    const apiKey = '37717c9fd5ff815ce373659ae9777c5a';
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        if (json.cod === "404") {
          setError('City not found');
          setWeather(null);
        } else {
          const newWeather: WeatherData = {
            dt: json.dt,
            temp: json.main.temp,
            description: json.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`,
            feels_like: json.main.feels_like,
            visibility: json.visibility,
            wind_speed: json.wind.speed,
            rain: json.rain ? json.rain['1h'] || 0 : 0,
            snow: json.snow ? json.snow['1h'] || 0 : 0,
          };

          // Check if the city already exists in the history
          const cityIndex = history.findIndex(entry => entry.city.toLowerCase() === city.toLowerCase());

          if (cityIndex !== -1) {
            // City already exists, update its weather data and move it to the top
            const updatedHistory = [...history];
            updatedHistory[cityIndex] = { city, data: newWeather };

            // Remove the city from the old position and add it to the top
            updatedHistory.unshift(updatedHistory.splice(cityIndex, 1)[0]);

            setHistory(updatedHistory);
          } else {
            // City doesn't exist, add it to the history
            setHistory(prevHistory => [
              { city, data: newWeather },
              ...prevHistory,
            ]);
          }

          setWeather(newWeather);
          setError(null);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError('An error occurred');
        setWeather(null);
      });
  };

  return { city, setCity, fetchWeather, weather, history, setHistory, error, setError }; // Make sure setHistory is returned
}

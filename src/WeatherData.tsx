import { useState } from 'react';

export function useWeatherData() {
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<{
    dt: number,
    temp: number,
    feels_like: number,
    description: string,
    icon: string,
    visibility: number,
    wind_speed: number,
    rain: number
  } | null>(null);

  const fetchWeather = () => {
    const apiKey = '48c3e694d352587a0588cb4f59b1ff3b';
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
          setWeather({
            dt: json.dt,
            temp: json.main.temp,
            description: json.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`,
            feels_like: json.main.feels_like,
            visibility: json.visibility,
            wind_speed: json.wind.speed,
            rain: json.rain ? json.rain['1h'] || 0 : 0
          });
          setError(null);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError('An error occurred');
        setWeather(null);
      });
  };

  return { city, setCity, fetchWeather, weather, error };
}

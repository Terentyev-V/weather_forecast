import React from 'react';

import {
  Section,
} from "./Styles";

interface WeatherProps {
  city: string;
  weather: {
    dt: number,
    temp: number,
    feels_like: number,
    description: string,
    icon: string,
    visibility: number,
    wind_speed: number,
    rain: number
  } | null;
}

export default function WeatherForecast({ city, weather }: WeatherProps) {
  return (
    <>
      {weather && (
        <Section>
          <h2>Weather in <span className="cityName">{city}</span></h2>
          <p>Date: {new Date(weather.dt * 1000).toLocaleString(undefined, { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'long', day: 'numeric', hour12: false })}</p>
          <p>Temperature: {weather.temp} °C</p> 
          <p>Feels Like: {weather.feels_like} °C</p> 
          <img src={weather.icon} alt={weather.description} />
          <p>Description: {weather.description}</p> 
          <p>Visibility: {weather.visibility} metres</p>
          <p>Wind Speed: {weather.wind_speed} metre/sec</p> 
          <p>Rain: {weather.rain > 0 ? `${weather.rain} mm/h` : "No data"}</p>
        </Section>
      )}
    </>
  );
}

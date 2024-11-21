import React, { useEffect, useRef } from 'react';
import { Section, SectionOut } from './Styles';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Close';

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

interface WeatherProps {
  city: string;
  weather: WeatherData | null;
  history: { city: string; data: WeatherData }[];
  removeCityFromHistory: (city: string) => void; // Callback to remove a city from history
}

export default function WeatherForecast({ city, weather, history, removeCityFromHistory }: WeatherProps) {
  const historyContainerRef = useRef<HTMLDivElement>(null);

  // Center the first item on mount
  useEffect(() => {
    if (historyContainerRef.current) {
      // Scroll the container to the first item
      historyContainerRef.current.scrollLeft = historyContainerRef.current.scrollWidth / 2 - historyContainerRef.current.clientWidth / 2;
    }
  }, [history]);

  // Handle delete click
  const handleDeleteClick = (cityToRemove: string) => {
    removeCityFromHistory(cityToRemove);
  };

  return (
    <>
      <SectionOut 
        ref={historyContainerRef}
      > 
        {history.map((entry, index) => (
          <Section key={index}>
            <h2>
              Weather in <span className="cityName">{entry.city}</span>
            </h2>
            <p>
              Date: {new Date(entry.data.dt * 1000).toLocaleString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour12: false,
              })}
            </p>
            <p>Temperature: {Math.round(entry.data.temp * 10) / 10} °C</p>
            <p>Feels Like: {Math.round(entry.data.feels_like * 10) / 10} °C</p>
            <img src={entry.data.icon} alt={entry.data.description} />
            <p>Description: {entry.data.description}</p>
            <p>Visibility: {entry.data.visibility} metres</p>
            <p>Wind Speed: {Math.round(entry.data.wind_speed * 10) / 10} metre/sec</p>
            <p>Rain: {entry.data.rain > 0 ? `${Math.round(entry.data.rain * 10) / 10} mm/h` : 'No data'}</p>
            <p>Snow: {entry.data.snow > 0 ? `${Math.round(entry.data.snow * 10) / 10} mm/h` : 'No data'}</p>

            <Fab onClick={() => handleDeleteClick(entry.city)}>
              <DeleteIcon />
            </Fab>
          </Section>
        ))}
      </SectionOut>
    </>
  );
}

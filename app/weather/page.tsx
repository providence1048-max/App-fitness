'use client';

import { useState, useEffect } from 'react';
import WeatherCard from '@/components/WeatherCard';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { WeatherData } from '@/types/weather';

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('London');

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeather(data);
      setCity(cityName);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchCity: string) => {
    if (searchCity.trim()) {
      fetchWeather(searchCity);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Weather Dashboard
          </h1>
          <p className="text-blue-100">Check the weather for your workout location</p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && <ErrorMessage message={error} />}

        {/* Weather Display */}
        {weather && !loading && (
          <div className="grid md:grid-cols-2 gap-6">
            <WeatherCard weather={weather} />
            
            {/* Forecast */}
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">📊 Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Feels Like:</span>
                  <span className="font-semibold">{Math.round(weather.main.feels_like)}°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Humidity:</span>
                  <span className="font-semibold">{weather.main.humidity}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Pressure:</span>
                  <span className="font-semibold">{weather.main.pressure} hPa</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Visibility:</span>
                  <span className="font-semibold">{(weather.visibility / 1000).toFixed(1)} km</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Wind Speed:</span>
                  <span className="font-semibold">{weather.wind.speed} m/s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Wind Direction:</span>
                  <span className="font-semibold">{weather.wind.deg}°</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Message */}
        {!weather && !loading && !error && (
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-12 text-center text-white">
            <p className="text-xl">Search for a city to see the weather forecast</p>
          </div>
        )}
      </div>
    </main>
  );
}

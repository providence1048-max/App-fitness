import { NextRequest, NextResponse } from 'next/server';

interface OpenMeteoWeather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
}

const weatherCodeMap: { [key: number]: string } = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

// Geocode city name to coordinates using Open-Meteo Geocoding API
async function geocodeCity(city: string): Promise<{ lat: number; lon: number }> {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
    
    if (!response.ok) {
      throw new Error('Geocoding failed');
    }
    
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      throw new Error('City not found');
    }
    
    const result = data.results[0];
    return {
      lat: result.latitude,
      lon: result.longitude,
    };
  } catch (error) {
    throw new Error('Failed to geocode city');
  }
}

// Fetch weather from Open-Meteo (No API key required!)
async function fetchOpenMeteoWeather(
  lat: number,
  lon: number,
  city: string
): Promise<any> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather');
    }
    
    const data: OpenMeteoWeather = await response.json();
    
    return {
      coord: { lon, lat },
      weather: [
        {
          id: data.current.weather_code,
          main: weatherCodeMap[data.current.weather_code] || 'Unknown',
          description: weatherCodeMap[data.current.weather_code] || 'Unknown',
          icon: '01d',
        },
      ],
      main: {
        temp: Math.round(data.current.temperature_2m),
        feels_like: Math.round(data.current.temperature_2m),
        temp_min: Math.round(data.current.temperature_2m),
        temp_max: Math.round(data.current.temperature_2m),
        pressure: 1013,
        humidity: data.current.relative_humidity_2m,
      },
      visibility: 10000,
      wind: {
        speed: data.current.wind_speed_10m,
        deg: data.current.wind_direction_10m,
      },
      clouds: { all: 0 },
      sys: {
        country: 'XX',
        sunrise: Math.floor(Date.now() / 1000),
        sunset: Math.floor(Date.now() / 1000),
      },
      name: city,
    };
  } catch (error) {
    throw new Error('Failed to fetch weather from Open-Meteo');
  }
}

// Fetch weather from OpenWeatherMap (Requires API key)
async function fetchOpenWeatherMapWeather(
  city: string,
  apiKey: string
): Promise<any> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found');
      }
      throw new Error('Failed to fetch weather from OpenWeatherMap');
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const provider = searchParams.get('provider') || 'open-meteo'; // Default to Open-Meteo

  if (!city) {
    return NextResponse.json(
      { error: 'City parameter is required' },
      { status: 400 }
    );
  }

  try {
    let weatherData;

    if (provider === 'openweathermap') {
      // Use OpenWeatherMap if API key is provided
      const apiKey = process.env.OPENWEATHER_API_KEY;

      if (!apiKey) {
        return NextResponse.json(
          { error: 'OpenWeatherMap API key is not configured. Using Open-Meteo instead.' },
          { status: 200 }
        );
      }

      weatherData = await fetchOpenWeatherMapWeather(city, apiKey);
    } else {
      // Default to Open-Meteo (No API key needed!)
      const { lat, lon } = await geocodeCity(city);
      weatherData = await fetchOpenMeteoWeather(lat, lon, city);
    }

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
    
    if (errorMessage === 'City not found') {
      return NextResponse.json(
        { error: 'City not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

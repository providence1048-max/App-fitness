# Fitness App with Weather Dashboard

A Next.js application for fitness tracking with an integrated weather dashboard to help you plan your workouts.

## Features

### 🏋️ Fitness Tracking
- Track your workouts
- Monitor your fitness goals
- View statistics and progress

### 🌤️ Weather Dashboard
- Real-time weather data from OpenWeatherMap
- Search weather by city
- Detailed weather information including:
  - Current temperature and conditions
  - "Feels like" temperature
  - Humidity and pressure
  - Wind speed and direction
  - Visibility
  - Min/Max temperature

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Weather API**: OpenWeatherMap API
- **Styling**: Tailwind CSS with modern glass morphism design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/providence1048-max/app-fitness.git
cd app-fitness
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
OPENWEATHER_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser

## Project Structure

```
app-fitness/
├── app/
│   ├── api/
│   │   └── weather/
│   │       └── route.ts          # Weather API endpoint
│   ├── weather/
│   │   └── page.tsx              # Weather dashboard page
│   ├── layout.tsx                # Root layout with navigation
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── SearchBar.tsx             # City search component
│   ├── WeatherCard.tsx           # Weather display component
│   ├── LoadingSpinner.tsx        # Loading state component
│   └── ErrorMessage.tsx          # Error state component
├── types/
│   └── weather.ts                # TypeScript type definitions
├── .devcontainer/
│   └── devcontainer.json         # Codespace configuration
├── package.json
├── tsconfig.json
└── next.config.js
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENWEATHER_API_KEY` | OpenWeatherMap API key | Yes |

## API Routes

### GET `/api/weather?city={cityName}`

Fetches weather data for a specific city.

**Query Parameters:**
- `city` (string, required): City name to search for

**Response:**
```json
{
  "coord": { "lon": -0.1257, "lat": 51.5085 },
  "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }],
  "main": { "temp": 15, "feels_like": 14, "temp_min": 13, "temp_max": 17, "pressure": 1013, "humidity": 65 },
  "visibility": 10000,
  "wind": { "speed": 3.5, "deg": 230 },
  "clouds": { "all": 0 },
  "sys": { "country": "GB", "sunrise": 1621486800, "sunset": 1621544400 },
  "name": "London"
}
```

## Features in Development

- [ ] Weather forecast for multiple days
- [ ] Favorite locations
- [ ] Workout recommendations based on weather
- [ ] Weather alerts
- [ ] Workout logging and statistics

## Contributing

Feel free to submit pull requests and open issues!

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.

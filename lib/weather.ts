import type { IslandStatus, WeatherUpdate } from "@/data/mock-data";

const SANTORINI = { latitude: 36.3932, longitude: 25.4615 };

type OpenMeteoResponse = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    uv_index_max: number[];
    wind_speed_10m_max: number[];
  };
};

export type WeatherApiData = {
  current: Pick<IslandStatus, "temperature" | "condition" | "feelsLike" | "windSpeed" | "windDirection" | "uvIndex" | "uvLevel">;
  forecast: WeatherUpdate[];
  lastUpdated: string;
  source: "Open-Meteo" | "Fallback mock data";
};

export async function getSantoriniWeather(): Promise<WeatherApiData> {
  const params = new URLSearchParams({
    latitude: String(SANTORINI.latitude),
    longitude: String(SANTORINI.longitude),
    current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,wind_speed_10m_max",
    timezone: "Europe/Athens",
    forecast_days: "5",
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
    next: { revalidate: 1800 },
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Open-Meteo request failed with ${response.status}`);
  }

  const data = (await response.json()) as OpenMeteoResponse;
  const uvIndex = Math.round(data.daily.uv_index_max[0] ?? 0);

  return {
    current: {
      temperature: Math.round(data.current.temperature_2m),
      condition: weatherCodeLabel(data.current.weather_code),
      feelsLike: Math.round(data.current.apparent_temperature),
      windSpeed: Math.round(data.current.wind_speed_10m),
      windDirection: compassDirection(data.current.wind_direction_10m),
      uvIndex,
      uvLevel: uvLevel(uvIndex),
    },
    forecast: data.daily.time.map((date, index) => ({
      day: index === 0 ? "Today" : new Intl.DateTimeFormat("en", { weekday: "long", timeZone: "Europe/Athens" }).format(new Date(`${date}T12:00:00+03:00`)),
      date: new Intl.DateTimeFormat("en", { month: "short", day: "numeric", timeZone: "Europe/Athens" }).format(new Date(`${date}T12:00:00+03:00`)),
      condition: weatherCodeLabel(data.daily.weather_code[index]) as WeatherUpdate["condition"],
      high: Math.round(data.daily.temperature_2m_max[index]),
      low: Math.round(data.daily.temperature_2m_min[index]),
      wind: Math.round(data.daily.wind_speed_10m_max[index]),
      icon: weatherIcon(data.daily.weather_code[index]),
    })),
    lastUpdated: new Date().toISOString(),
    source: "Open-Meteo",
  };
}

function weatherCodeLabel(code: number): "Sunny" | "Partly cloudy" | "Windy" {
  if (code <= 1) return "Sunny";
  if (code <= 3) return "Partly cloudy";
  return "Windy";
}

function weatherIcon(code: number): WeatherUpdate["icon"] {
  if (code <= 1) return "sun";
  if (code <= 3) return "cloud";
  return "wind";
}

function uvLevel(index: number) {
  if (index >= 8) return "Very high";
  if (index >= 6) return "High";
  if (index >= 3) return "Moderate";
  return "Low";
}

function compassDirection(degrees: number) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(degrees / 45) % 8];
}

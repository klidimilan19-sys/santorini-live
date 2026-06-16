"use client";

import { CloudSun, LoaderCircle, Sun, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import type { WeatherApiData } from "@/lib/weather";

export function LiveWeatherPanel({ fallback }: { fallback: WeatherApiData }) {
  const [weather, setWeather] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/weather")
      .then((response) => response.json())
      .then((data: WeatherApiData) => setWeather(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-aegean-600 to-aegean-950 p-7 text-white shadow-card sm:p-10">
      <div className="absolute -right-12 -top-16 size-72 rounded-full bg-white/10 blur-2xl" />
      <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-white/60">Fira, Santorini · Updated {formatUpdated(weather.lastUpdated)} {loading && <LoaderCircle size={14} className="animate-spin" />}</p>
          <div className="mt-4 flex items-center gap-6"><Sun className="text-amber-300" size={74} strokeWidth={1.6} /><p className="font-display text-7xl font-extrabold tracking-[-0.06em]">{weather.current.temperature}°</p></div>
          <h2 className="mt-4 font-display text-2xl font-extrabold">{weather.current.condition}</h2>
          <p className="mt-2 text-white/65">Feels like {weather.current.feelsLike}° · Source: {weather.source}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <WeatherStat icon={Wind} label="Wind" value={`${weather.current.windSpeed} km/h ${weather.current.windDirection}`} />
          <WeatherStat icon={Sun} label="UV index" value={`${weather.current.uvIndex} · ${weather.current.uvLevel}`} />
          <WeatherStat icon={CloudSun} label="Forecast cache" value="30 minutes" />
          <WeatherStat icon={Sun} label="Next refresh" value="Automatic" />
        </div>
      </div>
    </div>
  );
}

function WeatherStat({ icon: Icon, label, value }: { icon: typeof Sun; label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><Icon size={20} className="text-[#79c8ff]" /><p className="mt-3 text-xs text-white/50">{label}</p><p className="mt-1 font-display text-lg font-extrabold">{value}</p></div>;
}

function formatUpdated(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Athens" }).format(date);
}

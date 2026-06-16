import type { Metadata } from "next";
import { CarFront, CloudSun, Plane, Ship, Sun, Users, Wind } from "lucide-react";
import { LiveWeatherPanel } from "@/components/live-weather-panel";
import { PageHero } from "@/components/page-hero";
import { islandStatus, weatherUpdates } from "@/data/mock-data";

export const metadata: Metadata = { title: "Weather" };

const weatherIcon = {
  sun: Sun,
  cloud: CloudSun,
  wind: Wind,
};

export default function WeatherPage() {
  return (
    <>
      <PageHero eyebrow="Live island weather" title="Chase the sun, know the wind." description="A clear look at Santorini conditions for beach days, boat trips and sunset plans." />
      <section className="section-shell -mt-8 pb-20">
        <LiveWeatherPanel fallback={{
          current: {
            temperature: islandStatus.temperature,
            condition: islandStatus.condition,
            feelsLike: islandStatus.feelsLike,
            windSpeed: islandStatus.windSpeed,
            windDirection: islandStatus.windDirection,
            uvIndex: islandStatus.uvIndex,
            uvLevel: islandStatus.uvLevel,
          },
          forecast: weatherUpdates,
          lastUpdated: islandStatus.lastUpdated,
          source: "Fallback mock data",
        }} />

        <div className="mt-12">
          <p className="text-sm font-bold text-aegean-700">5-day outlook</p>
          <h2 className="mt-1 font-display text-2xl font-extrabold">The week ahead</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-5">
            {weatherUpdates.map((update) => {
              const Icon = weatherIcon[update.icon];
              return (
                <article key={update.day} className="rounded-3xl border border-aegean-900/10 bg-white p-5 text-center">
                  <p className="font-display font-extrabold">{update.day}</p><p className="mt-1 text-xs text-aegean-950/40">{update.date}</p>
                  <Icon className="mx-auto my-5 text-sunset" size={36} strokeWidth={1.7} />
                  <p className="text-sm font-semibold">{update.condition}</p>
                  <p className="mt-3 font-display text-xl font-extrabold">{update.high}° <span className="text-aegean-950/35">{update.low}°</span></p>
                  <p className="mt-2 text-xs text-aegean-950/40">Wind {update.wind} km/h</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-12">
          <p className="text-sm font-bold text-aegean-700">Travel and island operations</p>
          <h2 className="mt-1 font-display text-2xl font-extrabold">Live status board</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatusCard icon={Ship} label="Ferry status" value={islandStatus.ferryStatus} detail="Athinios port services are running to timetable." tone="blue" />
            <StatusCard icon={Plane} label="Airport status" value={islandStatus.airportStatus} detail="No significant arrival or departure delays." tone="green" />
            <StatusCard icon={Users} label="Cruise arrivals" value={`${islandStatus.cruiseArrivals} ships today`} detail="Peak tender traffic expected around midday." tone="orange" />
            <StatusCard icon={CarFront} label="Traffic" value={islandStatus.trafficStatus} detail={islandStatus.trafficDetail} tone="amber" />
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl bg-amber-50 p-6"><Sun className="text-amber-600" /><h3 className="mt-4 font-display text-lg font-extrabold">UV index: {islandStatus.uvLevel}</h3><p className="mt-2 text-sm leading-6 text-aegean-950/55">Use SPF 30+ and seek shade around midday.</p></div>
          <div className="rounded-3xl bg-aegean-50 p-6"><Wind className="text-aegean-700" /><h3 className="mt-4 font-display text-lg font-extrabold">Marine conditions</h3><p className="mt-2 text-sm leading-6 text-aegean-950/55">Comfortable sailing today. Check your operator before departure.</p></div>
          <div className="rounded-3xl bg-orange-50 p-6"><Ship className="text-sunset" /><h3 className="mt-4 font-display text-lg font-extrabold">Port reminder</h3><p className="mt-2 text-sm leading-6 text-aegean-950/55">Allow extra time at Athinios during cruise and ferry peaks.</p></div>
        </div>
      </section>
    </>
  );
}

function StatusCard({ icon: Icon, label, value, detail, tone }: { icon: typeof Ship; label: string; value: string; detail: string; tone: "blue" | "green" | "orange" | "amber" }) {
  const colors = {
    blue: "bg-aegean-50 text-aegean-700",
    green: "bg-emerald-50 text-emerald-700",
    orange: "bg-orange-50 text-sunset",
    amber: "bg-amber-50 text-amber-700",
  };
  return (
    <article className="rounded-3xl border border-aegean-900/10 bg-white p-5">
      <span className={`grid size-11 place-items-center rounded-xl ${colors[tone]}`}><Icon size={21} /></span>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-aegean-950/35">{label}</p>
      <h3 className="mt-1 font-display text-lg font-extrabold">{value}</h3>
      <p className="mt-2 text-sm leading-6 text-aegean-950/50">{detail}</p>
    </article>
  );
}

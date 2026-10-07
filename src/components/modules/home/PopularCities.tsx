import { MapPin } from "lucide-react";
import Link from "next/link";
import { getCities } from "@/api/property.server";
import SectionHeading from "@/components/shared/SectionHeading";
import { safely } from "@/lib/safely";

export default async function PopularCities() {
  const cities = await safely(() => getCities());
  if (!cities || cities.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        title="Browse by city"
        description="Jump straight to the listings in your area."
      />
      <ul className="flex flex-wrap gap-3">
        {cities.slice(0, 8).map((city) => (
          <li key={city}>
            <Link
              href={`/properties?city=${encodeURIComponent(city)}`}
              className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <MapPin className="size-4 text-primary" />
              {city}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

// FeaturedProperties.tsx
import { Building2 } from "lucide-react";
import { getProperties } from "@/api/property.server";
import PropertyCard from "@/components/modules/property/PropertyCard";
import EmptyState from "@/components/shared/EmptyState";
import SectionHeading from "@/components/shared/SectionHeading";
import { safely } from "@/lib/safely";

export default async function FeaturedProperties() {
  const result = await safely(() =>
    getProperties({ limit: 3, sort: "newest" }),
  );
  const properties = result?.data ?? [];

  return (
    <section className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        title="Latest properties"
        description="Recently approved listings from verified owners on Nestly."
        href="/properties"
        linkLabel="View all properties"
      />
      {properties.length === 0 ? (
        <EmptyState
          icon={Building2}
          title={
            result ? "No properties yet" : "Listings are unavailable right now"
          }
          description={
            result
              ? "Approved properties will appear here."
              : "Please try again in a moment."
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
}

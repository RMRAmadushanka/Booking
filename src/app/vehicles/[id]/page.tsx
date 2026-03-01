import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StarIcon, MapPinIcon, CogIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { getVehicleById } from "@/lib/vehicles";
import { getVehicleReviews, getVehicleReviewStats } from "@/lib/reviews";
import VehicleRentalForm from "@/components/Vehicles/VehicleRentalForm";
import ReviewsSection from "@/components/Reviews/ReviewsSection";

function getGalleryImages(vehicle: { imageUrl: string; galleryUrls?: string[] }): string[] {
  if (Array.isArray(vehicle.galleryUrls) && vehicle.galleryUrls.length > 0) {
    return vehicle.galleryUrls;
  }
  return [vehicle.imageUrl];
}

function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(value) ? "text-amber-400" : "text-[var(--color-border)]"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-[var(--foreground)]">{value}</span>
    </div>
  );
}

export default async function VehicleDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ reviewPage?: string }>;
}) {
  const { id } = await params;
  const { reviewPage } = await searchParams;
  const page = Math.max(1, parseInt(String(reviewPage), 10) || 1);

  const [vehicle, reviewsData, reviewStats] = await Promise.all([
    getVehicleById(id),
    getVehicleReviews(id, page, 5),
    getVehicleReviewStats(id),
  ]);

  if (!vehicle) notFound();

  const displayRating = reviewStats.averageRating ?? vehicle.rating;
  const images = getGalleryImages(vehicle);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-[var(--color-muted)] mb-4">
          <Link href="/vehicles" className="hover:text-[var(--foreground)]">
            Vehicle Rentals
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--foreground)]">{vehicle.title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold border border-[var(--color-primary)]/20">
                {vehicle.vehicleType}
              </span>
              <Rating value={displayRating} />
              <span className="text-sm text-[var(--color-muted)]">
                ({reviewsData.total} review{reviewsData.total === 1 ? "" : "s"})
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-[var(--foreground)] tracking-tight">
              {vehicle.title}
            </h1>
            <p className="text-[var(--color-muted)] mt-3 leading-relaxed">{vehicle.description}</p>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                <CogIcon className="w-4 h-4 text-[var(--color-primary)]" />
                <span>{vehicle.transmission} · {vehicle.fuelType}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                <UserGroupIcon className="w-4 h-4 text-[var(--color-primary)]" />
                <span>{vehicle.seats} seats</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                <MapPinIcon className="w-4 h-4 text-[var(--color-primary)]" />
                <span>{vehicle.location}</span>
              </div>
              <div className="text-sm text-[var(--color-muted)]">
                {vehicle.brand} {vehicle.model} · {vehicle.year}
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-border)]/30 border border-[var(--color-border)] rounded-[var(--radius-md)] p-4 sm:p-5 w-full lg:w-[360px]">
            <div className="text-sm text-[var(--color-muted)]">Daily rate</div>
            <div className="mt-1">
              <span className="text-3xl font-bold text-[var(--color-primary)]">
                ${vehicle.pricePerDay}
              </span>
              <span className="text-sm text-[var(--color-muted)] ml-1">/day</span>
            </div>
            <div className="text-xs text-[var(--color-muted)] mt-2">
              Total depends on rental period. See form for estimate.
            </div>
            <Link
              href="#rental-form"
              className="mt-4 inline-flex w-full items-center justify-center px-5 py-3 bg-button-gradient text-white text-sm font-semibold rounded-[var(--button-radius)] transition-colors shadow-sm"
            >
              Rent this vehicle
            </Link>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
          <div className="lg:col-span-7 relative h-[320px] sm:h-[420px] rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)]/50">
            <Image
              src={images[0]}
              alt={vehicle.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {images.slice(1, 5).map((src, i) => (
              <div
                key={src}
                className="relative h-[152px] sm:h-[198px] rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)]/50"
              >
                <Image
                  src={src}
                  alt={`${vehicle.title} photo ${i + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column: specs + features */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                Specifications
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between py-2 border-b border-[var(--color-border)]/50">
                  <dt className="text-[var(--color-muted)]">Type</dt>
                  <dd className="font-medium text-[var(--foreground)]">{vehicle.vehicleType}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--color-border)]/50">
                  <dt className="text-[var(--color-muted)]">Brand / Model</dt>
                  <dd className="font-medium text-[var(--foreground)]">{vehicle.brand} {vehicle.model}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--color-border)]/50">
                  <dt className="text-[var(--color-muted)]">Year</dt>
                  <dd className="font-medium text-[var(--foreground)]">{vehicle.year}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--color-border)]/50">
                  <dt className="text-[var(--color-muted)]">Transmission</dt>
                  <dd className="font-medium text-[var(--foreground)]">{vehicle.transmission}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--color-border)]/50">
                  <dt className="text-[var(--color-muted)]">Fuel</dt>
                  <dd className="font-medium text-[var(--foreground)]">{vehicle.fuelType}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--color-border)]/50">
                  <dt className="text-[var(--color-muted)]">Seats</dt>
                  <dd className="font-medium text-[var(--foreground)]">{vehicle.seats}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--color-border)]/50">
                  <dt className="text-[var(--color-muted)]">Location</dt>
                  <dd className="font-medium text-[var(--foreground)]">{vehicle.location}</dd>
                </div>
              </dl>
            </section>

            <section className="bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-3">Features</h2>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 rounded-full bg-[var(--color-primary)]/5 border border-[var(--color-border)] text-sm text-[var(--foreground)]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </section>

            {/* Guest feedback */}
            <ReviewsSection
              data={reviewsData}
              basePath={`/vehicles/${id}`}
              emptyMessage="No reviews yet for this vehicle."
            />
          </div>

          {/* Right column: rental form */}
          <div className="lg:col-span-5">
            <div id="rental-form" className="scroll-mt-24">
              <VehicleRentalForm
                vehicleId={vehicle.id}
                vehicleTitle={vehicle.title}
                pricePerDay={vehicle.pricePerDay}
                defaultPickup={vehicle.location}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

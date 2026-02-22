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
              i < Math.floor(value) ? "text-amber-400" : "text-slate-300"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
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
        <div className="text-sm text-slate-500 mb-4">
          <Link href="/vehicles" className="hover:text-slate-700">
            Vehicle Rentals
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">{vehicle.title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                {vehicle.vehicleType}
              </span>
              <Rating value={displayRating} />
              <span className="text-sm text-slate-500">
                ({reviewsData.total} review{reviewsData.total === 1 ? "" : "s"})
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              {vehicle.title}
            </h1>
            <p className="text-slate-600 mt-3 leading-relaxed">{vehicle.description}</p>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CogIcon className="w-4 h-4 text-indigo-600" />
                <span>{vehicle.transmission} · {vehicle.fuelType}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <UserGroupIcon className="w-4 h-4 text-indigo-600" />
                <span>{vehicle.seats} seats</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPinIcon className="w-4 h-4 text-indigo-600" />
                <span>{vehicle.location}</span>
              </div>
              <div className="text-sm text-slate-600">
                {vehicle.brand} {vehicle.model} · {vehicle.year}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-[var(--radius-md)] p-4 sm:p-5 w-full lg:w-[360px]">
            <div className="text-sm text-slate-600">Daily rate</div>
            <div className="mt-1">
              <span className="text-3xl font-bold text-indigo-600">
                ${vehicle.pricePerDay}
              </span>
              <span className="text-sm text-slate-500 ml-1">/day</span>
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Total depends on rental period. See form for estimate.
            </div>
            <Link
              href="#rental-form"
              className="mt-4 inline-flex w-full items-center justify-center px-5 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-[var(--radius)] transition-colors shadow-sm"
            >
              Rent this vehicle
            </Link>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
          <div className="lg:col-span-7 relative h-[320px] sm:h-[420px] rounded-[var(--radius-md)] overflow-hidden border border-slate-200 bg-slate-100">
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
                className="relative h-[152px] sm:h-[198px] rounded-[var(--radius-md)] overflow-hidden border border-slate-200 bg-slate-100"
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
            <section className="bg-white border border-slate-200 rounded-[var(--radius-md)] p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                Specifications
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <dt className="text-slate-500">Type</dt>
                  <dd className="font-medium text-slate-900">{vehicle.vehicleType}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <dt className="text-slate-500">Brand / Model</dt>
                  <dd className="font-medium text-slate-900">{vehicle.brand} {vehicle.model}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <dt className="text-slate-500">Year</dt>
                  <dd className="font-medium text-slate-900">{vehicle.year}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <dt className="text-slate-500">Transmission</dt>
                  <dd className="font-medium text-slate-900">{vehicle.transmission}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <dt className="text-slate-500">Fuel</dt>
                  <dd className="font-medium text-slate-900">{vehicle.fuelType}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <dt className="text-slate-500">Seats</dt>
                  <dd className="font-medium text-slate-900">{vehicle.seats}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <dt className="text-slate-500">Location</dt>
                  <dd className="font-medium text-slate-900">{vehicle.location}</dd>
                </div>
              </dl>
            </section>

            <section className="bg-white border border-slate-200 rounded-[var(--radius-md)] p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Features</h2>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-sm text-slate-700"
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

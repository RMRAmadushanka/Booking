import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StarIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { getPackageById, getDayCountFromDuration } from "@/lib/packages";
import { getPackageReviews, getPackageReviewStats } from "@/lib/reviews";
import type { Destination } from "@/types/packages";
import PackageRouteMap from "@/components/Packages/PackageRouteMap";
import PackageBookingForm from "@/components/Packages/PackageBookingForm";
import PackageLocationsAccordion from "@/components/Packages/PackageLocationsAccordion";
import ReviewsSection from "@/components/Reviews/ReviewsSection";

function getGalleryImages(pkg: { imageUrl: string; galleryUrls?: string[] }): string[] {
  if (Array.isArray(pkg.galleryUrls) && pkg.galleryUrls.length > 0) {
    return pkg.galleryUrls;
  }
  return [pkg.imageUrl];
}

function Rating({ value }: { value: number }) {
  const stars = Math.min(5, Math.max(0, Math.round(value)));
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className={`w-4 h-4 ${
              i < stars ? "text-amber-400" : "text-[var(--color-border)]"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-[var(--foreground)]">{value}</span>
    </div>
  );
}

export default async function PackageDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ reviewPage?: string }>;
}) {
  const { id } = await params;
  const { reviewPage } = await searchParams;
  const page = Math.max(1, parseInt(String(reviewPage), 10) || 1);

  const [pkg, reviewsData, reviewStats] = await Promise.all([
    getPackageById(id),
    getPackageReviews(id, page, 5),
    getPackageReviewStats(id),
  ]);

  if (!pkg) notFound();

  const displayRating = reviewStats.averageRating ?? pkg.rating;

  const images = getGalleryImages(pkg);
  const destinations = pkg.destinations as Destination[];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-[var(--color-muted)] mb-4">
          <Link href="/packages" className="hover:text-[var(--foreground)]">
            Packages
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--foreground)]">{pkg.title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold border border-[var(--color-primary)]/20">
                {pkg.packageType}
              </span>
              <Rating value={displayRating} />
              <span className="text-sm text-[var(--color-muted)]">
                ({reviewsData.total} review{reviewsData.total === 1 ? "" : "s"})
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-[var(--foreground)] tracking-tight">
              {pkg.title}
            </h1>
            <p className="text-[var(--color-muted)] mt-3 leading-relaxed">{pkg.description}</p>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                <ClockIcon className="w-4 h-4 text-[var(--color-primary)]" />
                <span>{pkg.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                <MapPinIcon className="w-4 h-4 text-[var(--color-primary)]" />
                <span>{pkg.destinations.length} locations</span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-border)]/30 border border-[var(--color-border)] rounded-[var(--radius-md)] p-4 sm:p-5 w-full lg:w-[360px]">
            <div className="text-sm text-[var(--color-muted)]">Starting from</div>
            <div className="mt-1">
              <span className="text-3xl font-bold text-[var(--color-primary)]">${pkg.price}</span>
              <span className="text-sm text-[var(--color-muted)] ml-1">/person</span>
            </div>
            <div className="text-xs text-[var(--color-muted)] mt-2">
              Final cost depends on group size, dates, and pickup location.
            </div>
            <Link
              href="#booking"
              className="mt-4 inline-flex w-full items-center justify-center px-5 py-3 bg-button-gradient text-white text-sm font-semibold rounded-[var(--button-radius)] transition-colors shadow-sm"
            >
              Book this package
            </Link>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
          <div className="lg:col-span-7 relative h-[320px] sm:h-[420px] rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)]/50">
            <Image
              src={images[0]}
              alt={pkg.title}
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
                  alt={`${pkg.title} photo ${i + 2}`}
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
          {/* Left column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Destinations */}
            <section className="bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                Locations & route
              </h2>
              <p className="text-sm text-[var(--color-muted)] mb-4">
                Route is shown in order. First stop is usually the pickup area.
              </p>
              <PackageLocationsAccordion
                destinations={destinations}
                locationDetails={pkg.destinationDetails}
                dayCount={getDayCountFromDuration(pkg.duration)}
                destinationDays={pkg.destinationDays}
                routeDays={pkg.routeDays}
                packageId={pkg.id}
              />
            </section>

            {/* Highlights */}
            <section className="bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-3">Highlights</h2>
              <div className="flex flex-wrap gap-2">
                {pkg.highlights.map((h) => (
                  <span
                    key={h}
                    className="px-3 py-1.5 rounded-full bg-[var(--color-primary)]/5 border border-[var(--color-border)] text-sm text-[var(--foreground)]"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </section>

            {/* Map */}
            <section className="bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                Route map
              </h2>
              <p className="text-sm text-[var(--color-muted)] mb-4">
                Green = start, Red = end. Click markers for details.
              </p>
              <PackageRouteMap destinations={destinations} />
            </section>

            {/* Guest feedback */}
            <ReviewsSection
              data={reviewsData}
              basePath={`/packages/${id}`}
              emptyMessage="No reviews yet for this package."
            />
          </div>

          {/* Right column - min-w-0 so form can shrink and stay responsive in narrow sidebar */}
          <div className="lg:col-span-5 min-w-0">
            <div id="booking" className="scroll-mt-24">
              <PackageBookingForm
                packageId={pkg.id}
                packageTitle={pkg.title}
                destinations={destinations}
                duration={pkg.duration}
                basePricePerPerson={pkg.price}
              />
            </div>
          </div>
        </div>

        <div className="text-xs text-[var(--color-muted)] mt-10">
          Map data © OpenStreetMap contributors.
        </div>
      </div>
    </div>
  );
}


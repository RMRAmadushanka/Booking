import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StarIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { mockPackages } from "@/data/packages";
import type { Destination } from "@/types/packages";
import PackageRouteMap from "@/components/Packages/PackageRouteMap";
import PackageBookingForm from "@/components/Packages/PackageBookingForm";
import PackageLocationsAccordion from "@/components/Packages/PackageLocationsAccordion";

function getGalleryImages(imageUrl: string, seed: string) {
  // Use the package image + a few deterministic alternates.
  const base = imageUrl;
  const alt1 = `https://picsum.photos/seed/${encodeURIComponent(seed)}-1/1200/800`;
  const alt2 = `https://picsum.photos/seed/${encodeURIComponent(seed)}-2/1200/800`;
  const alt3 = `https://picsum.photos/seed/${encodeURIComponent(seed)}-3/1200/800`;
  return [base, alt1, alt2, alt3];
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

export default async function PackageDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Next.js 16: `params` is async in server components.
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  const { id } = await params;

  const pkg = mockPackages.find((p) => p.id === id);
  if (!pkg) notFound();

  const images = getGalleryImages(pkg.imageUrl, `${pkg.id}-${pkg.title}`);
  const destinations = pkg.destinations as Destination[];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-slate-500 mb-4">
          <Link href="/packages" className="hover:text-slate-700">
            Packages
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">{pkg.title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                {pkg.packageType}
              </span>
              <Rating value={pkg.rating} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              {pkg.title}
            </h1>
            <p className="text-slate-600 mt-3 leading-relaxed">{pkg.description}</p>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <ClockIcon className="w-4 h-4 text-indigo-600" />
                <span>{pkg.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPinIcon className="w-4 h-4 text-indigo-600" />
                <span>{pkg.destinations.length} locations</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-[var(--radius-md)] p-4 sm:p-5 w-full lg:w-[360px]">
            <div className="text-sm text-slate-600">Starting from</div>
            <div className="mt-1">
              <span className="text-3xl font-bold text-indigo-600">${pkg.price}</span>
              <span className="text-sm text-slate-500 ml-1">/person</span>
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Final cost depends on group size, dates, and pickup location.
            </div>
            <Link
              href="#booking"
              className="mt-4 inline-flex w-full items-center justify-center px-5 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-[var(--radius)] transition-colors shadow-sm"
            >
              Book this package
            </Link>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
          <div className="lg:col-span-7 relative h-[320px] sm:h-[420px] rounded-[var(--radius-md)] overflow-hidden border border-slate-200 bg-slate-100">
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
                className="relative h-[152px] sm:h-[198px] rounded-[var(--radius-md)] overflow-hidden border border-slate-200 bg-slate-100"
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
            <section className="bg-white border border-slate-200 rounded-[var(--radius-md)] p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                Locations & route
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                Route is shown in order. First stop is usually the pickup area.
              </p>
              <PackageLocationsAccordion destinations={destinations} />
            </section>

            {/* Highlights */}
            <section className="bg-white border border-slate-200 rounded-[var(--radius-md)] p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Highlights</h2>
              <div className="flex flex-wrap gap-2">
                {pkg.highlights.map((h) => (
                  <span
                    key={h}
                    className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-sm text-slate-700"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </section>

            {/* Map */}
            <section className="bg-white border border-slate-200 rounded-[var(--radius-md)] p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                Route map
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                Green = start, Red = end. Click markers for details.
              </p>
              <PackageRouteMap destinations={destinations} />
            </section>
          </div>

          {/* Right column */}
          <div className="lg:col-span-5">
            <div id="booking" className="scroll-mt-24">
              <PackageBookingForm
                packageId={pkg.id}
                packageTitle={pkg.title}
                destinations={destinations}
                basePricePerPerson={pkg.price}
              />
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 mt-10">
          Map data © OpenStreetMap contributors.
        </div>
      </div>
    </div>
  );
}


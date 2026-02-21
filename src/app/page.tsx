import HeroSearchForm from "@/components/HeroSearchForm/HeroSearchForm";
import { PopularPackagesSection } from "@/components/PopularPackages";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";
import heroImage from "@/images/home-beach-hero.jpg";
import { getPackages, getUniqueDestinations, getUniquePackageTypes } from "@/lib/packages";
import { getVehicles, getUniqueVehicleLocations, getUniqueVehicleTypes } from "@/lib/vehicles";

export default async function Home() {
  const [packages, vehicles] = await Promise.all([getPackages(), getVehicles()]);
  const destinations = getUniqueDestinations(packages);
  const packageTypes = getUniquePackageTypes(packages);
  const vehicleLocations = getUniqueVehicleLocations(vehicles);
  const vehicleTypes = getUniqueVehicleTypes(vehicles);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative min-h-[600px] lg:min-h-[700px] flex items-center bg-[#2563EB]"
        style={{
          backgroundImage: `url(${heroImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          {/* Hero Content */}
          <div className="text-center mb-10 lg:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-tight">
              Find Your Perfect Stay
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Discover amazing places to stay, unique experiences, and
              adventures around the world.
            </p>
          </div>

          {/* Search Form */}
          <div className="flex justify-center">
            <HeroSearchForm
            destinations={destinations}
            packageTypes={packageTypes}
            vehicleLocations={vehicleLocations}
            vehicleTypes={vehicleTypes}
          />
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "10M+", label: "Happy Guests" },
              { number: "150K+", label: "Properties" },
              { number: "190+", label: "Countries" },
              { number: "4.9", label: "Rating" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-sm text-white/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-20 lg:py-28 bg-[#FFFFFF]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">
              How It Works
            </h2>
            <p className="text-[#64748B] text-lg max-w-xl mx-auto">
              Book your corporate travel in three simple steps
            </p>
          </div>

          {/* Steps Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Steps Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center group relative">
                {/* Connector line to Step 2 - Desktop */}
                <div 
                  className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-0 border-t-[3px] border-dashed border-[#E2E8F0]"
                  style={{ transform: 'translateY(-50%)' }}
                ></div>
                
                {/* Step Circle */}
                <div className="relative mb-6 z-10">
                  <div
                    className="w-20 h-20 rounded-full bg-[#2563EB] flex items-center justify-center
                               transition-all duration-300 ease-out
                               group-hover:scale-110 group-hover:shadow-[0_0_0_8px_rgba(37,99,235,0.15)]
                               cursor-pointer"
                  >
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                  Search & Select
                </h3>
                <p className="text-[#64748B] text-base leading-relaxed max-w-xs">
                  Browse destinations, flights, and accommodations tailored for business travel
                </p>

                {/* Mobile connector line after */}
                <div className="lg:hidden w-0.5 h-8 border-l-2 border-dashed border-[#E2E8F0] mt-6"></div>
              </div>

              {/* Step 2 - Active/Highlighted */}
              <div className="flex flex-col items-center text-center group relative">
                {/* Connector line to Step 3 - Desktop */}
                <div 
                  className="hidden lg:block absolute top-10 left-[calc(50%+44px)] w-[calc(100%-44px)] h-0 border-t-[3px] border-dashed border-[#E2E8F0]"
                  style={{ transform: 'translateY(-50%)' }}
                ></div>
                
                {/* Step Circle - Mint Green Highlight */}
                <div className="relative mb-6 z-10">
                  {/* Pulse ring for active state */}
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-[#2DD4BF] animate-ping opacity-20"></div>
                  <div
                    className="relative w-20 h-20 rounded-full bg-[#2DD4BF] flex items-center justify-center
                               transition-all duration-300 ease-out
                               group-hover:scale-110 group-hover:shadow-[0_0_0_8px_rgba(45,212,191,0.2)]
                               cursor-pointer scale-105 shadow-[0_0_0_6px_rgba(45,212,191,0.15)]"
                  >
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                  Customize & Book
                </h3>
                <p className="text-[#64748B] text-base leading-relaxed max-w-xs">
                  Add corporate preferences, policies, and payment options seamlessly
                </p>

                {/* Mobile connector line after */}
                <div className="lg:hidden w-0.5 h-8 border-l-2 border-dashed border-[#E2E8F0] mt-6"></div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center group relative">
                {/* Step Circle */}
                <div className="relative mb-6 z-10">
                  <div
                    className="w-20 h-20 rounded-full bg-[#2563EB] flex items-center justify-center
                               transition-all duration-300 ease-out
                               group-hover:scale-110 group-hover:shadow-[0_0_0_8px_rgba(37,99,235,0.15)]
                               cursor-pointer"
                  >
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                  Travel & Manage
                </h3>
                <p className="text-[#64748B] text-base leading-relaxed max-w-xs">
                  Access itineraries, receive updates, and manage trips from anywhere
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0F172A] mb-4">
              Popular Destinations
            </h2>
            <p className="text-[#64748B] max-w-2xl mx-auto">
              Explore trending locations loved by travelers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              {
                name: "Sigiriya",
                country: "Sri Lanka",
                image:
                  "https://picsum.photos/seed/sigiriya/400/500",
              },
              {
                name: "Kandy",
                country: "Sri Lanka",
                image:
                  "https://picsum.photos/seed/kandy/400/500",
              },
              {
                name: "Galle",
                country: "Sri Lanka",
                image:
                  "https://picsum.photos/seed/galle/400/500",
              },
              {
                name: "Ella",
                country: "Sri Lanka",
                image:
                  "https://picsum.photos/seed/ella/400/500",
              },
            ].map((destination, idx) => (
              <div
                key={idx}
                className="group relative rounded-[var(--radius-md)] overflow-hidden aspect-[4/5] cursor-pointer"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{destination.name}</h3>
                  <p className="text-sm text-white/80">{destination.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Travel Packages Section */}
      <PopularPackagesSection packages={packages} featuredPackageId="5" />

      {/* Social Proof Section */}
      <SocialProof />

      

      {/* CTA Section */}
      <div className="py-20 bg-[#2563EB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join millions of travelers who trust us for their booking needs.
            Sign up today and get exclusive deals!
          </p>
          <button className="bg-white text-[#2563EB] px-8 py-4 rounded-[var(--radius)] font-semibold hover:bg-gray-50 transition-colors shadow-lg">
            Get Started Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

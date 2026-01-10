"use client";

import HeroSearchForm from "@/components/HeroSearchForm/HeroSearchForm";
import HeroSearchForm2Mobile from "@/components/HeroSearchForm2Mobile/HeroSearchForm2Mobile";
import PackageCard from "@/components/PackageCard";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative min-h-[600px] lg:min-h-[700px] flex items-center bg-[#2563EB]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop')",
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

          {/* Desktop Search Form */}
          <div className="hidden lg:flex justify-center">
            <HeroSearchForm  />
          </div>

          {/* Mobile Search Form */}
          <div className="lg:hidden max-w-lg mx-auto">
            <HeroSearchForm2Mobile />
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

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0F172A] mb-4">
              Why Choose Us
            </h2>
            <p className="text-[#64748B] max-w-2xl mx-auto">
              We provide the best booking experience with amazing features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏠",
                title: "Best Selection",
                description:
                  "Choose from millions of properties worldwide, from cozy apartments to luxury villas.",
              },
              {
                icon: "💰",
                title: "Best Price Guarantee",
                description:
                  "Find a lower price? We'll match it and give you an additional discount.",
              },
              {
                icon: "🔒",
                title: "Secure Booking",
                description:
                  "Your payment information is always protected with industry-standard encryption.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#E5E7EB]"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#64748B]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

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
                name: "Paris",
                country: "France",
                image:
                  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=500&fit=crop",
              },
              {
                name: "Tokyo",
                country: "Japan",
                image:
                  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=500&fit=crop",
              },
              {
                name: "New York",
                country: "USA",
                image:
                  "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=500&fit=crop",
              },
              {
                name: "London",
                country: "UK",
                image:
                  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=500&fit=crop",
              },
            ].map((destination, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer"
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

      {/* Travel Packages - Different Card Styles */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0F172A] mb-4">
              Travel Packages
            </h2>
            <p className="text-[#64748B] max-w-2xl mx-auto">
              Discover amazing travel packages with different card styles
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {/* Split Style */}
            <PackageCard
              type="travel"
              variant="split"
              title="San Francisco"
              destination="San Francisco, USA"
              classType="Premium economy"
              origin="SFO"
              price="from $240"
              imageUrl="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=600&fit=crop"
              onAction={() => console.log("Search flight to San Francisco")}
            />
            <PackageCard
              type="travel"
              variant="split"
              title="New York Adventure"
              destination="New York, USA"
              classType="5 Days / 4 Nights"
              origin="NYC"
              price="from $1,200"
              imageUrl="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=600&fit=crop"
              onAction={() => console.log("View New York package")}
            />
            <PackageCard
              type="travel"
              variant="split"
              title="Paris Romance"
              destination="Paris, France"
              classType="7 Days / 6 Nights"
              origin="CDG"
              price="from $2,450"
              imageUrl="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=600&fit=crop"
              onAction={() => console.log("View Paris package")}
            />
          </div>
        </div>
      </div>

      {/* Vehicle Packages - Different Card Styles */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0F172A] mb-4">
              Vehicle Packages
            </h2>
            <p className="text-[#64748B] max-w-2xl mx-auto">
              Rent the perfect vehicle with elegant card designs
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {/* Split Style */}
            <PackageCard
              type="vehicle"
              variant="split"
              title="Luxury SUV"
              vehicleModel="BMW X5"
              location="New York"
              transmission="Automatic"
              seats={5}
              price="from $89/day"
              imageUrl="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=600&fit=crop"
              onAction={() => console.log("Rent BMW X5")}
            />
            <PackageCard
              type="vehicle"
              variant="split"
              title="Compact Car"
              vehicleModel="Toyota Corolla"
              location="Los Angeles"
              transmission="Automatic"
              seats={5}
              price="from $45/day"
              imageUrl="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=600&fit=crop"
              onAction={() => console.log("Rent Toyota Corolla")}
            />
            <PackageCard
              type="vehicle"
              variant="split"
              title="Sports Car"
              vehicleModel="Porsche 911"
              location="Miami"
              transmission="Manual"
              seats={2}
              price="from $299/day"
              imageUrl="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=600&fit=crop"
              onAction={() => console.log("Rent Porsche 911")}
            />
          </div>
        </div>
      </div>

      {/* New Card Style Showcase */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0F172A] mb-4">
              Explore New Card Styles
            </h2>
            <p className="text-[#64748B] max-w-2xl mx-auto">
              Discover unique and creative card designs for your packages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Neon Style */}
            <PackageCard
              type="travel"
              variant="neon"
              title="Cyber City"
              destination="Tokyo, Japan"
              duration="4 Days / 3 Nights"
              rating={4.9}
              price="from $1,800"
              badge="Hot"
              imageUrl="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=600&fit=crop"
              onAction={() => console.log("View Cyber City")}
            />
            {/* Vintage Style */}
            <PackageCard
              type="travel"
              variant="vintage"
              title="Classic Europe"
              destination="Paris, France"
              duration="7 Days / 6 Nights"
              rating={4.8}
              price="from $2,200"
              badge="Classic"
              imageUrl="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=600&fit=crop"
              onAction={() => console.log("View Classic Europe")}
            />
            {/* Bold Style */}
            <PackageCard
              type="travel"
              variant="bold"
              title="Urban Adventure"
              destination="New York, USA"
              duration="5 Days / 4 Nights"
              rating={4.7}
              price="from $1,500"
              badge="Bold"
              imageUrl="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=600&fit=crop"
              onAction={() => console.log("View Urban Adventure")}
            />
            {/* Soft Style */}
            <PackageCard
              type="travel"
              variant="soft"
              title="Romantic Getaway"
              destination="Santorini, Greece"
              duration="6 Days / 5 Nights"
              rating={4.9}
              price="from $2,800"
              badge="Romantic"
              imageUrl="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=600&fit=crop"
              onAction={() => console.log("View Romantic Getaway")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {/* Dark Style */}
            <PackageCard
              type="vehicle"
              variant="dark"
              title="Luxury Sedan"
              vehicleModel="Mercedes S-Class"
              location="Berlin"
              transmission="Automatic"
              seats={5}
              price="from $120/day"
              badge="Premium"
              imageUrl="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=600&fit=crop"
              onAction={() => console.log("Rent Mercedes")}
            />
            {/* Vibrant Style */}
            <PackageCard
              type="vehicle"
              variant="vibrant"
              title="Sports Convertible"
              vehicleModel="Ferrari 488"
              location="Monaco"
              transmission="Automatic"
              seats={2}
              price="from $450/day"
              badge="Exotic"
              imageUrl="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=600&fit=crop"
              onAction={() => console.log("Rent Ferrari")}
            />
            {/* Corporate Style */}
            <PackageCard
              type="vehicle"
              variant="corporate"
              title="Business Class"
              vehicleModel="Audi A6"
              location="London"
              transmission="Automatic"
              seats={5}
              price="from $95/day"
              badge="Business"
              imageUrl="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=600&fit=crop"
              onAction={() => console.log("Rent Audi")}
            />
            {/* Artistic Style */}
            <PackageCard
              type="vehicle"
              variant="artistic"
              title="Designer Edition"
              vehicleModel="Tesla Model S"
              location="San Francisco"
              transmission="Automatic"
              seats={5}
              price="from $150/day"
              badge="Electric"
              imageUrl="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=600&fit=crop"
              onAction={() => console.log("Rent Tesla")}
            />
          </div>
        </div>
      </div>

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
          <button className="bg-white text-[#2563EB] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg">
            Get Started Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-[#64748B] py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-xl font-semibold mb-4">HeroSearch</h3>
              <p className="text-sm">
                Your trusted partner for finding the perfect accommodation
                worldwide.
              </p>
            </div>
            {[
              {
                title: "Company",
                links: ["About", "Careers", "Press", "Blog"],
              },
              {
                title: "Support",
                links: ["Help Center", "Safety", "Cancellation", "COVID-19"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Sitemap", "Destinations"],
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="text-white font-semibold mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-[#1E293B] mt-12 pt-8 text-center text-sm">
            <p>&copy; 2024 HeroSearch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

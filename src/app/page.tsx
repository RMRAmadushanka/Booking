import HeroSearchForm from "@/components/HeroSearchForm/HeroSearchForm";
import HeroSearchForm2Mobile from "@/components/HeroSearchForm2Mobile/HeroSearchForm2Mobile";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative min-h-[600px] lg:min-h-[700px] flex items-center"
        style={{
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        }}
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          {/* Hero Content */}
          <div className="text-center mb-10 lg:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Find Your Perfect Stay
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto font-light">
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
      <div className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
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
                className="bg-white dark:bg-neutral-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Popular Destinations
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
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

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join millions of travelers who trust us for their booking needs.
            Sign up today and get exclusive deals!
          </p>
          <button className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-neutral-100 transition-colors shadow-lg">
            Get Started Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">HeroSearch</h3>
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
          <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; 2024 HeroSearch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

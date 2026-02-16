interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
}

interface TrustMetric {
  value: string;
  label: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Drimooria Travels handled our entire corporate retreat seamlessly. From flights to accommodations, every detail was perfect.",
    name: "Marcus Chen",
    location: "Singapore",
  },
  {
    id: "2",
    quote:
      "We've worked with many travel agencies, but Drimooria Travels's attention to our business requirements is unmatched.",
    name: "Elena Hoffmann",
    location: "Germany",
  },
  {
    id: "3",
    quote:
      "Their team understood our tight schedule and delivered a flawless itinerary. Highly recommended for business travel.",
    name: "David Okonkwo",
    location: "United Kingdom",
  },
];

const trustMetrics: TrustMetric[] = [
  { value: "2,500+", label: "Trips Organized" },
  { value: "85+", label: "Destinations" },
  { value: "98%", label: "Client Satisfaction" },
];

function QuoteIcon() {
  return (
    <svg
      className="w-8 h-8 text-[#2DD4BF] mb-4 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article
      className="flex-shrink-0 w-[85vw] sm:w-[340px] lg:w-auto lg:flex-1
                 bg-white border border-[#64748B]/15 rounded-[var(--radius-md)]
                 p-6 lg:p-8 flex flex-col
                 transition-all duration-150 ease-out
                 hover:border-[#2DD4BF]/50
                 focus-within:outline focus-within:outline-2 focus-within:outline-[#2563EB]
                 snap-start"
      tabIndex={0}
    >
      <QuoteIcon />
      <blockquote className="text-[#64748B] text-base leading-relaxed mb-6 flex-grow">
        "{testimonial.quote}"
      </blockquote>
      <footer className="mt-auto pt-4 border-t border-[#64748B]/10">
        <cite className="not-italic">
          <span className="block text-[#0F172A] font-semibold text-base">
            {testimonial.name}
          </span>
          <span className="text-[#64748B] text-sm">{testimonial.location}</span>
        </cite>
      </footer>
    </article>
  );
}

function TrustMetricsRow() {
  return (
    <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16 mb-12 lg:mb-16">
      {trustMetrics.map((metric, idx) => (
        <div key={idx} className="text-center min-w-[100px]">
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            {metric.value}
          </div>
          <div className="text-sm text-[#64748B] mt-1">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}

function SoftCTA() {
  return (
    <div className="mt-12 lg:mt-16 text-center">
      <a
        href="#plan-journey"
        className="inline-flex items-center gap-2 text-[#2563EB] font-medium text-base
                   hover:text-[#1D4ED8] transition-colors duration-150
                   focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 rounded-md px-2 py-1"
      >
        Plan Your Journey With Us
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section
      className="py-20 lg:py-28 bg-[#FFFFFF]"
      aria-labelledby="social-proof-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="text-center mb-10 lg:mb-12">
          <h2
            id="social-proof-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight"
          >
            Trusted by Travelers Worldwide
          </h2>
          <p className="text-[#64748B] text-lg max-w-xl mx-auto">
            Real experiences from clients who explored with Drimooria Travels
          </p>
        </header>

        {/* Trust Metrics Row */}
        <TrustMetricsRow />

        {/* Testimonials Grid/Scroll Container */}
        <div
          className="flex gap-5 lg:gap-6 overflow-x-auto lg:overflow-visible 
                     pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0
                     snap-x snap-mandatory lg:snap-none
                     scrollbar-hide"
          role="list"
          aria-label="Customer testimonials"
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Soft CTA */}
        <SoftCTA />
      </div>
    </section>
  );
}

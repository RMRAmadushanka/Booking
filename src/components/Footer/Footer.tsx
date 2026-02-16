"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MainLogo from "@/images/MainLogo.png";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// Navigation data
const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Travel Packages", href: "/packages" },
  { label: "Corporate Travel", href: "/corporate" },
  { label: "About Us", href: "/about" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
  { label: "Customize Your Trip", href: "/customize" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

// Social media icons as SVG components
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/Drimooria Travels", icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com/Drimooria Travels", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com/company/Drimooria Travels", icon: LinkedInIcon },
  { label: "X", href: "https://x.com/Drimooria Travels", icon: XIcon },
];

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, external }) => {
  const baseClasses =
    "text-[#64748B] hover:text-[#2DD4BF] focus:text-[#2DD4BF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors duration-200 text-sm leading-relaxed block py-1.5 min-h-[44px] flex items-center";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClasses}>
      {children}
    </Link>
  );
};

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
  ariaLabel: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({
  title,
  children,
  ariaLabel,
}) => (
  <nav aria-label={ariaLabel}>
    <h3 className="text-[#0F172A] font-semibold text-base mb-4">{title}</h3>
    <ul className="space-y-1">{children}</ul>
  </nav>
);

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  expanded: boolean;
  onChange: () => void;
  ariaLabel: string;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  children,
  expanded,
  onChange,
  ariaLabel,
}) => (
  <Accordion
    expanded={expanded}
    onChange={onChange}
    disableGutters
    elevation={0}
    sx={{
      backgroundColor: "transparent",
      "&:before": { display: "none" },
      borderBottom: "1px solid rgba(100, 116, 139, 0.2)",
    }}
  >
    <AccordionSummary
      expandIcon={
        <ChevronDownIcon className="w-5 h-5 text-[#64748B] transition-transform duration-200" />
      }
      aria-label={ariaLabel}
      sx={{
        padding: "0",
        minHeight: "56px",
        "& .MuiAccordionSummary-content": {
          margin: "0",
        },
        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
          transform: "rotate(180deg)",
        },
      }}
    >
      <span className="text-[#0F172A] font-semibold text-base">{title}</span>
    </AccordionSummary>
    <AccordionDetails sx={{ padding: "0 0 16px 0" }}>
      <nav aria-label={ariaLabel}>
        <ul className="space-y-1">{children}</ul>
      </nav>
    </AccordionDetails>
  </Accordion>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);

  const handleAccordionChange = (panel: string) => {
    setExpandedPanel(expandedPanel === panel ? null : panel);
  };

  return (
    <footer className="bg-[#FFFFFF] border-t border-[#64748B]/20" role="contentinfo">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Desktop Layout - 4 Column Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Column 1 - Brand & Purpose */}
          <div className="space-y-4">
            <Link href="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 rounded">
              <Image
                src={MainLogo}
                alt="Drimooria Travels - Travel Agency"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-[#64748B] text-sm leading-relaxed max-w-xs">
              Connecting travelers to meaningful experiences worldwide. We specialize in corporate travel, curated packages, and personalized journeys.
            </p>
            {/* Social Icons - Desktop */}
            <div className="pt-2">
              <nav aria-label="Social media links">
                <ul className="flex items-center gap-3">
                  {socialLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.label}
                          className="flex items-center justify-center w-10 h-10 rounded-full text-[#64748B] hover:text-[#2563EB] hover:bg-[#2563EB]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 transition-colors duration-200"
                        >
                          <IconComponent />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>

          {/* Column 2 - Explore */}
          <FooterSection title="Explore" ariaLabel="Explore navigation">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </FooterSection>

          {/* Column 3 - Support */}
          <FooterSection title="Support" ariaLabel="Support navigation">
            {supportLinks.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </FooterSection>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-[#0F172A] font-semibold text-base mb-4">Contact</h3>
            <address className="not-italic space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-[#64748B]" aria-hidden="true">📞</span>
                <div>
                  <a
                    href="tel:+94112345678"
                    className="text-[#2563EB] hover:text-[#2DD4BF] focus:text-[#2DD4BF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] transition-colors duration-200"
                  >
                    +94 11 234 5678
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#64748B]" aria-hidden="true">✉️</span>
                <div>
                  <a
                    href="mailto:info@Drimooria Travels.com"
                    className="text-[#2563EB] hover:text-[#2DD4BF] focus:text-[#2DD4BF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] transition-colors duration-200"
                  >
                    info@Drimooria Travels.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#64748B]" aria-hidden="true">📍</span>
                <span className="text-[#64748B]">Sri Lanka</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#64748B]" aria-hidden="true">🕐</span>
                <span className="text-[#64748B]">Mon – Fri: 9:00 AM – 6:00 PM</span>
              </div>
            </address>
          </div>
        </div>

        {/* Mobile Layout - Accordion Sections */}
        <div className="lg:hidden space-y-0">
          {/* Brand Section - Always Visible */}
          <div className="pb-6 mb-2 border-b border-[#64748B]/20">
            <Link href="/" className="inline-block mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 rounded">
              <Image
                src={MainLogo}
                alt="Drimooria Travels - Travel Agency"
                width={120}
                height={36}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Connecting travelers to meaningful experiences worldwide. We specialize in corporate travel, curated packages, and personalized journeys.
            </p>
          </div>

          {/* Explore Accordion */}
          <AccordionSection
            title="Explore"
            expanded={expandedPanel === "explore"}
            onChange={() => handleAccordionChange("explore")}
            ariaLabel="Explore navigation"
          >
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </AccordionSection>

          {/* Support Accordion */}
          <AccordionSection
            title="Support"
            expanded={expandedPanel === "support"}
            onChange={() => handleAccordionChange("support")}
            ariaLabel="Support navigation"
          >
            {supportLinks.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </AccordionSection>

          {/* Contact Section - Always Expanded */}
          <div className="pt-4 border-t border-[#64748B]/20">
            <h3 className="text-[#0F172A] font-semibold text-base mb-4">Contact</h3>
            <address className="not-italic space-y-3 text-sm">
              <div className="flex items-center gap-3 min-h-[44px]">
                <span className="text-[#64748B]" aria-hidden="true">📞</span>
                <a
                  href="tel:+94112345678"
                  className="text-[#2563EB] hover:text-[#2DD4BF] focus:text-[#2DD4BF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] transition-colors duration-200"
                >
                  +94 11 234 5678
                </a>
              </div>
              <div className="flex items-center gap-3 min-h-[44px]">
                <span className="text-[#64748B]" aria-hidden="true">✉️</span>
                <a
                  href="mailto:info@Drimooria Travels.com"
                  className="text-[#2563EB] hover:text-[#2DD4BF] focus:text-[#2DD4BF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] transition-colors duration-200"
                >
                  info@Drimooria Travels.com
                </a>
              </div>
              <div className="flex items-center gap-3 min-h-[44px]">
                <span className="text-[#64748B]" aria-hidden="true">📍</span>
                <span className="text-[#64748B]">Sri Lanka</span>
              </div>
              <div className="flex items-center gap-3 min-h-[44px]">
                <span className="text-[#64748B]" aria-hidden="true">🕐</span>
                <span className="text-[#64748B]">Mon – Fri: 9:00 AM – 6:00 PM</span>
              </div>
            </address>

            {/* Social Icons - Mobile */}
            <div className="mt-6 pt-4 border-t border-[#64748B]/20">
              <nav aria-label="Social media links">
                <ul className="flex items-center gap-3">
                  {socialLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.label}
                          className="flex items-center justify-center w-11 h-11 rounded-full text-[#64748B] hover:text-[#2563EB] hover:bg-[#2563EB]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 transition-colors duration-200"
                        >
                          <IconComponent />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-[#64748B]/20 bg-[#FFFFFF]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-[#64748B] text-sm text-center">
            © {currentYear} Drimooria Travels. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

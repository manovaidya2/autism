import React from "react";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import logo from "../images/manovaidya-logo (2).png";

const careServices = [
  "Child Development Care",
  "Teen Mental Health Care",
  "Adult Mental Health Care",
  "Women's Mental Health Care",
  "Senior Mental Health Care",
  "Mind & Body Concerns",
];

const exploreLinks = [
  "About Us",
  "Why Manovaidya",
  "Our Approach",
  "Resources",
  "Blog",
];

const supportLinks = [
  "Contact Us",
  "Book Consultation",
  "Take Assessment",
  "FAQs",
];

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M14.6 8.7h2.1V5.3c-.4 0-1.7-.1-3.2-.1-3.1 0-5.2 1.9-5.2 5.4v3H5v3.8h3.3V24h4v-6.6h3.3l.5-3.8h-3.8V11c0-1.1.3-2.3 2.3-2.3Z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="2.2" />
      <circle cx="12" cy="12" r="4.1" strokeWidth="2.2" />
      <circle cx="17.3" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M22 7.7a3.1 3.1 0 0 0-2.2-2.2C17.9 5 12 5 12 5s-5.9 0-7.8.5A3.1 3.1 0 0 0 2 7.7 32.4 32.4 0 0 0 1.5 12c0 1.5.2 3 .5 4.3a3.1 3.1 0 0 0 2.2 2.2C6.1 19 12 19 12 19s5.9 0 7.8-.5a3.1 3.1 0 0 0 2.2-2.2c.3-1.3.5-2.8.5-4.3s-.2-3-.5-4.3ZM10 15.1V8.9l5.5 3.1-5.5 3.1Z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M5.3 7.8A2.4 2.4 0 1 0 5.3 3a2.4 2.4 0 0 0 0 4.8ZM3.3 21h4V9.2h-4V21ZM9.7 9.2h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4.1 0 4.8 2.7 4.8 6.1V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9.2Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", href: "#facebook", icon: FacebookIcon },
  { label: "Instagram", href: "#instagram", icon: InstagramIcon },
  { label: "YouTube", href: "#youtube", icon: YoutubeIcon },
  { label: "LinkedIn", href: "#linkedin", icon: LinkedinIcon },
];

function Footer() {
  return (
    <footer id="resources" className="scroll-mt-24 border-t border-[#edf1ee] bg-white text-[#121832]">
      <div className="mx-auto grid gap-8 px-5 pb-7 pt-7 sm:px-8 lg:grid-cols-[1.35fr_1fr_0.82fr_0.82fr_1.25fr] lg:gap-12 lg:px-10 lg:pb-8 lg:pt-8">
        <div>
          <img
            src={logo}
            alt="ManoVaidya"
            className="h-auto w-[230px] object-contain object-left"
          />
          <p className="mt-5 text-[15px] font-black leading-tight text-[#1f273f]">
            Healing Minds. Enriching Lives.
          </p>

          <div className="mt-6 flex items-center gap-4">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8e1dd] bg-white text-[#536071] transition hover:border-[#0f8066] hover:text-[#0f8066]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Care Services">
          <h3 className="text-[14px] font-black leading-tight text-[#11172e]">Care Services</h3>
          <ul className="mt-3 space-y-2 text-[13px] font-extrabold leading-tight text-[#31384d]">
            {careServices.map((link) => (
              <li key={link}>
                <a href="#care-services" className="transition hover:text-[#07584c]">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Explore">
          <h3 className="text-[14px] font-black leading-tight text-[#11172e]">Explore</h3>
          <ul className="mt-3 space-y-2 text-[13px] font-extrabold leading-tight text-[#31384d]">
            {exploreLinks.map((link) => (
              <li key={link}>
                <a
                  id={link === "Blog" ? "blog" : undefined}
                  href={link === "Blog" ? "/#blog" : `/#${link.toLowerCase().replaceAll(" ", "-")}`}
                  className="scroll-mt-28 transition hover:text-[#07584c]"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav id="support" aria-label="Support" className="scroll-mt-28">
          <h3 className="text-[14px] font-black leading-tight text-[#11172e]">Support</h3>
          <ul className="mt-3 space-y-2 text-[13px] font-extrabold leading-tight text-[#31384d]">
            {supportLinks.map((link) => (
              <li key={link}>
                <a
                  id={link === "FAQs" ? "faqs" : undefined}
                  href={link === "FAQs" ? "/#faqs" : "/#support"}
                  className="scroll-mt-28 transition hover:text-[#07584c]"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[14px] font-black leading-tight text-[#11172e]">We're Here to Help</h3>
          <div className="mt-4 space-y-3">
            <a
              href="https://wa.me/919999949939"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-[#101831] transition hover:text-[#07584c]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf7f1] text-[#17804f]">
                <MessageCircle className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <span className="text-[21px] font-black leading-none">+91 99999 49939</span>
            </a>

            <a
              href="mailto:support@manovaidya.com"
              className="flex items-center gap-3 text-[#31384d] transition hover:text-[#07584c]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf7f4] text-[#2f8a73]">
                <Mail className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="text-[14px] font-extrabold">support@manovaidya.com</span>
            </a>

            <p className="flex items-center gap-3 text-[#31384d]">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf7f4] text-[#2f8a73]">
                <MapPin className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="text-[14px] font-extrabold">Online Consultations Across India</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex flex-col gap-3 border-t border-[#eef2f0] px-5 py-4 text-[13px] font-extrabold text-[#5e6878] sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <p>© 2026 Manovaidya. All Rights Reserved.</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href="#privacy" className="transition hover:text-[#07584c]">
            Privacy Policy
          </a>
          <span className="text-[#d4dad7]">|</span>
          <a href="#terms" className="transition hover:text-[#07584c]">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

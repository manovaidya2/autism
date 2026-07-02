import React from "react";
import {
  CalendarCheck,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import wellbeingBanner from "../images/wellbeing-journey-banner.png";

const contactItems = [
  {
    label: "Call / WhatsApp",
    value: "+91 78238 38638",
    icon: Phone,
    href: "tel:+917823838638",
  },
  {
    label: "Email",
    value: "manovaidya2@gmail.com",
    icon: Mail,
    href: "mailto:manovaidya2@gmail.com",
  },
  {
    label: "Location",
    value: "VS Plaza, Sector 27, Noida",
    icon: MapPin,
    href:
      "https://www.google.com/maps/dir//VS+Plaza,+near+vinayak+hospital,+Atta+Market,+Pocket+E,+Sector+27,+Noida,+Uttar+Pradesh+201301/@28.5712316,77.2457028,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x390ce583bc378b69:0xf1a912b86caf94f8!2m2!1d77.3282163!2d28.571336?entry=ttu",
  },
  {
    label: "100% Confidential",
    value: "& Secure",
    icon: ShieldCheck,
  },
];

function WellbeingJourneySection() {
  return (
    <section id="consultation" className="scroll-mt-24 bg-[#fbfbff] px-4 pb-12 sm:px-6 lg:px-10">
      <div className="mx-auto overflow-hidden rounded-[28px] border border-[#e6ecea] bg-white shadow-[0_12px_28px_rgba(15,31,49,0.06)]">
        <div className="relative min-h-[214px] overflow-hidden rounded-[28px] bg-[#003f35] px-7 py-7 text-white sm:px-12 lg:min-h-[214px] lg:px-[132px]">
          <img
            src={wellbeingBanner}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00483d]/95 via-[#00483d]/58 to-transparent" />

          <div className="relative z-10 grid gap-7 lg:grid-cols-[410px_1fr] lg:items-center">
            <div>
              <h2 className="font-serif text-[30px] font-black leading-[1.12] text-white sm:text-[30px]">
                Your Wellbeing Journey
                <br />
                Starts with One Step.
              </h2>
              <p className="mt-4 text-[14px] font-black leading-[1.65] text-white/92 sm:text-[16px]">
                We are here to understand, support and
                <br />
                walk with you towards a better tomorrow.
              </p>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row lg:justify-center">
              <a
                href="/#consultation"
                className="inline-flex h-[72px] min-w-[236px] items-center justify-center rounded-[9px] bg-white px-8 text-[18px] font-black text-[#12483f] shadow-[0_16px_28px_rgba(0,0,0,0.16)] transition hover:bg-[#f7fbfa]"
              >
                Book Consultation
              </a>
              <a
                href="/#assessment"
                className="inline-flex h-[72px] min-w-[276px] items-center justify-center rounded-[9px] border-[3px] border-white/38 bg-[#0b4e43]/40 px-8 text-[18px] font-black text-white shadow-[0_16px_28px_rgba(0,0,0,0.12)] backdrop-blur-[1px] transition hover:bg-[#0b4e43]/58"
              >
                Take Free Assessment
              </a>
            </div>
          </div>
        </div>

        <div className="grid bg-white md:grid-cols-2 lg:grid-cols-4">
          {contactItems.map(({ label, value, icon: Icon, href }) => {
            const content = (
              <React.Fragment>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#2c8a45]">
                  <Icon className="h-9 w-9" strokeWidth={1.9} />
                </span>
                <div>
                  <p className="text-[14px] font-black leading-tight text-[#596173]">{label}</p>
                  <p className="mt-2 text-[17px] font-black leading-tight text-[#101a36] sm:text-[19px]">{value}</p>
                </div>
              </React.Fragment>
            );

            return href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="flex min-h-[96px] items-center justify-center gap-5 border-t border-[#e8e7f0] px-6 py-4 transition hover:bg-[#f8fcfa] lg:border-r lg:last:border-r-0"
              >
                {content}
              </a>
            ) : (
              <div
              key={label}
              className="flex min-h-[96px] items-center justify-center gap-5 border-t border-[#e8e7f0] px-6 py-4 lg:border-r lg:last:border-r-0"
            >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WellbeingJourneySection;

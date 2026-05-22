import React, { useEffect } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Home,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import logo from "../images/manovaidya-logo (1).png";

export default function ThankYou() {

  useEffect(() => {

    // Google Analytics Page View
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "Thank You",
        page_location: window.location.href,
        page_path: window.location.pathname,
      });

      // Optional Conversion Event
      window.gtag("event", "conversion", {
        send_to: "G-CC0EY5Q4VT",
      });
    }

    // Facebook Pixel PageView
    if (window.fbq) {
      window.fbq("track", "PageView");
      
      // Purchase Event with ₹599
      window.fbq("track", "Purchase", {
        value: 599,
        currency: "INR",
      });
    }

  }, []);

  return (
    <>
      {/* SEO + Analytics */}
      <Helmet>

        {/* Title */}
        <title>
          Payment Successful | Thank You - Manovaidya
        </title>

        {/* Meta SEO */}
        <meta
          name="description"
          content="Your payment has been received successfully. Thank you for booking your ₹599 Clarity Session with Manovaidya."
        />

        <meta
          name="keywords"
          content="Manovaidya payment success, clarity session booking, thank you page, autism consultation, ADHD consultation, Ayurvedic mental wellness"
        />

        <meta name="robots" content="noindex, nofollow" />
        <meta name="author" content="Manovaidya" />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://manovaidya.com/thank-you"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Payment Successful | Manovaidya"
        />

        <meta
          property="og:description"
          content="Your ₹599 Clarity Session booking has been confirmed successfully."
        />

        <meta
          property="og:url"
          content="https://manovaidya.com/thank-you"
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:image"
          content="https://manovaidya.com/og-image.jpg"
        />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Payment Successful | Manovaidya"
        />

        <meta
          name="twitter:description"
          content="Your Clarity Session booking has been received successfully."
        />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CC0EY5Q4VT"
        />

        <script>
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-CC0EY5Q4VT');
          `}
        </script>

        {/* Meta Pixel Code */}
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '870812739366506');
            fbq('track', 'PageView');
          `}
        </script>

        {/* Facebook Pixel Noscript - Fixed with string template */}
        <noscript>
          {`
            <img 
              height="1" 
              width="1" 
              style="display:none"
              src="https://www.facebook.com/tr?id=870812739366506&ev=PageView&noscript=1"
              alt=""
            />
          `}
        </noscript>
        {/* End Meta Pixel Code */}

      </Helmet>

      <section className="relative min-h-[88vh] overflow-hidden bg-[#f8f7f2] flex items-center justify-center px-4 py-5">

        {/* Background Blur */}
        <div className="absolute top-[-120px] left-[-120px] w-[220px] h-[220px] bg-[#c59d5f]/20 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[240px] h-[240px] bg-[#003b2f]/15 rounded-full blur-3xl" />

        {/* Card */}
        <div className="relative max-w-2xl w-full bg-white/90 backdrop-blur-xl rounded-[24px] shadow-2xl p-5 sm:p-7 md:p-8 text-center border border-white">

          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="Manovaidya"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>

          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">

              <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />

              <CheckCircle2 className="relative h-9 w-9 text-green-600" />

            </div>
          </div>

          {/* Label */}
          <p className="mt-5 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#c59d5f] font-semibold">
            Payment Successful
          </p>

          {/* Heading */}
          <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-[#003b2f] leading-tight">
            Thank You!
          </h1>

          {/* Description */}
          <p className="mt-3 text-gray-600 text-sm sm:text-[15px] md:text-base leading-relaxed max-w-lg mx-auto">
            Your ₹599 Clarity Session booking has been received successfully.
            Our Manovaidya team will contact you shortly for confirmation.
          </p>

          {/* Info Cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">

            <div className="rounded-2xl bg-[#f8f7f2] border border-gray-100 p-3.5">
              <ShieldCheck className="h-5 w-5 text-[#c59d5f] mx-auto mb-2" />

              <p className="text-[11px] sm:text-xs font-semibold text-[#003b2f]">
                Booking Confirmed
              </p>
            </div>

            <div className="rounded-2xl bg-[#f8f7f2] border border-gray-100 p-3.5">
              <PhoneCall className="h-5 w-5 text-[#c59d5f] mx-auto mb-2" />

              <p className="text-[11px] sm:text-xs font-semibold text-[#003b2f]">
                Team Will Call
              </p>
            </div>

            <div className="rounded-2xl bg-[#f8f7f2] border border-gray-100 p-3.5">
              <CheckCircle2 className="h-5 w-5 text-[#c59d5f] mx-auto mb-2" />

              <p className="text-[11px] sm:text-xs font-semibold text-[#003b2f]">
                Session Scheduled
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">

            {/* Home */}
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-[#c59d5f] hover:bg-[#b88d4d] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:-translate-y-1"
            >
              Back To Home
              <Home className="h-4 w-4" />
            </Link>

            {/* Support */}
            <a
              href="https://wa.me/917823838638"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#003b2f] text-[#003b2f] hover:bg-[#003b2f] hover:text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
            >
              WhatsApp Support
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
// components/JsonLd.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

// Blog Post Schema
export const BlogJsonLd = ({ blog, url }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.shortDescription,
    "image": blog.image,
    "datePublished": blog.createdAt || new Date().toISOString(),
    "dateModified": blog.updatedAt || blog.createdAt || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": blog.author || "Dr. Ankush Garg"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ManoVaidya",
      "logo": {
        "@type": "ImageObject",
        "url": "https://autism.manovaidya.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": blog.tags?.join(", ") || blog.category,
    "articleSection": blog.category,
    "url": url
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

// Organization Schema (Updated with contact info)
export const OrganizationJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ManoVaidya",
    "url": "https://autism.manovaidya.com",
    "logo": "https://autism.manovaidya.com/logo.png",
    "description": "Best autism doctor in India providing autism treatment India and Ayurveda autism treatment for children.",
    "sameAs": [
      "https://www.facebook.com/manovaidya",
      "https://twitter.com/manovaidya",
      "https://www.instagram.com/manovaidya",
      "https://www.youtube.com/manovaidya",
      "https://www.linkedin.com/company/manovaidya"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7823838638",
      "contactType": "customer service",
      "email": "manovaidya2@gmail.com",
      "availableLanguage": ["English", "Hindi"]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

// Person Schema (Doctor)
export const PersonJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dr. Ankush Garg",
    "jobTitle": "Autism Specialist",
    "description": "Best autism doctor in India providing autism treatment India and Ayurveda autism treatment for children.",
    "url": "https://autism.manovaidya.com",
    "sameAs": [
      "https://www.facebook.com/",
      "https://www.linkedin.com/",
      "https://www.youtube.com/"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "ManoVaidya"
    },
    "medicalSpecialty": "Neurodevelopmental Disorders",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7823838638",
      "email": "manovaidya2@gmail.com",
      "contactType": "customer service"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

// Breadcrumb Schema
export const BreadcrumbJsonLd = ({ items }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@id": item.url,
        "name": item.name
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd, null, 2)}
      </script>
    </Helmet>
  );
};

// Alternative Breadcrumb Schema with more detailed structure
export const DetailedBreadcrumbJsonLd = ({ items }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@id": item.url,
        "name": item.name,
        ...(item.image && { image: item.image }),
        ...(item.description && { description: item.description })
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd, null, 2)}
      </script>
    </Helmet>
  );
};

// FAQ Schema
export const FAQJsonLd = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd, null, 2)}
      </script>
    </Helmet>
  );
};

// WebSite Schema (Updated with contact info)
export const WebSiteJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ManoVaidya",
    "url": "https://autism.manovaidya.com",
    "description": "Best autism doctor in India providing autism treatment India and Ayurveda autism treatment for children.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://autism.manovaidya.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7823838638",
      "email": "manovaidya2@gmail.com"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd, null, 2)}
      </script>
    </Helmet>
  );
};

// Local Business Schema (Medical Business) - Updated with contact info
export const LocalBusinessJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "ManoVaidya",
    "description": "Best autism doctor in India providing autism treatment India and Ayurveda autism treatment for children.",
    "url": "https://autism.manovaidya.com",
    "telephone": "+91-7823838638",
    "email": "manovaidya2@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Your City",
      "addressRegion": "Your State",
      "addressCountry": "IN"
    },
    "priceRange": "$$",
    "openingHours": ["Mon-Fri 09:00-18:00", "Sat 10:00-16:00"],
    "medicalSpecialty": "Neurodevelopmental Disorders",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7823838638",
      "email": "manovaidya2@gmail.com",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd, null, 2)}
      </script>
    </Helmet>
  );
};

// Medical Condition Schema (Autism)
export const MedicalConditionJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    "name": "Autism Spectrum Disorder",
    "alternateName": "ASD",
    "description": "Autism spectrum disorder (ASD) is a neurodevelopmental condition characterized by challenges in social interaction, communication, and restricted or repetitive behaviors.",
    "associatedAnatomy": {
      "@type": "AnatomicalStructure",
      "name": "Brain"
    },
    "possibleTreatment": {
      "@type": "MedicalTherapy",
      "name": "Ayurveda Autism Treatment",
      "description": "Holistic Ayurvedic treatment for autism focusing on balancing doshas and improving neurological function."
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd, null, 2)}
      </script>
    </Helmet>
  );
};

// Medical Procedure Schema
export const MedicalProcedureJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Autism Treatment Program",
    "procedureType": "Noninvasive",
    "description": "Comprehensive autism treatment program combining modern therapy with Ayurvedic principles.",
    "bodyLocation": "Neurological System"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd, null, 2)}
      </script>
    </Helmet>
  );
};

// Product Schema (for services)
export const ProductJsonLd = ({ product }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString(),
      "url": product.url
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd, null, 2)}
      </script>
    </Helmet>
  );
};

// Review Schema
export const ReviewJsonLd = ({ review }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Organization",
      "name": "ManoVaidya"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewBody": review.body,
    "datePublished": review.datePublished
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd, null, 2)}
      </script>
    </Helmet>
  );
};

// Aggregate Rating Schema
export const AggregateRatingJsonLd = ({ rating }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "Organization",
      "name": "ManoVaidya"
    },
    "ratingValue": rating.value,
    "bestRating": "5",
    "ratingCount": rating.count,
    "reviewCount": rating.reviewCount
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd, null, 2)}
      </script>
    </Helmet>
  );
};
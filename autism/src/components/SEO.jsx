// components/JsonLd.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

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
      "name": blog.author || "Editorial Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Autism Support",
      "logo": {
        "@type": "ImageObject",
        "url": "https://autismsupport.com/logo.png"
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

export const OrganizationJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Autism Support & Education",
    "url": "https://autismsupport.com",
    "logo": "https://autismsupport.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/autismsupport",
      "https://twitter.com/autismsupport",
      "https://www.instagram.com/autismsupport",
      "https://www.youtube.com/autismsupport"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-123-4567",
      "contactType": "customer service",
      "email": "support@autismsupport.com"
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

export const BreadcrumbJsonLd = ({ items }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export const FAQJsonLd = ({ faqs }) => {
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
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};
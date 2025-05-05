/**
 * Schema.org JSON-LD generator utility
 * This file contains functions to generate different schema.org structured data
 * for different page types in the application.
 */

export interface SchemaOrgData {
  pathname: string;
  title?: string;
  description?: string;
  canonical?: string;
}

/**
 * Generate WebApplication schema for the homepage
 */
export function generateWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CavCount",
    headline: "CavCount - OCR Word & Sentence Counter",
    description:
      "Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool.",
    url: "https://cavcount.app",
    applicationCategory: "Utility",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Leo",
    },
  };
}

/**
 * Generate Website schema for the entire site
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CavCount",
    url: "https://cavcount.app",
    description: "Free OCR Word & Sentence Counter",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://cavcount.app/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    // Include publisher information
    publisher: {
      "@type": "Organization",
      name: "CavCount",
      logo: {
        "@type": "ImageObject",
        url: "https://cavcount.app/favicon.svg",
      }
    },
    // Include main entity to represent the primary content/subject of the website
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "CavCount",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      }
    }
  };
}

/**
 * Generate WebPage schema for specific pages
 */
export function generateWebPageSchema(data: SchemaOrgData) {
  const pageName = data.title || "CavCount Page";
  const pageDescription = data.description || "CavCount - OCR Word & Sentence Counter tool";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageName,
    description: pageDescription,
    url: `https://cavcount.app${data.pathname}`,
    isPartOf: {
      "@type": "WebSite",
      name: "CavCount",
      url: "https://cavcount.app",
    },
    // Include breadcrumb to better represent the page in search results
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://cavcount.app"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: pageName,
          item: `https://cavcount.app${data.pathname}`
        }
      ]
    }
  };
}

/**
 * Generate About Page schema specifically for the about page
 */
export function generateAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Us",
    description: "Learn about CavCount, a free OCR word and sentence counter, its origins as a student project, and its developer, Leo.",
    url: "https://cavcount.app/about",
    isPartOf: {
      "@type": "WebSite",
      name: "CavCount",
      url: "https://cavcount.app",
    },
    // Include breadcrumb for better representation in search results
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://cavcount.app"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About Us",
          item: "https://cavcount.app/about"
        }
      ]
    }
  };
}

/**
 * Generate ContactPage schema specifically for the contact page
 */
export function generateContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us",
    description: "Contact CavCount. Get in touch with us for questions, support, or feedback about our free OCR word and sentence counter.",
    url: "https://cavcount.app/contact",
    isPartOf: {
      "@type": "WebSite",
      name: "CavCount",
      url: "https://cavcount.app",
    },
    // Include breadcrumb for better representation in search results
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://cavcount.app"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact Us",
          item: "https://cavcount.app/contact"
        }
      ]
    }
  };
}

/**
 * Generate PrivacyPage schema specifically for the privacy policy page
 */
export function generatePrivacyPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",  // Using WebPage with specialization through name/content
    name: "Privacy Policy",
    description: "CavCount's privacy policy and data protection information. Learn how we safeguard your privacy while using our word counting and OCR tools.",
    url: "https://cavcount.app/privacy",
    isPartOf: {
      "@type": "WebSite",
      name: "CavCount",
      url: "https://cavcount.app",
    },
    // Include breadcrumb for better representation in search results
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://cavcount.app"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Privacy Policy",
          item: "https://cavcount.app/privacy"
        }
      ]
    }
  };
}

/**
 * Get schema based on page pathname
 */
export function getSchemaByPathname(data: SchemaOrgData): object[] {
  const schemas = [];

  // Website schema is used on all pages
  schemas.push(generateWebsiteSchema());

  // Specific schemas based on pathname
  if (data.pathname === "/") {
    schemas.push(generateWebApplicationSchema());
  } else if (data.pathname === "/about") {
    schemas.push(generateAboutPageSchema());
  } else if (data.pathname === "/contact") {
    schemas.push(generateContactPageSchema());
  } else if (data.pathname === "/privacy") {
    schemas.push(generatePrivacyPageSchema());
  } else {
    schemas.push(generateWebPageSchema(data));
  }

  return schemas;
}

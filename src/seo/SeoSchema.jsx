import { Helmet } from 'react-helmet-async'
import {
  SITE_NAME, SITE_URL, SITE_DESCRIPTION, COMPANY_NAME, COMPANY_LEGAL_NAME,
  COMPANY_FOUNDER, COMPANY_FOUNDED, COMPANY_EMAIL, COMPANY_PHONE,
  COMPANY_ADDRESS, COMPANY_SOCIAL, SERVICE_AREAS, TWITTER_HANDLE,
} from './seo.config'

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService', 'SoftwareCompany'],
    name: COMPANY_NAME,
    legalName: COMPANY_LEGAL_NAME,
    url: SITE_URL,
    founder: { '@type': 'Person', name: COMPANY_FOUNDER },
    foundingDate: COMPANY_FOUNDED,
    email: COMPANY_EMAIL,
    telephone: COMPANY_PHONE,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.ico`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/android-chrome-512x512.png`,
    description: SITE_DESCRIPTION,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: COMPANY_PHONE,
      email: COMPANY_EMAIL,
      contactType: 'customer service',
      availableLanguage: ['English', 'Urdu'],
      areaServed: ['PK', 'AE', 'US', 'GB'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_ADDRESS.street,
      addressLocality: COMPANY_ADDRESS.city,
      addressRegion: COMPANY_ADDRESS.region,
      postalCode: COMPANY_ADDRESS.postalCode,
      addressCountry: COMPANY_ADDRESS.country,
    },
    areaServed: SERVICE_AREAS.map((c) => ({ '@type': 'City', name: c })),
  }
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
}

export function WebPageSchema({ title, description, canonical, datePublished, dateModified }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title || SITE_NAME,
    description: description || SITE_DESCRIPTION,
    url: canonical || SITE_URL,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [],
    },
  }
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
}

export function BreadcrumbSchema({ items }) {
  if (!items?.length) return null
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: COMPANY_NAME,
    legalName: COMPANY_LEGAL_NAME,
    url: SITE_URL,
    founder: { '@type': 'Person', name: COMPANY_FOUNDER },
    foundingDate: COMPANY_FOUNDED,
    email: COMPANY_EMAIL,
    telephone: COMPANY_PHONE,
    logo: `${SITE_URL}/favicon.ico`,
    image: `${SITE_URL}/android-chrome-512x512.png`,
    sameAs: Object.values(COMPANY_SOCIAL),
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_ADDRESS.street,
      addressLocality: COMPANY_ADDRESS.city,
      addressRegion: COMPANY_ADDRESS.region,
      postalCode: COMPANY_ADDRESS.postalCode,
      addressCountry: COMPANY_ADDRESS.country,
    },
    areaServed: SERVICE_AREAS.map(c => ({ '@type': 'City', name: c })),
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
    currencyAccepted: 'PKR, USD, AED, GBP',
    paymentAccepted: 'Bank Transfer, Credit Card, PayPal',
  }
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
}

export function ServiceSchema({ services }) {
  if (!services?.length) return null
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((svc, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: svc.title,
        description: svc.shortDescription || svc.description,
        url: `${SITE_URL}/services/${svc.slug || svc.id}`,
        provider: { '@type': 'Organization', name: COMPANY_NAME, url: SITE_URL },
        ...(svc.imageUrl && { image: svc.imageUrl }),
      },
    })),
  }
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
}

export function PortfolioSchema({ projects }) {
  if (!projects?.length) return null
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.title,
        description: p.shortDescription || p.description,
        url: `${SITE_URL}/portfolio/${p.slug || p.id}`,
        ...(p.imageUrl && { image: p.imageUrl }),
        ...(p.clientName && { author: p.clientName }),
      },
    })),
  }
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
}

export function FaqSchema({ questions }) {
  if (!questions?.length) return null
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
}

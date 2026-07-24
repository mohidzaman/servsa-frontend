// ============================================================
// SEO Configuration — Servsa (https://servsa.online)
// ============================================================

export const SITE_NAME = 'Servsa'
export const SITE_TITLE = 'Servsa | Web Development, AI & Digital Solutions Company'
export const SITE_DESCRIPTION = 'Servsa builds enterprise-grade web applications, AI solutions, UI/UX design, cloud infrastructure, DevOps, and custom software for businesses worldwide.'
export const SITE_URL = 'https://servsa.online'
export const SITE_DOMAIN = 'servsa.online'
export const DEFAULT_OG_IMAGE = 'https://servsa.online/android-chrome-512x512.png'
export const TWITTER_HANDLE = '@servsa'

// Company Info
export const COMPANY_NAME = 'Servsa'
export const COMPANY_LEGAL_NAME = 'Servsa Technologies'
export const COMPANY_FOUNDER = 'Mohid Zaman'
export const COMPANY_FOUNDED = '2024'
export const COMPANY_EMAIL = 'info@servsa.online'
export const COMPANY_PHONE = '+92-345-0513634'
export const COMPANY_ADDRESS = {
  street: '123 Business Avenue',
  city: 'Karachi',
  region: 'Sindh',
  postalCode: '74000',
  country: 'PK',
}

// Social profiles (sameAs) — add real URLs when available
export const COMPANY_SOCIAL = {
  facebook: 'https://facebook.com/servsa',
  instagram: 'https://instagram.com/servsa1',
  linkedin: 'https://linkedin.com/company/servsa',
  whatsapp: 'https://wa.me/923450513634',
}

// Geo / service areas
export const SERVICE_AREAS = ['Karachi', 'Lahore', 'Islamabad', 'Pakistan', 'UAE', 'USA', 'UK']

// Primary SEO keywords (used on homepage meta)
export const PRIMARY_KEYWORDS = [
  'Servsa',
  'Servsa Software Company',
  'Servsa Digital Agency',
  'Web Development Company',
  'UI UX Design Agency',
  'Mobile App Development',
  'Cloud Infrastructure',
  'DevOps Services',
  'AI Solutions',
  'Software Development Pakistan',
  'Custom Web Development',
  'Enterprise Software',
  'Digital Transformation',
].join(', ')

// Per-page SEO config
export const PAGE_SEO = {
  home: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    canonical: '/',
    keywords: PRIMARY_KEYWORDS,
  },
  about: {
    title: 'About Servsa — Our Story, Team & Mission',
    description: 'Learn about Servsa — a software development company founded in 2024. Discover our mission, values, and the team behind our award-winning digital agency.',
    canonical: '/about',
    keywords: 'About Servsa, Servsa team, Servsa mission, digital agency Pakistan, software company',
  },
  services: {
    title: 'Services — Web Development, AI & Cloud Solutions | Servsa',
    description: 'Explore Servsa\'s full range of digital services: web development, UI/UX design, mobile apps, AI solutions, cloud infrastructure, and DevOps for businesses worldwide.',
    canonical: '/services',
    keywords: 'web development services, UI UX design, mobile app development, cloud infrastructure, DevOps, AI solutions, Servsa services',
  },
  portfolio: {
    title: 'Portfolio — Featured Projects & Case Studies | Servsa',
    description: 'View Servsa\'s portfolio of enterprise web applications, UI/UX design, mobile apps, and cloud projects. See how we deliver measurable results for clients worldwide.',
    canonical: '/portfolio',
    keywords: 'Servsa portfolio, web development case studies, digital agency projects, enterprise software examples',
  },
  contact: {
    title: 'Contact Servsa — Get a Free Quote | Web Development & AI',
    description: 'Contact Servsa to discuss your project. Get a free consultation for web development, AI solutions, UI/UX design, and custom software. We respond within 24 hours.',
    canonical: '/contact',
    keywords: 'contact Servsa, free quote web development, hire software company Pakistan, digital agency contact',
  },
  faq: {
    title: 'FAQ — Frequently Asked Questions | Servsa',
    description: 'Frequently asked questions about Servsa\'s services, pricing, process, technologies, and partnership. Find answers or contact our team directly.',
    canonical: '/faq',
    keywords: 'Servsa FAQ, web development pricing, software development process, digital agency questions',
  },
}

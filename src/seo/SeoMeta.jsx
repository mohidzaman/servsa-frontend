import { Helmet } from 'react-helmet-async'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, TWITTER_HANDLE } from './seo.config'

/**
 * SeoMeta — Renders all <head> SEO tags for a page via react-helmet-async.
 *
 * @param {string}  title       - Page-specific title. If omitted, SITE_NAME is used as-is.
 *                                If the value already contains " | Servsa" it is used verbatim.
 * @param {string}  description - Meta description.
 * @param {string}  canonical   - Page path (e.g. "/about"). Absolute URL built from SITE_URL.
 * @param {string}  ogImage     - OG image URL (absolute) or path (resolved from SITE_URL).
 * @param {string}  ogType      - OG type (default "website").
 * @param {string}  twitterCard - Twitter card type.
 * @param {boolean} noindex     - Exclude page from search index.
 * @param {boolean} nofollow    - Tell crawlers not to follow links.
 * @param {string}  keywords    - Meta keywords string.
 */
export default function SeoMeta({
  title,
  description = SITE_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noindex = false,
  nofollow = false,
  keywords,
}) {
  // If title already has the brand suffix, use as-is; otherwise append it.
  // If no title at all, fall back to SITE_NAME alone (handled by index.html).
  const pageTitle = title
    ? title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`
    : SITE_NAME

  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL

  // Accept both absolute URLs and relative paths for OG image
  const imageUrl = ogImage && ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`

  const robots =
    [noindex && 'noindex', nofollow && 'nofollow'].filter(Boolean).join(', ') ||
    'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'

  return (
    <Helmet>
      {/* Primary */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={pageTitle} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={pageTitle} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
    </Helmet>
  )
}

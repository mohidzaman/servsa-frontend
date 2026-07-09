import { Helmet } from 'react-helmet-async'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, TWITTER_HANDLE } from './seo.config'

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
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`
  const robots = [noindex && 'noindex', nofollow && 'nofollow'].filter(Boolean).join(', ') || 'index, follow'

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
    </Helmet>
  )
}

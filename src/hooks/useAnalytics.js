import { useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

const GA_ID = import.meta.env.VITE_GA_ID || ''
const GTM_ID = import.meta.env.VITE_GTM_ID || ''

const isProd = () => import.meta.env.PROD && (GA_ID || GTM_ID)

export function AnalyticsScripts() {
  useEffect(() => {
    if (!isProd()) return

    if (GA_ID) {
      const s1 = document.createElement('script')
      s1.async = true
      s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      document.head.appendChild(s1)

      const s2 = document.createElement('script')
      s2.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { send_page_view: false });
      `
      document.head.appendChild(s2)
    }

    if (GTM_ID) {
      const s = document.createElement('script')
      s.textContent = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `
      document.head.appendChild(s)

      const noscript = document.createElement('noscript')
      const iframe = document.createElement('iframe')
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`
      iframe.height = '0'
      iframe.width = '0'
      iframe.style.display = 'none'
      iframe.style.visibility = 'hidden'
      noscript.appendChild(iframe)
      document.body.appendChild(noscript)
    }
  }, [])

  return null
}

export function usePageViewTracking() {
  const location = useLocation()

  useEffect(() => {
    if (!isProd() || !GA_ID) return
    const gtag = window.gtag
    if (gtag) {
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname + location.search,
      })
    }
  }, [location])
}

export function useAnalytics() {
  const trackEvent = useCallback((action, params = {}) => {
    if (!isProd()) return
    const gtag = window.gtag
    if (gtag) {
      gtag('event', action, params)
    }
  }, [])

  const trackContactForm = useCallback((formData) => {
    trackEvent('form_submit', {
      form_name: 'contact',
      form_destination: formData.subject || 'general',
    })
  }, [trackEvent])

  const trackQuoteButton = useCallback((serviceType) => {
    trackEvent('quote_request', { service_type: serviceType || 'general' })
  }, [trackEvent])

  const trackCallButton = useCallback((phone) => {
    trackEvent('phone_click', { phone })
  }, [trackEvent])

  const trackEmailClick = useCallback((email) => {
    trackEvent('email_click', { email })
  }, [trackEvent])

  const trackWhatsAppClick = useCallback(() => {
    trackEvent('whatsapp_click')
  }, [trackEvent])

  const trackPortfolioView = useCallback((projectId, title) => {
    trackEvent('portfolio_view', { project_id: projectId, project_title: title })
  }, [trackEvent])

  const trackServiceView = useCallback((serviceId, title) => {
    trackEvent('service_view', { service_id: serviceId, service_title: title })
  }, [trackEvent])

  const trackOutboundLink = useCallback((url) => {
    trackEvent('outbound_click', { url })
  }, [trackEvent])

  const trackDownload = useCallback((fileName) => {
    trackEvent('file_download', { file_name: fileName })
  }, [trackEvent])

  return {
    trackEvent,
    trackContactForm,
    trackQuoteButton,
    trackCallButton,
    trackEmailClick,
    trackWhatsAppClick,
    trackPortfolioView,
    trackServiceView,
    trackOutboundLink,
    trackDownload,
  }
}

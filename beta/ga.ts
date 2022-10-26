// log the pageview with their URL
export function pageview(url: string) {
  if (!window.gtag) return;
  // @ts-ignore
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  })
}

// log specific events happening.
export function event({ action, params }: { action: any, params: any }) {
  if (!window.gtag) return;
  window.gtag('event', action, params)
}

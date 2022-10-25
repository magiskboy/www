// log the pageview with their URL
export function pageview(url: string) {
  // @ts-ignore
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  })
}

// log specific events happening.
export function event({ action, params }: { action: any, params: any }) {
  window.gtag('event', action, params)
}

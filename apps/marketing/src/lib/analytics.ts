// Thin wrapper around Umami's client-side tracker.
//
// Umami is self-hosted, cookieless and only loaded in production on the live
// host (see components/analytics/umami.tsx). In development, during SSR, or
// before the script has finished loading, `window.umami` is undefined — so
// every call here is a safe no-op and callers never need to guard themselves.

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, unknown>) => void;
    };
  }
}

/** Report a custom event to Umami. No-op when the tracker isn't present. */
export function trackEvent(
  eventName: string,
  eventData?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  window.umami?.track(eventName, eventData);
}

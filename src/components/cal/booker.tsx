"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useRef, useState } from "react";

type BookerProps = {
  calUsername: string;
  eventSlug: string;
};

export function Booker({ calUsername, eventSlug }: BookerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCalLoading, setIsCalLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: eventSlug });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#5046BC" },
          dark: { "cal-brand": "#5046BC" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [eventSlug]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const onIframeLoad = () => {
      setIsCalLoading(false);
    };

    const wireIframeLoad = (iframe: HTMLIFrameElement) => {
      if (iframe.dataset.calLoadBound === "true") {
        return;
      }

      iframe.dataset.calLoadBound = "true";
      iframe.addEventListener("load", onIframeLoad, { once: true });
    };

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) {
            continue;
          }

          if (node.tagName === "IFRAME") {
            wireIframeLoad(node as HTMLIFrameElement);
            continue;
          }

          const iframe = node.querySelector("iframe");
          if (iframe) {
            wireIframeLoad(iframe);
          }
        }
      }
    });

    const existingIframe = container.querySelector("iframe");
    if (existingIframe) {
      wireIframeLoad(existingIframe);
    }

    observer.observe(container, { childList: true, subtree: true });

    const timeoutId = window.setTimeout(() => {
      setIsCalLoading(false);
    }, 7000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, [eventSlug]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-225 md:min-h-250 lg:min-h-150"
    >
      <Cal
        namespace={eventSlug}
        calLink={`${calUsername}/${eventSlug}`}
        className="h-full w-full"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
      />
      {isCalLoading ? <div className="absolute inset-0 z-10"></div> : null}
    </div>
  );
}

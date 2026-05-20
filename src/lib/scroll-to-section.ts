type PreventableEvent = {
  preventDefault: () => void;
};

type ScrollToSectionOptions = {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
  history?: "push" | "replace" | false;
};

const defaultScrollOptions = {
  behavior: "smooth",
  block: "start",
  inline: "nearest",
  history: "push",
} satisfies Required<ScrollToSectionOptions>;

function decodeElementId(hash: string) {
  const elementId = hash.startsWith("#") ? hash.slice(1) : hash;

  try {
    return decodeURIComponent(elementId);
  } catch {
    return elementId;
  }
}

function getSamePageHashTarget(target: string) {
  if (!target) return null;

  if (target.startsWith("#")) {
    return { elementId: decodeElementId(target), historyTarget: target };
  }

  if (!target.includes("/") && !target.includes("?")) {
    return { elementId: target, historyTarget: `#${target}` };
  }

  if (typeof window === "undefined") return null;

  const targetUrl = new URL(target, window.location.href);
  const currentUrl = new URL(window.location.href);
  const isSamePage =
    targetUrl.origin === currentUrl.origin &&
    targetUrl.pathname === currentUrl.pathname &&
    targetUrl.search === currentUrl.search;

  if (!isSamePage || !targetUrl.hash) return null;

  return {
    elementId: decodeElementId(targetUrl.hash),
    historyTarget: `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`,
  };
}

export function scrollToSection(
  target: string,
  options: ScrollToSectionOptions = {},
) {
  if (typeof document === "undefined") return false;

  const hashTarget = getSamePageHashTarget(target);
  if (!hashTarget) return false;

  const targetElement = document.getElementById(hashTarget.elementId);
  if (!targetElement) return false;

  const scrollOptions = { ...defaultScrollOptions, ...options };

  targetElement.scrollIntoView({
    behavior: scrollOptions.behavior,
    block: scrollOptions.block,
    inline: scrollOptions.inline,
  });

  if (scrollOptions.history && typeof window !== "undefined") {
    const historyMethod =
      scrollOptions.history === "replace" ? "replaceState" : "pushState";

    window.history[historyMethod](null, "", hashTarget.historyTarget);
  }

  return true;
}

export function handleSectionLinkClick(
  event: PreventableEvent,
  target: string,
  options?: ScrollToSectionOptions,
) {
  const didScroll = scrollToSection(target, options);

  if (didScroll) {
    event.preventDefault();
  }

  return didScroll;
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  CONSENT_STORAGE_KEY,
  type Consent,
  type ConsentPreferences,
  clearConsent,
  defaultConsentPreferences,
  readConsent,
  writeConsent,
} from "@/lib/consent";

type ConsentContextValue = {
  consent: Consent | null;
  preferences: ConsentPreferences;
  isLoaded: boolean;
  hasDecision: boolean;
  allowExternalServices: boolean;
  isOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  resetConsent: () => void;
  saveConsent: (preferences: ConsentPreferences) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);
const CONSENT_CHANGE_EVENT = "skillsite-consent-change";

type ConsentSnapshot = {
  consent: Consent | null;
  isLoaded: boolean;
};

const serverConsentSnapshot: ConsentSnapshot = {
  consent: null,
  isLoaded: false,
};

let cachedConsentSnapshot: ConsentSnapshot = serverConsentSnapshot;
let cachedConsentKey = "server";

function getConsentKey(consent: Consent | null) {
  return consent
    ? [
        consent.schemaVersion,
        consent.noticeVersion,
        consent.external,
        consent.savedAt,
        consent.expiresAt,
      ].join(":")
    : "none";
}

function getClientConsentSnapshot() {
  const consent = readConsent();
  const consentKey = getConsentKey(consent);

  if (cachedConsentSnapshot.isLoaded && cachedConsentKey === consentKey) {
    return cachedConsentSnapshot;
  }

  cachedConsentKey = consentKey;
  cachedConsentSnapshot = {
    consent,
    isLoaded: true,
  };

  return cachedConsentSnapshot;
}

function subscribeToConsent(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY || event.key === null) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CONSENT_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
  };
}

function notifyConsentChange() {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const { consent, isLoaded } = useSyncExternalStore(
    subscribeToConsent,
    getClientConsentSnapshot,
    () => serverConsentSnapshot,
  );
  const [isOpen, setIsOpen] = useState(false);
  const preferences = consent ?? defaultConsentPreferences;
  const hasDecision = consent !== null;
  const allowExternalServices = preferences.external;

  const saveConsent = useCallback((newPreferences: ConsentPreferences) => {
    writeConsent(newPreferences);
    notifyConsentChange();
    setIsOpen(false);
  }, []);

  const openSettings = useCallback(() => setIsOpen(true), []);
  const closeSettings = useCallback(() => setIsOpen(false), []);
  const resetConsent = useCallback(() => {
    clearConsent();
    notifyConsentChange();
    setIsOpen(false);
  }, []);

  const acceptAll = useCallback(
    () =>
      saveConsent({
        necessary: true,
        external: true,
      }),
    [saveConsent],
  );

  const rejectAll = useCallback(
    () => saveConsent(defaultConsentPreferences),
    [saveConsent],
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      preferences,
      isLoaded,
      hasDecision,
      allowExternalServices,
      isOpen,
      openSettings,
      closeSettings,
      acceptAll,
      rejectAll,
      resetConsent,
      saveConsent,
    }),
    [
      acceptAll,
      allowExternalServices,
      closeSettings,
      consent,
      hasDecision,
      isLoaded,
      isOpen,
      openSettings,
      preferences,
      rejectAll,
      resetConsent,
      saveConsent,
    ],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);

  if (!context)
    throw new Error("useConsent must be used inside ConsentProvider");

  return context;
}

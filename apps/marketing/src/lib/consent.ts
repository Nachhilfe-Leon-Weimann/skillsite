export const CONSENT_STORAGE_KEY = "skillsite-cookie-consent-v1";
export const CONSENT_SCHEMA_VERSION = 1;
export const CONSENT_NOTICE_VERSION = 1;
export const CONSENT_MAX_AGE_DAYS = 180;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export type ConsentPreferences = {
  necessary: true;
  external: boolean;
};

export type Consent = ConsentPreferences & {
  schemaVersion: typeof CONSENT_SCHEMA_VERSION;
  noticeVersion: typeof CONSENT_NOTICE_VERSION;
  savedAt: string;
  expiresAt: string;
};

export const defaultConsentPreferences: ConsentPreferences = {
  necessary: true,
  external: false,
};

let memoryConsent: Consent | null = null;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function createConsentRecord(
  preferences: ConsentPreferences,
  now = new Date(),
): Consent {
  return {
    schemaVersion: CONSENT_SCHEMA_VERSION,
    noticeVersion: CONSENT_NOTICE_VERSION,
    necessary: true,
    external: preferences.external,
    savedAt: now.toISOString(),
    expiresAt: new Date(
      now.getTime() + CONSENT_MAX_AGE_DAYS * MS_PER_DAY,
    ).toISOString(),
  };
}

function parseConsent(raw: string, now = new Date()): Consent | null {
  const parsed = JSON.parse(raw) as unknown;

  if (!isRecord(parsed)) return null;

  const { external, savedAt, expiresAt, schemaVersion, noticeVersion } = parsed;

  if (
    schemaVersion !== CONSENT_SCHEMA_VERSION ||
    noticeVersion !== CONSENT_NOTICE_VERSION ||
    typeof external !== "boolean" ||
    !isValidDate(savedAt) ||
    !isValidDate(expiresAt)
  ) {
    return null;
  }

  if (Date.parse(expiresAt) <= now.getTime()) {
    return null;
  }

  return {
    schemaVersion: CONSENT_SCHEMA_VERSION,
    noticeVersion: CONSENT_NOTICE_VERSION,
    necessary: true,
    external,
    savedAt,
    expiresAt,
  };
}

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return memoryConsent;

    return parseConsent(raw) ?? memoryConsent;
  } catch {
    return memoryConsent;
  }
}

export function writeConsent(preferences: ConsentPreferences) {
  const consent = createConsentRecord(preferences);
  memoryConsent = consent;

  if (typeof window === "undefined") return consent;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {}

  return consent;
}

export function clearConsent() {
  memoryConsent = null;

  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {}
}

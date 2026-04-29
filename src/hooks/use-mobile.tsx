"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768; // px

type DeviceContextProps = { isMobile: boolean | undefined };

export const DeviceContext = React.createContext<DeviceContextProps>({
  isMobile: undefined,
});

export const DeviceContextProvider = ({
  children,
  ...props
}: DeviceContextProps & { children: React.ReactNode }) => {
  return (
    <DeviceContext.Provider value={props}>{children}</DeviceContext.Provider>
  );
};

function subscribeToMobileBreakpoint(onStoreChange: () => void) {
  const mediaQueryList = window.matchMedia(
    `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
  );

  mediaQueryList.addEventListener("change", onStoreChange);

  return () => mediaQueryList.removeEventListener("change", onStoreChange);
}

function getMobileSnapshot() {
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;
}

function getServerMobileSnapshot() {
  return false;
}

export function useIsMobile() {
  const context = React.useContext(DeviceContext);
  const isMobile = React.useSyncExternalStore(
    subscribeToMobileBreakpoint,
    getMobileSnapshot,
    getServerMobileSnapshot,
  );

  return context.isMobile ?? isMobile;
}
